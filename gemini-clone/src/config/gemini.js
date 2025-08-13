import { GoogleGenAI } from '@google/genai';

const MODEL_NAME = 'gemini-2.5-pro';

const apiKey = "AIzaSyBOWckO5qU7jymkyXEMWtCf9-n83nJE3tA";

async function runChat(prompt) {
  if (!apiKey) {
    console.error("API key missing!");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const tools = [
    { googleSearch: {} },
  ];

  const config = {
    thinkingConfig: { thinkingBudget: -1 },
    tools,
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: MODEL_NAME,
    config,
    contents,
  });

  let fullText = "";
  for await (const chunk of response) {
    if (chunk.text) {
      fullText += chunk.text; // add all parts together
    }
  }

  console.log(fullText);
  return fullText; // <-- Ye add kiya
}

export default runChat;



// import { GoogleGenAI } from "@google/genai";

// const MODEL_NAME = "gemini-2.5-pro";

// // Direct API key for browser (⚠ Don't expose real key in production)
// const apiKey = "AIzaSyDu0ScjaL4C0_VtxjTrojG4L03WuARIagA";

// async function runChat(prompt) {
//   if (!apiKey) {
//     console.error("API key missing!");
//     return;
//   }

//   const ai = new GoogleGenAI({ apiKey });

//   const tools = [{ googleSearch: {} }];
//   const config = { thinkingConfig: { thinkingBudget: -1 }, tools };

//   const contents = [
//     {
//       role: "user",
//       parts: [{ text: prompt }],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model: MODEL_NAME,
//     config,
//     contents,
//   });

//   let fullText = "";
//   for await (const chunk of response) {
//     // Safely get the chunk text
//     const chunkText =
//       chunk.text ?? chunk?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
//     if (chunkText) {
//       fullText += chunkText;
//       console.log(chunkText); // Live chunk output
//     }
//   }

//   console.log("Full response:", fullText);
//   return fullText;
// }

// export default runChat;
