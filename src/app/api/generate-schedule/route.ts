import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { gateSyllabus, dsaTopics, dailyHours, targetExamDate } =
      await req.json();

    const prompt = `
      You are an expert exam preparation strategist. The user has a 6-month window (180 days) remaining until their GATE Exam on ${targetExamDate}.
      Generate a day-by-day JSON schedule for 180 days balancing GATE subjects and DSA practice.
      
      User Details:
      - GATE Syllabus Topics: ${gateSyllabus}
      - DSA Focus Topics: ${dsaTopics}
      - Available Daily Hours: ${dailyHours} hours

      Required Phased Plan Structure:
      - Days 1-90: Core GATE Subjects + Fundamental DSA
      - Days 91-135: Remaining Subjects + Advanced DSA
      - Days 136-165: GATE Previous Year Questions (PYQs) + Practice
      - Days 166-180: Full Mock Tests & Final Revision
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dayNumber: { type: Type.INTEGER },
              gateSubject: { type: Type.STRING },
              gateTopic: { type: Type.STRING },
              dsaTopic: { type: Type.STRING },
              dsaProblems: { type: Type.INTEGER },
            },
            required: [
              "dayNumber",
              "gateSubject",
              "gateTopic",
              "dsaTopic",
              "dsaProblems",
            ],
          },
        },
      },
    });

    const scheduleData = JSON.parse(response.text!);
    return NextResponse.json({ schedule: scheduleData });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate schedule" },
      { status: 500 },
    );
  }
}
