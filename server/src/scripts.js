// import puppeteer from "puppeteer";
// import generateContentFunc from "./generateContent";

// async function postBlog() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     // Navigate to your blog platform's login page
//     await page.goto("https://your-blog-platform.com/login");

//     // Perform login
//     await page.type("#username", "your-username");
//     await page.type("#password", "your-password");
//     await page.click("#login-button");
//     await page.waitForNavigation();

//     // Navigate to the new post page
//     await page.goto("https://your-blog-platform.com/new-post");

//     // Generate blog content
//     const prompt =
//         "Write a blog post about the benefits of using AI in healthcare.";
//     const content = await generateContentFunc(prompt);

//     // Fill in the blog post form
//     await page.type("#title", "The Benefits of Using AI in Healthcare");
//     await page.type("#content", content);

//     // Submit the blog post
//     await page.click("#submit-button");
//     await page.waitForNavigation();

//     await browser.close();
// }

// postBlog();
