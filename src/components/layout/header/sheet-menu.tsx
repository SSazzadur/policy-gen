import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "../sidebar/menu";

import { APP_NAME } from "@/lib/constants";

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
				<SheetHeader>
					<Button className="flex justify-center items-center pb-2 pt-1" variant="link" asChild>
						<Link href="/" className="flex items-center gap-2">
							<Image src="/assets/images/logo.png" alt="Logo" width={150} height={150} className="size-10" />
							<h1 className="font-bold text-lg">{APP_NAME}</h1>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
