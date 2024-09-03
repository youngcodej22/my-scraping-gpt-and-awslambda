// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
import "dotenv/config";
// import dotenv from "dotenv";
// dotenv.config();

// console.log("open_api", process.env.OPENAI_API_KEY);

async function generateContentFunc(content, imgBase64) {
    // const configuration = new Configuration({
    //     apiKey: "",
    // });
    // const openai = new OpenAIApi(configuration);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const brandNameResponse = await openai.chat.completions.create({
        // model: "gpt-4o-mini",
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        text: "You are a helpful assistant.",
                    },
                ],
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `I have a raw text of a website, what is the brand name in a single word? ${content}`,
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: "data/image/jpeg;base64," + imgBase64,
                            detail: "low",
                        },
                    },
                ],
                max_tokens: 10,
            },
        ],
    });

    const brandDescriptionResponse = await openai.chat.completions.create({
        // model: "gpt-4o-mini",
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        text: "You are a helpful assistant.",
                    },
                ],
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `I have a raw text of a website, can you extract the description of the website from the raw text. I need only the description and nothing else. ${content}`,
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: "data/image/jpeg;base64," + imgBase64,
                            detail: "low",
                        },
                    },
                ],
                max_tokens: 100,
            },
        ],
    });

    // Extracts the brand name from the website content
    // const brandNameResponse = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: `I have a raw text of a website, what is the brand name in a single word? ${content}`,
    // });

    // Extracts the brand description from the website content
    // const brandDescriptionResponse = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: `I have a raw text of a website, can you extract the description of the website from the raw text. I need only the description and nothing else. ${content}`,
    //     max_tokens: 100,
    // });

    // const response = await openai.createCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: prompt }],
    //     max_tokens: 1000,
    // });

    // return response.data.choices[0].message.content.trim();

    console.log(brandNameResponse.choices[0].message.content);
    console.log(brandDescriptionResponse.choices[0].message.content);
    // Returns the response from ChatGPT
    return {
        brandName: brandNameResponse.choices[0].message.content.trim(),
        brandDescription:
            brandDescriptionResponse.choices[0].message.content.trim(),
    };
}

export default generateContentFunc;
