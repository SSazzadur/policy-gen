"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { SheetMenu } from "./sheet-menu";
import { Button } from "@/components/custom/button";
import { Icons } from "@/components/icons";

import { SignedIn, UserButton } from "@clerk/nextjs";

interface NavbarProps {
	title: string;
	back?: boolean;
}

const Header = ({ title, back }: NavbarProps) => {
	const router = useRouter();

	return (
		<header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
			<div className="mx-4 sm:mx-8 flex h-14 items-center">
				<div className="flex items-center gap-x-4">
					<SheetMenu />

					{back && <Button size="icon" onClick={() => router.back()} leftIcon={<Icons.ArrowLeftIcon />} />}

					<h1 className="font-bold">{title}</h1>
				</div>
				<div className="flex flex-1 items-center gap-x-2 justify-end">
					<ModeToggle />
					<SignedIn>
						<div className="size-8">
							<UserButton />
						</div>
					</SignedIn>
				</div>
			</div>
		</header>
	);
};

export default Header;
