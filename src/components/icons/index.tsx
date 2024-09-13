import { ArrowLeftIcon, Loader2, MoonIcon, SunIcon } from "lucide-react";

export const Icons = {
	ArrowLeftIcon,
	SunIcon,
	MoonIcon,
	LoadingIcon: Loader2,
};

export type Icon = keyof typeof Icons;
