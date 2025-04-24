import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
  try {
    const { imageUrl } = await request.json();
    // const imageUrl =
    //   "https://i.ibb.co.com/KxSVpqyg/Whats-App-Image-2025-04-24-at-18-00-56-fe36e68e.jpg";

    // Validate the image URL
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Analyze the image using OpenAI's vision capabilities
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      max_tokens: 1000,
      temperature: 0.0,
      messages: [
        {
          role: "system",
          content: `You are a fact-checking assistant. Analyze the provided news image and:
          1. Extract all text from the image
          2. Identify the main claims
          3. Assess the likelihood of the news being fake
          4. Provide reputable sources to verify the claims
          5. Return your analysis in JSON format with this structure:
          {
            "isLikelyFake": boolean,
            "confidence": number (0-100),
            "analysis": string,
            "extractedText": string,
            "sources": array of {title: string, url: string, date: string}
          }`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this news image for potential misinformation:",
            },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
    });

    // Extract the JSON response from the AI
    let result;
    try {
      const content = response.choices[0]?.message?.content;
      result = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      return NextResponse.json(
        { error: "Failed to parse AI analysis" },
        { status: 500 }
      );
    }

    // Enhance with additional fact-checking (pseudo-code)
    if (result.extractedText) {
      // You could add additional verification steps here:
      // - Search news databases
      // - Check fact-checking websites
      // - Cross-reference with known misinformation patterns
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze news" },
      { status: 500 }
    );
  }
}
