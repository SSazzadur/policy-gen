import QuestionsMessages from "@/components/custom/questions-messages";
import Layout from "@/components/layout";
import { POLICIES } from "@/lib/constants";
import { notFound } from "next/navigation";

const PolicyDetails = ({ params }: SearchParamProps) => {
	const policy = POLICIES.find(policy => policy.slug === params.slug);
	if (!policy) return notFound();

	return (
		<Layout back title={policy.name} className="container max-w-3xl flex flex-col items-center justify-end">
			<QuestionsMessages />
		</Layout>
	);
};

export default PolicyDetails;
