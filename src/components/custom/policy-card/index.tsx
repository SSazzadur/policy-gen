import Link from "next/link";
import { FC } from "react";

interface PolicyCardProps {
	policy: Policy;
}

const PolicyCard: FC<PolicyCardProps> = ({ policy: { id, slug, name, body, icon } }) => {
	return (
		<Link href={`/${slug}`} key={id}>
			<div className="bg-background flex flex-col justify-between gap-3 cursor-pointer hover:bg-accent ring-1 ring-accent rounded-lg p-4 h-full transition-colors duration-300">
				<div className="flex items-center justify-between">
					<div className="text-lg font-bold">{name}</div>
					<div className="text-4xl">{icon}</div>
				</div>
				<div className="text-sm text-gray-400">{body}</div>
			</div>
		</Link>
	);
};

export default PolicyCard;
