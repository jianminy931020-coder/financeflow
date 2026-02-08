import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Analyze financial transactions and provide 3 actionable insights.
export async function getFinancialInsights(transactions: Transaction[], totalBalance: number) {
  const prompt = `
    Analyze these recent financial transactions and provide 3 concise, actionable insights for the user (Alex Rivera).
    Total Balance: $${totalBalance}
    Transactions: ${JSON.stringify(transactions)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'A short, catchy title for the financial insight.',
              },
              description: {
                type: Type.STRING,
                description: 'A single actionable sentence providing advice or observation.',
              },
            },
            required: ["title", "description"],
            propertyOrdering: ["title", "description"],
          },
        },
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return [];
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    // Return default insights as a fallback mechanism.
    return [
      { title: "Budget Tip", description: "You spent 12% less on food this week than average." },
      { title: "Savings Goal", description: "At this rate, you'll reach your $3,000 goal in 12 days." }
    ];
  }
}