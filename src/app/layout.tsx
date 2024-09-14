import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Providers from "@/providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "PolicyGen",
	description: "PolicyGen | Get perfect policies at a click",
	openGraph: {
		title: "PolicyGen",
		description: "PolicyGen | Get perfect policies at a click",
		url: "https://www.policy-gen.vercel.app",
		siteName: "PolicyGen",
		locale: "en-IN",
		type: "website",
	},
	twitter: {
		title: "PolicyGen",
		description: "PolicyGen | Get perfect policies at a click",
		card: "summary_large_image",
		creatorId: "vercel",
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
