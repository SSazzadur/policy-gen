"use client";

import { useState, useEffect, useRef, FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Conversation, Message } from "@prisma/client";
import { Button } from "../button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { askGemini } from "@/actions/gemini";
import { toast } from "sonner";
import { saveMessages } from "@/actions/messages";

import FlatList from "../flatlist";
import ChatBubble from "./chat-bubble";

interface ConversationsProps {
	history: Message[];
	messages: Message[];
	initialResponse: string;
	conversation: Conversation & { messages: Message[] };
}

const Conversations: FC<ConversationsProps> = ({ history, messages: initialMessages, initialResponse, conversation }) => {
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
					conversationId: conversation.id,
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
						conversationId: conversation.id,
					};

					setMessages([...updatedMessages, newResponse]);
					setIsLoading(false);

					await saveMessages([newMsg, newResponse], conversation, !initialResponse);
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
					{initialResponse ? <ChatBubble author="model" message={initialResponse} /> : null}

					<FlatList
						data={messages}
						keyExtractor={message => message.id}
						renderItem={item => <ChatBubble author={item.by} message={item.message} />}
					/>

					{isLoading ? <ChatBubble author="model" message="Thinking 🤔 ..." isLoading={isLoading} /> : null}
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
						className="flex-1 h-14 shadow-sm rounded-e-none focus-within:ring-0"
					/>

					<Button
						isLoading={isLoading}
						className="h-14 w-20 rounded-s-none"
						leftIcon={<Icons.SendIcon />}
						type="submit"
					/>
				</form>
			</div>
		</div>
	);
};

export default Conversations;
