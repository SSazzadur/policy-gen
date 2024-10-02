import Image from "next/image";
import Layout from "@/components/layout";
import { APP_NAME, POLICIES } from "@/lib/constants";
import PolicyCard from "@/components/custom/policy-card";

const HomePage = async () => {
	return (
		<Layout title={APP_NAME} className="container flex flex-col gap-14 items-center justify-center">
			<div className="flex flex-col items-center">
				<Image src="/assets/images/logo.png" alt="Logo" width={150} height={150} />
				<h1 className="text-2xl font-semibold mt-4">
					Welcome to <span className="text-primary">{APP_NAME}</span>
				</h1>
				<p className="italic">Find your perfect policy here.</p>
			</div>

			<div className="grid grid-cols-auto-fit gap-4">
				{POLICIES.map(policy => (
					<PolicyCard key={policy.id} policy={policy} />
				))}
			</div>
		</Layout>
	);
};

export default HomePage;
