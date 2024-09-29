import QuestionsMessages from "@/components/custom/questions-messages";
import Layout from "@/components/layout";
import { POLICIES } from "@/lib/constants";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const NewConversationPage = async ({ params }: SearchParamProps) => {
	const policy = POLICIES.find(policy => policy.slug === params.slug);
	if (!policy) return notFound();

	const user = await currentUser();
	if (!user) return notFound();

	return (
		<Layout title={policy.name} back className="container max-w-3xl flex flex-col items-center justify-end">
			<QuestionsMessages userEmail={user.emailAddresses[0].emailAddress} policy={policy} />
		</Layout>
	);
};

export default NewConversationPage;
