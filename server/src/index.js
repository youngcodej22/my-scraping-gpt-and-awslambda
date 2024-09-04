import express from "express";
import cors from "cors";
// import puppeteer from "puppeteer-core";
import puppeteer from "puppeteer";
import generateContentFunc from "./generateContent.js";

// 예시) /ask라는 경로로 api 호출 요청이 오면 라우터를 한단계 더 두고 분기처리
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json()); // 파라미터가 application/json 이런 형태로 들어오면 파싱
app.use(express.urlencoded({ extended: true })); // 파라미터가 application/x-www-form-urlencoded 형태로 들어오면 파싱

// 라우터 - 이 경로로 api 호출 요청이 오면 라우터를 한단계 더 두고 분기처리
app.use("/", router);

router.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

//👇🏻 holds all the ChatGPT result
const database = [];
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

router.post("/api/url", (req, res) => {
    const { url } = req.body;
    console.log("url:", url);

    //👇🏻 Puppeteer webscraping function
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        // await page.goto(TARGET_URL, {
        //     waitUntil: "networkidle0",
        // });
        await page.goto(url);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // collect the data
        const imgBase64 = await page.screenshot({
            path: "screenshot.png",
            fullPage: true,
            encoding: "base64",
        });

        // const html = await page.evaluate(() => document.body.innerHTML);

        //👇🏻 returns all the website content
        const websiteContent = await page.evaluate(() => {
            return document.documentElement.innerText.trim();
        });

        //👇🏻 returns the website meta image
        const websiteOgImage = await page.evaluate(() => {
            const metas = document.getElementsByTagName("meta");
            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("property") === "og:image") {
                    return metas[i].getAttribute("content");
                }
            }
        });

        let result = await generateContentFunc(websiteContent, imgBase64);
        //👇🏻 adds the brand image and ID to the result
        result.brandImage = websiteOgImage;
        result.id = generateID();
        //👇🏻 adds the result to the array
        database.push(result);

        await browser.close();

        if (result) {
            return res.json({
                message: "Request successful!",
                database,
            });
        } else {
            return res.status(500).json({ error: "실패" });
        }
    })();
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
