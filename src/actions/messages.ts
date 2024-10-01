/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { Message } from "@prisma/client";

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

export const saveMessages = async (messages: Message[]) => {
	const data = messages.map(message => ({
		message: message.message,
		by: message.by,
		conversationId: message.conversationId,
	}));

	await db.message.createMany({ data });
};
