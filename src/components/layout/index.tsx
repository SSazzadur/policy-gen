import { cn } from "@/lib/utils";
import Header from "./header";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	back?: boolean;
	editTitle?: boolean;
	id?: string;
}

const Layout = ({ title, children, className, back, editTitle, id }: ContentLayoutProps) => {
	return (
		<div className="space-y-4">
			<Header title={title} back={back} editTitle={editTitle} id={id} />
			<div className={cn("min-h-[calc(100svh-8rem)]", className)}>{children}</div>
		</div>
	);
};

export default Layout;
