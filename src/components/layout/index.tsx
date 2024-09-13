import { cn } from "@/lib/utils";
import Header from "./header";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	back?: boolean;
}

const Layout = ({ title, children, className, back }: ContentLayoutProps) => {
	return (
		<div className="space-y-4">
			<Header title={title} back={back} />
			<div className={cn("min-h-screen", className)}>{children}</div>
		</div>
	);
};

export default Layout;
