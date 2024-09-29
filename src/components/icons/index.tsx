import { ArrowLeftIcon, FileIcon, Loader2, MessageSquareDiff, MoonIcon, PlusIcon, SunIcon } from "lucide-react";

export const Icons = {
	ArrowLeftIcon,
	SunIcon,
	MoonIcon,
	LoadingIcon: Loader2,
	FileIcon,
	PlusIcon,
	MessageAddIcon: MessageSquareDiff,
};

export type Icon = keyof typeof Icons;
