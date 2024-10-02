import { getConversation } from "@/actions/conversations";
import { askGemini } from "@/actions/gemini";
import { saveMessage } from "@/actions/messages";
import Conversations from "@/components/custom/conversation";
import Layout from "@/components/layout";
import { notFound } from "next/navigation";

const ConversationPage = async ({ params }: SearchParamProps) => {
	const conversation = await getConversation(params.id);
	if (!conversation) return notFound();

	let initialResponse = { result: "" };

	if (conversation.messages.length === 1) {
		initialResponse = await askGemini(
			conversation.messages[conversation.messages.length - 1].message,
			conversation.messages.slice(0, -1)
		);

		if (initialResponse.result) {
			await saveMessage(initialResponse.result, "model", params.id);
		}
	}

	return (
		<Layout title={conversation.title} editTitle id={params.id} className="container" back>
			<Conversations
				history={conversation.messages}
				messages={conversation.messages.slice(1)}
				initialResponse={initialResponse ? initialResponse.result || "" : ""}
				conversation={conversation}
			/>
		</Layout>
	);
};

export default ConversationPage;
