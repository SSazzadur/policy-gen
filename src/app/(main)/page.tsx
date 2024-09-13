import Layout from "@/components/layout";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const HomePage = async () => {
	const user = await currentUser();

	if (!user) redirect("/sign-in");

	return (
		<Layout title="Home" className="container">
			<h1>HomePage</h1>
		</Layout>
	);
};

export default HomePage;
