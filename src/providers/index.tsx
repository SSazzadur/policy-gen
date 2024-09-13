"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import type * as React from "react";
import { StoreProvider } from "./StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
				{children}
				<Toaster />
			</ThemeProvider>
		</StoreProvider>
	);
}
