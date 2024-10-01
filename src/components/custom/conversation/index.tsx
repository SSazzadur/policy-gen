"use client";

import { useState, useEffect, useRef, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ConversationsProps {
	messages: Message[];
	initialResponse: string;
}

const Conversations: FC<ConversationsProps> = ({ messages, initialResponse }) => {
	const [currentQuestionIndex] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const endOfContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (endOfContentRef.current) {
			endOfContentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [currentQuestionIndex]);

	return (
		<div ref={scrollRef} className="w-full py-4 space-y-6">
			<AnimatePresence>
				{(messages || []).map(message => (
					<motion.div
						key={message.id}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
						className="space-y-4"
					>
						<div
							className={cn("flex", {
								"justify-end": message.by === "user",
							})}
						>
							<div
								className={cn("rounded-3xl py-3 px-5 shadow-md max-w-md", {
									"bg-background ring-1 ring-accent ring-inset rounded-ee-none": message.by === "user",
									"bg-accent rounded-ss-none": message.by === "model",
								})}
							>
								{message.message}
							</div>
						</div>
					</motion.div>
				))}

				{initialResponse ? (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
						className="space-y-4"
					>
						<div className={cn("flex")}>
							<div className="rounded-3xl py-3 px-5 shadow-md max-w-md bg-accent rounded-ss-none">
								{initialResponse}
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>

			<div ref={endOfContentRef} />
		</div>
	);
};

export default Conversations;
