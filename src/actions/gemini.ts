import { Content } from "@google/generative-ai";
import { Message } from "@prisma/client";

export const askGemini = async (text: string, messages: Message[], policyType: PolicyType) => {
	const baseURL = process.env.NODE_ENV === "production" ? "https://policy-gen.vercel.app" : "http://localhost:3000";

	const url = `${baseURL}/api/generate/${policyType}`;

	const history: Content[] = messages.map(message => ({
		parts: [{ text: message.message }],
		role: message.by,
	}));

	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ text, history }),
	});

	const data = await res.json();

	return data;
};
