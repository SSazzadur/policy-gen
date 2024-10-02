"use client";

import { FC } from "react";
import { Button } from "../button";
import { Icons } from "@/components/icons";

interface BackToPolicyButtonProps {}

const BackToPolicyButton: FC<BackToPolicyButtonProps> = ({}) => {
	return <Button size="icon" onClick={() => window.history.go(-2)} leftIcon={<Icons.ArrowLeftIcon />} />;
};

export default BackToPolicyButton;
