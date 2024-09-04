// import OpenAI from "openai";
import "dotenv/config";

async function generateContentFunc(content, imgBase64) {
    // const openai = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });

    try {
        // const brandNameResponse = await openai.chat.completions.create({
        //     // model: "gpt-4o-mini",
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         {
        //             role: "system",
        //             content: [
        //                 {
        //                     type: "text",
        //                     text: "You are a helpful assistant.",
        //                 },
        //             ],
        //         },
        //         {
        //             role: "user",
        //             content: [
        //                 {
        //                     type: "text",
        //                     text: `I have a raw text of a website, what is the brand name in a single word? ${content}`,
        //                 },
        //                 {
        //                     type: "image_url",
        //                     image_url: {
        //                         url: "data/image/jpeg;base64," + imgBase64,
        //                         detail: "low",
        //                     },
        //                 },
        //             ],
        //             max_tokens: 10,
        //         },
        //         {
        //             role: "assistant",
        //             content: [
        //                 {
        //                     type: "text",
        //                     text: "You are a helpful assistant.",
        //                 },
        //             ],
        //         },
        //     ],
        // });
        // const brandDescriptionResponse = await openai.chat.completions.create({
        //     // model: "gpt-4o-mini",
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         {
        //             role: "system",
        //             content: [
        //                 {
        //                     type: "text",
        //                     text: "You are a helpful assistant.",
        //                 },
        //             ],
        //         },
        //         {
        //             role: "user",
        //             content: [
        //                 {
        //                     type: "text",
        //                     text: `I have a raw text of a website, can you extract the description of the website from the raw text. I need only the description and nothing else. ${content}`,
        //                 },
        //                 {
        //                     type: "image_url",
        //                     image_url: {
        //                         url: "data/image/jpeg;base64," + imgBase64,
        //                         detail: "low",
        //                     },
        //                 },
        //             ],
        //             max_tokens: 100,
        //         },
        //         {
        //             role: "assistant",
        //             content: [
        //                 {
        //                     type: "text",
        //                     text: "You are a helpful assistant.",
        //                 },
        //             ],
        //         },
        //     ],
        // });
        // // Returns the response from ChatGPT
        // return {
        //     brandName: brandNameResponse.choices[0].message.content.trim(),
        //     brandDescription:
        //         brandDescriptionResponse.choices[0].message.content.trim(),
        // };

        const brandNameResponse = `BrandName: ${content}`;
        const brandDescriptionResponse = `BrandDescription: ${content}`;

        return {
            brandName: brandNameResponse,
            brandDescription: brandDescriptionResponse,
        };
    } catch (err) {
        if (err.response && err.response.status === 429) {
            console.error(
                "Quota exceeded. Please check your plan and billing details."
            );
            return {
                err: "Quota exceeded. Please check your plan and billing details.",
            };
        } else {
            console.error("An error occurred:", err);
            return {
                err: "An error occurred while generating content.",
            };
        }
    }
}

export default generateContentFunc;
