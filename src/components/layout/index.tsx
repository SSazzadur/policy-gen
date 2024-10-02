import { cn } from "@/lib/utils";
import Header from "./header";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	back?: boolean;
	leftIcon?: React.ReactNode;
	editTitle?: boolean;
	id?: string;
}

const Layout = ({ title, children, className, back, leftIcon, editTitle, id }: ContentLayoutProps) => {
	return (
		<div className="space-y-4">
			<Header title={title} back={back} leftIcon={leftIcon} editTitle={editTitle} id={id} />
			<div className={cn("min-h-[calc(100svh-8rem)]", className)}>{children}</div>
		</div>
	);
};

export default Layout;
