"use client";

import { FC } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

interface BackToPolicyButtonProps {
	path: string;
}

const BackToPolicyButton: FC<BackToPolicyButtonProps> = ({ path }) => {
	const router = useRouter();

	return <Button size="icon" onClick={() => router.replace(`/${path}`)} leftIcon={<Icons.ArrowLeftIcon />} />;
};

export default BackToPolicyButton;
