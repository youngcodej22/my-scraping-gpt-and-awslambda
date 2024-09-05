import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

// import puppeteer from "puppeteer-core";
import puppeteer from "puppeteer";
import generateContentFunc from "./generateContent.js";

// 예시) /ask라는 경로로 api 호출 요청이 오면 라우터를 한단계 더 두고 분기처리
const router = express.Router();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

async function scraper(url, res) {
    //👇🏻 holds all the ChatGPT result
    const database = [];
    //👇🏻 generates a random string as ID
    const generateID = () => Math.random().toString(36).substring(2, 10);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, {
        // waitUntil: "domcontentloaded",
        waitUntil: "networkidle0",
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // collect the data
    // * GPT-4 Vision or gpt-4-vision-preview로 이미지로 이해
    // ! screenshot에는 문제가 있다. (컨텐츠가 css로 fadein 처리되는 경우 아직 콘텐츠가 로드되지 않아 빈 화면이 캡처됨)
    const screenshotsDir = path.join(__dirname, "..", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const screenshotPath = path.join(
        screenshotsDir,
        `screenshot-${new Date().toISOString().substring(0, 10)}.jpg`
    );

    const imgBase64 = await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        // encoding: "base64", // binary(이미지포함 모든), base64(문자)
    });

    //👇🏻 returns all the website content
    const content = await page.evaluate(() => {
        return document.documentElement.innerText.trim();
    });

    // const content = await page.evaluate(() => document.body.innerHTML);

    //👇🏻 returns the website meta image
    const ogImage = await page.evaluate(() => {
        const metas = document.getElementsByTagName("meta");
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("property") === "og:image") {
                return metas[i].getAttribute("content");
            }
        }
    });

    //👇🏻 closes the browser
    await browser.close();

    // let result = await generateContentFunc(content, imgBase64);
    let result = await generateContentFunc(content);
    //👇🏻 adds the brand image and ID to the result
    result.brandImage = ogImage;
    result.id = generateID();
    //👇🏻 adds the result to the array
    database.push(result);

    if (result) {
        return res.json({
            message: "Request successful!",
            database,
        });
    } else {
        return res.status(500).json({ error: "실패" });
    }
}

router.post("/api/url", (req, res) => {
    const { url } = req.body;
    console.log("url:", url);

    scraper(url, res);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
