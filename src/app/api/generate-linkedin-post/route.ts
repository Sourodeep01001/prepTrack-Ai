import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { dayNumber, gateSubject, gateTopic, dsaTopic, dsaProblems } =
      await req.json();

    const prompt = `
      Write an engaging, professional LinkedIn post summarizing a computer science student's learning progress.
      
      Details:
      - Journey: Day ${dayNumber}/180 of GATE & DSA Prep.
      - GATE Subject Covered: ${gateSubject} - ${gateTopic}
      - DSA Concept Solved: ${dsaTopic} (${dsaProblems} problems completed)

      Format Requirements:
      - Catchy 1-line hook.
      - 3 bullet points with key technical insights or takeaways learned today.
      - Tomorrow's focus goal.
      - 4-5 relevant hashtags (#GATEPrep, #DSA, #100DaysOfCode, #SoftwareEngineering).
      - Keep it under 180 words.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ postDraft: response.text });
  } catch (error) {
    return NextResponse.json(
      { error: "Post generation failed" },
      { status: 500 },
    );
  }
}
