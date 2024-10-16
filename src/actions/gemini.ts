"use server";

import { Content } from "@google/generative-ai";
import { Message } from "@prisma/client";

export const askGemini = async (text: string, messages: Message[], policyType: PolicyType) => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_APP_URL;

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
	} catch (error) {
		console.log("error in askGemini", error);
	}
};
