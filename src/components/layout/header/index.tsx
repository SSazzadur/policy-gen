"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/custom/button";
import { Icons } from "@/components/icons";

import { SignedIn, UserButton } from "@clerk/nextjs";
import EditModal from "@/components/custom/edit-modal";

interface NavbarProps {
	title: string;
	back?: boolean;
	leftIcon?: React.ReactNode;
	editTitle?: boolean;
	id?: string;
}

const Header = ({ title, back, leftIcon, editTitle, id }: NavbarProps) => {
	const router = useRouter();

	return (
		<header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
			<div className="mx-4 sm:mx-8 flex h-14 items-center">
				<div className="flex items-center gap-x-4">
					{/* <SheetMenu /> */}

					{back ? (
						<Button size="icon" onClick={() => router.back()} leftIcon={<Icons.ArrowLeftIcon />} />
					) : leftIcon ? (
						leftIcon
					) : null}

					<div className="flex items-center gap-4">
						<h1 className="font-bold">{title}</h1>
						{editTitle && id ? <EditModal id={id} title={title} /> : null}
					</div>
				</div>
				<div className="flex flex-1 items-center gap-x-2 justify-end">
					{/* <ModeToggle /> */}
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	);
};

export default Header;
