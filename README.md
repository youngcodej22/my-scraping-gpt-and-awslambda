# my-scraping-gpt-and-awslambda

use puppeteer and aws lambda and chatgpt

## prompt

GPT에 넣고 원하는 데이터로 가공할 프롬프트

1. HTML 코드를 넣고
2. `Write some code to get me the [title](예시), [원하는데이터2] and the [원하는데이터3] of each item in JSON format`

### Reference

-   [GPT+Puppeteer-tutorial](https://www.youtube.com/watch?v=fjP328HN-eY)
-   [OpenAI docs](https://platform.openai.com/docs/guides/chat-completions/getting-started?lang=node.js)
-   [puppeteer](https://pptr.dev/api/puppeteer.page.screenshot)
-   [image and pdf 추출](https://blog.daehwan.dev/2018/12/27/how-puppeteer-used-1-page-capture/)
-   [screenshot](https://www.webshare.io/academy-article/puppeteer-screenshot)

### image : binary vs base64

Base64 is a method for converting binary data into a text-based representation, while binary is a system that computers use to store and manipulate data:

Base64
A binary-to-text encoding scheme that converts binary data into a string of letters, numbers, and special characters. Base64 is used for secure data transmission and storage, and is commonly used for email attachments and URLs.

Binary
A system of switches that can be turned on or off, represented by the digits 0 and 1. Binary is used by computers to store and manipulate data, and can represent any type of data, including text, numbers, images, and sound.

Here are some more details about Base64 and binary:

Base64 encoding
Base64 encoding breaks binary data into 6-bit chunks, which are then converted into printable characters using a Base64 table. When the original binary data can't be divided into a 24-bit sequence, padding is needed, which is usually represented by equal signs (=).

Base64 encoding overhead
Base64 encoding increases the size of the original binary data by 33–37%.

Binary encoding
Binary encoding is a technique for representing categorical variables as binary code. Each category is assigned a unique binary code, and the number of bits is equal to the number of unique categories.
