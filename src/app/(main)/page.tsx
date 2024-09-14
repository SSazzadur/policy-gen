import Layout from "@/components/layout";
import { POLICIES } from "@/lib/constants";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const HomePage = async () => {
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	return (
		<Layout title="Home" className="container flex items-center justify-center">
			<div className="grid grid-cols-auto-fit gap-4">
				{POLICIES.map(policy => (
					<Link href={`/${policy.id}`} key={policy.id}>
						<div className="bg-background flex flex-col justify-between gap-3 cursor-pointer hover:bg-accent ring-1 ring-accent rounded-lg p-4 h-full">
							<div className="flex items-center justify-between">
								<div className="text-lg font-bold">{policy.message}</div>
								<div className="text-xl">{policy.icon}</div>
							</div>
							<div className="text-sm text-gray-400">{policy.body}</div>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	);
};

export default HomePage;
