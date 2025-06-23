
export function Vibrate(sec: number = 250) {
  navigator.vibrate(sec)
}
// Helperfunction.ts
export function sortByDate<T>(items: T[], getDate: (item: T) => string): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(getDate(a)).getTime();
    const dateB = new Date(getDate(b)).getTime();
    return dateB - dateA;
  });
}


export function GetCurrentDateTimeWithSecondsInString() {
  const now = new Date()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  let hr = now.getHours()
  const min = now.getMinutes().toString().padStart(2, '0')
  const sec = now.getSeconds().toString().padStart(2, '0')
  const ms = now.getMilliseconds().toString().padStart(3, '0')

  const period = hr >= 12 ? 'pm' : 'am'
  hr = hr % 12 || 12

  return `(${date}-${month}-${year})  ${hr}:${min}:${sec}.${ms} ${period}`
}


// export function ValidateJwtToken() {
//     localStorage.getItem("Relogin") === "true" ? toast("Your Session has expired please Re-Login")
//         : null;
// }


import { GoogleGenAI } from "@google/genai";
import { GetUserDetails } from "./DbSchema";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_AIBACKEND_URL });

export async function Aiinfer(Data: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a friendly, smart financial advisor.

Analyze the user's financial data below and suggest clear, actionable steps to improve their financial situation. Format your response in **markdown** and use **bullet points** with **short one-liner actions**. List them in the order they should be done (like a to-do list), and include **quick, helpful tips** beneath each item.

name of the candidate : ${GetUserDetails().user_name}
Financial Data:
${Data}

Response example:
- ✅ **Pay off high-interest debt first**
  - This reduces the most damaging financial drain.
- 📈 **Increase income sources**
  - Consider freelancing, part-time work, or monetizing skills.`

  });
  return response.text?.toString();
}
