import { FC } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { useFormState, useFormStatus } from "react-dom";
import { updateConversationTitle } from "@/actions/conversations";
import { Button } from "../button";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";

interface FormProps {
	id: string;
	title: string;
}

const Form: FC<FormProps> = ({ id, title }) => {
	const pathname = usePathname();
	const [error, action] = useFormState(updateConversationTitle.bind(null, id, pathname), {});

	return (
		<form action={action}>
			<div className="grid gap-4 py-4">
				<div className="space-y-4">
					<Label htmlFor="title" className="text-right">
						Title
					</Label>
					<div className="space-y-2">
						<Input id="title" name="title" defaultValue={title} className="w-full" />

						{error?.title ? <p className="font-medium text-sm text-destructive">{error.title}</p> : null}
					</div>
				</div>
			</div>
			<DialogFooter>
				<SubmitButton />
			</DialogFooter>
		</form>
	);
};

export default Form;

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button isLoading={pending} type="submit" className="font-semibold" leftIcon={<Icons.FileIcon className="w-5 h-auto" />}>
			Save
		</Button>
	);
};
