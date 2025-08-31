import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Use Google AI to suggest department
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Given the following escalation description, suggest the most appropriate department. The possible departments are: Technical, Documentation, Finance, Maintenance, and Legal. Only respond with the department name, nothing else.

Description: ${description}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const department = response.text().trim();

    return NextResponse.json({ department });
  } catch (error) {
    console.error('Error in suggest department API:', error);
    return NextResponse.json(
      { error: 'Failed to suggest department' },
      { status: 500 }
    );
  }
}
