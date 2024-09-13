"use client";

import { cn } from "@/lib/utils";
import Footer from "./footer";
import Sidebar from "./sidebar";
import Stores from "@/lib/stores";

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSidebarOpen: isOpen, isSidebarOpenLoading: isLoading } = Stores();

	// TODO: add loading state
	if (isLoading) return null;

	return (
		<>
			<Sidebar />
			<main
				className={cn(
					"min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
					isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
				)}
			>
				{children}
			</main>
			<footer
				className={cn(
					"transition-[margin-left] ease-in-out duration-300",
					isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
				)}
			>
				<Footer />
			</footer>
		</>
	);
};

export default ParentLayout;
