import { SYSTEM_INSTRUCTION } from "@/lib/constants";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
	throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	// model: "gemini-1.5-pro",
	model: "gemini-1.5-flash",
	systemInstruction: SYSTEM_INSTRUCTION,
});

const generationConfig = {
	temperature: 0.5,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
};

async function run(text: string, history: Content[] = []) {
	const chatSession = model.startChat({
		generationConfig,
		history: history,
	});

	const result = await chatSession.sendMessage(text);
	return result.response.text();
}

export async function POST(req: Request) {
	try {
		const { text, history } = await req.json();

		const result = await run(text, history);

		return Response.json({ result });
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
