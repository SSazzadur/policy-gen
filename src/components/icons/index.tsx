import {
	ArrowLeftIcon,
	DeleteIcon,
	EditIcon,
	FileIcon,
	Loader2,
	MessageSquareDiff,
	MoonIcon,
	PlusIcon,
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
};

export type Icon = keyof typeof Icons;
