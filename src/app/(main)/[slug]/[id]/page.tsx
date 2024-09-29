import { getConversation } from "@/actions/conversations";
import Layout from "@/components/layout";
import { notFound } from "next/navigation";

const ConversationPage = async ({ params }: SearchParamProps) => {
	const conversation = await getConversation(params.id);
	if (!conversation) return notFound();

	return (
		<Layout title={conversation.title} className="container">
			<h1>ConversationPage</h1>
		</Layout>
	);
};

export default ConversationPage;
