import { GoogleGenAI } from '@google/genai';

// Initialize Vertex with your Cloud project and location
const ai = new GoogleGenAI({
  vertexai: true
});
const model = 'gemini-2.5-flash-image-preview';


// Set up generation config
const generationConfig = {
  maxOutputTokens: 32768,
  temperature: 1,
  topP: 0.95,
  responseModalities: ["TEXT", "IMAGE"],
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'OFF',
    }
  ],
};

const msg2Text1 = {text: `好的，请稍等片刻，我将为您生成一张熊猫吃竹子的图片。

您对这张图片有什么特别的要求吗？例如：

*   **熊猫的姿势？**（例如，坐着吃，站着吃，躺着吃）
*   **竹子的种类或状态？**（例如，嫩竹，老竹，竹叶茂盛）
*   **背景？**（例如，竹林，山林，雪地）
*   **光线？**（例如，阳光明媚，傍晚，阴影）
*   **风格？**（例如，写实，卡通，水墨画）

如果您没有特别的要求，我将生成一张经典的、写实的熊猫在竹林中吃竹子的图片。

在您回复之前，我已经为您准备了一张：`};

const chat = ai.chats.create({
  model: model,
  config: generationConfig
});

async function sendMessage(message) {
  const response = await chat.sendMessageStream({
    message: message
  });
  process.stdout.write('stream result: ');
  for await (const chunk of response) {
    if (chunk.text) {
      process.stdout.write(chunk.text);
    } else {
      process.stdout.write(JSON.stringify(chunk) + '\n');
    }
  }
}

async function generateContent() {
  await sendMessage([
    {text: `生成一张熊猫吃竹子的图片`}
  ]);
  await sendMessage([
    msg2Text1
  ]);
  await sendMessage([
    {text: `生成一张熊猫吃竹子的图片`}
  ]);
}

generateContent();