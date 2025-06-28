import { PropertySearchParams, PropertySearchResult } from "@/types/property";

export const findSmartPropertyMatch = async ({
  userInput,
  budget,
  houses,
}: PropertySearchParams): Promise<PropertySearchResult> => {
  const openRouterConfig = {
    url: "https://openrouter.ai/api/v1/chat/completions",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: {
      model: "deepseek/deepseek-chat-v3-0324:free",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `You are a real estate assistant. Return the suggested house ID in JSON format like: { "houseId": 123, "reason": "" } the reason should be in user language, Just include the JSON and nothing else. Available houses: ${JSON.stringify(
                houses
              )}`,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${userInput} budget: ${budget}`,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(openRouterConfig.url, {
      method: "POST",
      headers: openRouterConfig.headers,
      body: JSON.stringify(openRouterConfig.body),
    });

    const { choices } = await response.json();
    const { content } = choices[0].message;

    const cleanContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanContent);
  } catch (error) {
    console.error("Property Search Error:", error);
    throw error;
  }
};
