/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";

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
