"use client";

import { FC, useState } from "react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../button";
import { deleteConversation } from "@/actions/conversations";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Conversation } from "@prisma/client";

interface DeleteModalProps {
	conversation: Conversation;
}

export const DeleteModal: FC<DeleteModalProps> = ({ conversation }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const deleteDocumentHandler = async () => {
		setLoading(true);

		try {
			await deleteConversation(conversation);

			toast.success("Conversation deleted successfully!");
			setOpen(false);
		} catch (error) {
			toast.error("Something went wrong!");
		}

		setLoading(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="icon" className="hover:bg-destructive/70">
					<Icons.TrashIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete conversation</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this conversation? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-5">
					<DialogClose asChild>
						<Button variant="secondary" disabled={loading} className="w-full">
							Cancel
						</Button>
					</DialogClose>

					<Button variant="destructive" onClick={deleteDocumentHandler} className="gradient-red w-full">
						{loading ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
