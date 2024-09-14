import Layout from "@/components/layout";
import { POLICIES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
	return (
		<Layout title="Home" className="container flex flex-col gap-14 items-center justify-center">
			<div className="flex flex-col items-center">
				<Image src="/assets/images/logo.png" alt="Logo" width={150} height={150} />
				<h1 className="text-2xl font-semibold mt-4">
					Welcome to <span className="text-primary">PolicyGen</span>
				</h1>
				<p className="italic">Find your perfect policy here.</p>
			</div>

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
