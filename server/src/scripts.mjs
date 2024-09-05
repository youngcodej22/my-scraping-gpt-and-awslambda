import express from "express";
// 나중에 UI랑 연동할때 이거 없으니깐 에러남
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

// 예시) /ask라는 경로로 api 호출 요청이 오면 라우터를 한단계 더 두고 분기처리
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json()); // 파라미터가 application/json 이런 형태로 들어오면 파싱
app.use(express.urlencoded({ extended: true })); // 파라미터가 application/x-www-form-urlencoded 형태로 들어오면 파싱

// 라우터 - 이 경로로 api 호출 요청이 오면 라우터를 한단계 더 두고 분기처리
app.use("/", router);
router.post("/ask", async function (req, res) {
    const prompt = req.body.prompt; // post로 prompt라는 파라미터로 이 api를 쏨
    const result = await callChatGPT(prompt);

    if (result) {
        res.json({ response: result });
    } else {
        res.status(500).json({ error: "실패" });
    }
});

async function callChatGPT(prompt) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await openai.chat.completions.create({
            // 이미지 캡쳐 사용 시
            // model: "gpt-4-vision-preview",
            model: "gpt-3.5-turbo",
            messages: [
                // 1. GPT가 헛소리 하지 못하게 교육시키는 샘플
                { role: "system", content: "너는 판타지 세계의 마법소녀야" },
                { role: "user", content: "너는 파이어볼 마법을 잘 쓰니?" },
                {
                    role: "assistant",
                    content:
                        "맞아, 나는 어릴 때부터 마법학교에서 마법을 배웠어.",
                },

                // 2. 찐 질문 (이후 GPT가 2번에 대한 답변을 줌)
                { role: "user", content: prompt },
            ],
            max_tokens: 100, // 돈 많이 나갈까봐;; 글자수 제한;;
        });

        console.log("result: ", result.choices[0].message);
        return result.choices[0].message;
    } catch (error) {
        console.log(error);
    }
}

const port = 4001;
app.listen(port, function () {
    console.log("서버 실행: ", port);
});
