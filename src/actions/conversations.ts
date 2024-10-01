/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import db from "@/lib/db";
import { UpdateTitleSchema } from "@/validations/conversation";
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

	// console.log("conversation", conversation);

	// if (!Object.keys(conversation).length) {
	// 	throw new Error("Conversation not created!");
	// }

	const message = await db.message.create({
		data: {
			conversationId: conversation.id,
			by: "user",
			message: initialResponse,
			createdAt: new Date(),
		},
	});

	// console.log("message", message);

	// if (!message) {
	// 	throw new Error("Message not created!");
	// }

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

export const deleteConversation = async (id: string) => {
	const conversation = await db.conversation.delete({
		where: { id: id },
	});

	return conversation;
};

export const updateConversationTitle = async (id: string, path: string, prevState: unknown, formData: FormData) => {
	const result = UpdateTitleSchema.safeParse(Object.fromEntries(formData));

	if (!result.success) {
		return result.error.formErrors.fieldErrors;
	}

	const data = result.data;

	await db.conversation.update({
		where: { id: id },
		data: { title: data.title },
	});

	revalidatePath(path);
};
