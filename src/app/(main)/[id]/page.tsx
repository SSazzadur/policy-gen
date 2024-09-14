import Layout from "@/components/layout";
import { POLICIES } from "@/lib/constants";

const PolicyDetails = ({ params }: SearchParamProps) => {
	const policy = POLICIES.find(policy => policy.id === params.id);

	if (!policy) return <div>Policy not found</div>;

	return (
		<Layout back title={policy.message} className="container flex flex-col gap-4 justify-center items-center">
			<div>
				<h1 className="text-center text-2xl font-bold">{policy.message}</h1>
			</div>
			<div className="w-full lg:w-1/2">
				<div className="text-center text-lg text-gray-400">{policy.body}</div>
			</div>
		</Layout>
	);
};

export default PolicyDetails;
