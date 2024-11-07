import OpenAI from "openai";
import { OPENAI_API_KEY } from "../../ai-key-export";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function openAI(description: string) {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "I need assistance in writing a document based on the description I provided. Please suggest unique and realistic ideas that align with the content. Include a clear example to illustrate your suggestions. Ensure that your response is factual and only includes imaginative elements if specified in the description. Maintain the tone, creativity, and style of the original document using numbering and bullet points where necessary. Format your response as plain text without any special styling or markdown.",
      },
      {
        role: "user",
        content: JSON.stringify({
          description: [description],
        }),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const messageContent = response.choices[0].message?.content;

  if (messageContent) return messageContent;
}
