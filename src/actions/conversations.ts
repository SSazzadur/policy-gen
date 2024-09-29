"use server";

import db from "@/lib/db";
import { User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewConversation = async (userEmail: string, policy: string, initialResponse: string) => {
	const conversation = await db.conversation.create({
		data: {
			user: userEmail,
			policy: policy,
			title: "New conversation",
		},
	});

	if (!conversation) {
		throw new Error("Conversation not created!");
	}

	const message = await db.message.create({
		data: {
			conversationId: conversation.id,
			by: "user",
			message: initialResponse,
			createdAt: new Date(),
		},
	});

	if (!message) {
		throw new Error("Message not created!");
	}

	revalidatePath(`/${policy}`);

	redirect(`/${policy}/${conversation.id}`);
};

export const getConversationsList = async (user: User, policy: Policy) => {
	const conversations = db.conversation.findMany({
		where: {
			user: user.emailAddresses[0].emailAddress,
			policy: policy.slug,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return conversations;
};

export const getConversation = async (id: string) => {
	const conversations = db.conversation.findFirst({
		where: { id: id },
		include: {
			messages: true,
			initialResponses: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return conversations;
};
