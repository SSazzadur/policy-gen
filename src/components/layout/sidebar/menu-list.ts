import { LayoutGrid, LucideIcon } from "lucide-react";

type Submenu = {
	href: string;
	label: string;
	icon: LucideIcon;
	active: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					href: "/",
					label: "Home",
					active: pathname === "/",
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Chats",
			menus: [],
		},

		// TODO: Add logout button
	];
}
