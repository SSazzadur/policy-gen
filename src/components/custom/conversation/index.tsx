"use client";

import { useState, useEffect, useRef, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { askGemini } from "@/actions/gemini";
import { toast } from "sonner";
import { saveMessages } from "@/actions/messages";

interface ConversationsProps {
	history: Message[];
	messages: Message[];
	initialResponse: string;
	conversationId: string;
}

const Conversations: FC<ConversationsProps> = ({ history, messages: initialMessages, initialResponse, conversationId }) => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const endOfContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (endOfContentRef.current) {
			endOfContentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [messages]);

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			if (newMessage.trim()) {
				const newMsg: Message = {
					id: crypto.randomUUID(),
					message: newMessage,
					by: "user",
					createdAt: new Date(),
					conversationId: conversationId,
				};
				const updatedMessages = [...messages, newMsg];
				setMessages(updatedMessages);
				setNewMessage("");

				const response = await askGemini(newMsg.message, history);

				if (response.result) {
					const newResponse: Message = {
						id: crypto.randomUUID(),
						message: response.result,
						by: "model",
						createdAt: new Date(),
						conversationId: conversationId,
					};

					const allMessages = [...updatedMessages, newResponse];
					setMessages(allMessages);

					await saveMessages([newMsg, newResponse]);
				}
			}
		} catch (error) {
			toast.error("Something went wrong!");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen w-full">
			<div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-6">
				<AnimatePresence>
					{initialResponse ? (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
							className="space-y-4"
						>
							<div className="flex">
								<div className="rounded-3xl py-3 px-5 shadow-md max-w-md bg-accent rounded-ss-none">
									{initialResponse}
								</div>
							</div>
						</motion.div>
					) : null}

					{messages.map(message => (
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

					{isLoading ? (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
							className="space-y-4"
						>
							<div className="flex">
								<div className="rounded-3xl py-3 px-5 shadow-md max-w-md bg-accent rounded-ss-none">
									<p className="animate-pulse">Thinking 🤔 ...</p>
								</div>
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>

				<div className="h-20" ref={endOfContentRef} />
			</div>

			<div className="sticky bottom-0 pb-2 w-full shadow-lg bg-background">
				<form onSubmit={handleSendMessage} className="flex items-center">
					<Input
						type="text"
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
						placeholder="Type a message..."
						className="flex-1 h-12 shadow-sm rounded-e-none"
					/>

					<Button className="h-12 w-20 rounded-s-none" leftIcon={<Icons.SendIcon />} type="submit" />
				</form>
			</div>
		</div>
	);
};

export default Conversations;
