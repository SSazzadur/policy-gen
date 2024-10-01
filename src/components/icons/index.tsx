import {
	ArrowLeftIcon,
	DeleteIcon,
	EditIcon,
	FileIcon,
	Loader2,
	MessageSquareDiff,
	MoonIcon,
	PlusIcon,
	SendIcon,
	SunIcon,
	TrashIcon,
} from "lucide-react";

export const Icons = {
	ArrowLeftIcon,
	SunIcon,
	MoonIcon,
	LoadingIcon: Loader2,
	FileIcon,
	PlusIcon,
	MessageAddIcon: MessageSquareDiff,
	DeleteIcon,
	TrashIcon,
	EditIcon,
	SendIcon,
};

export type Icon = keyof typeof Icons;
