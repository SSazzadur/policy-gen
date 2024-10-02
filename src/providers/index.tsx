"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import type * as React from "react";
import { StoreProvider } from "./StoreProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<ClerkProvider
				appearance={{
					baseTheme: dark,
					variables: {
						colorPrimary: "#f9f5ff",
						fontSize: "16px",
					},
				}}
			>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					{children}
					<Toaster position="top-right" />
				</ThemeProvider>
			</ClerkProvider>
		</StoreProvider>
	);
}
