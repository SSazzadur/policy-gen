import { getConversation } from "@/actions/conversations";
import { saveMessage } from "@/actions/messages";
import Conversations from "@/components/custom/conversation";
import Layout from "@/components/layout";
import { Content } from "@google/generative-ai";
import { Message } from "@prisma/client";
import { notFound } from "next/navigation";

const askGemini = async (text: string, messages: Message[]) => {
	const url = "http://localhost:3000/api/generate";

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

const ConversationPage = async ({ params }: SearchParamProps) => {
	const conversation = await getConversation(params.id);
	if (!conversation) return notFound();

	const initialResponse = await askGemini(
		conversation.messages[conversation.messages.length - 1].message,
		conversation.messages.slice(0, -1)
	);

	if (initialResponse?.result) {
		await saveMessage(initialResponse.result, "model", params.id);
	}

	return (
		<Layout title={conversation.title} editTitle id={params.id} className="container" back>
			<Conversations messages={conversation.messages.slice(1)} initialResponse={initialResponse?.result || ""} />
		</Layout>
	);
};

export default ConversationPage;
