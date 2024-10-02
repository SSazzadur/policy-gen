/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { Conversation, Message } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const saveMessage = async (message: string, by: "user" | "model", conversationId: string) => {
	const newMessage = await db.message.create({
		data: {
			message: message,
			by: by,
			conversationId: conversationId,
		},
	});

	return newMessage;
};

export const saveMessages = async (messages: Message[], conversation: Conversation) => {
	const data = messages.map(message => ({
		message: message.message,
		by: message.by,
		conversationId: message.conversationId,
	}));

	await db.message.createMany({ data });

	await db.conversation.update({
		where: { id: conversation.id },
		data: {
			updatedAt: new Date(),
		},
	});

	revalidatePath(`/${conversation.policy}`);
};
