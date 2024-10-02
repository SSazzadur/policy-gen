import { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ChatBubbleProps {
	author: string;
	message: string;
	isLoading?: boolean;
}

const ChatBubble: FC<ChatBubbleProps> = ({ author, message, isLoading }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
			className="space-y-4"
		>
			<div
				className={cn("flex", {
					"justify-end": author === "user",
				})}
			>
				<div
					className={cn("rounded-3xl py-3 px-5 shadow-md max-w-4xl", {
						"bg-background ring-1 ring-accent ring-inset rounded-ee-none": author === "user",
						"bg-accent rounded-ss-none": author === "model",
					})}
				>
					<Markdown
						rehypePlugins={[rehypeRaw]}
						remarkPlugins={[remarkGfm]}
						className={cn("space-y-4 text-justify", {
							"animate-pulse": isLoading,
						})}
					>
						{message}
					</Markdown>
				</div>
			</div>
		</motion.div>
	);
};

export default ChatBubble;
