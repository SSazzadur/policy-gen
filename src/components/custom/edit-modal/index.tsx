import { FC } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { Button } from "../button";
import Form from "./form";

interface EditModalProps {
	id: string;
	title: string;
}

const EditModal: FC<EditModalProps> = ({ id, title }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="icon"
					variant="link"
					className="bg-transparent hover:bg-transparent"
					leftIcon={<Icons.EditIcon className="w-4 h-4" />}
				/>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit title</DialogTitle>
					<DialogDescription>Make changes to the title here. Click save when you&apos;re done.</DialogDescription>
				</DialogHeader>

				<Form id={id} title={title} />
			</DialogContent>
		</Dialog>
	);
};

export default EditModal;
