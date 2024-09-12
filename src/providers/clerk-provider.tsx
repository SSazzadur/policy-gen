import { ClerkProvider as CP } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function ClerkProvider({ children }: { children: React.ReactNode }) {
	return (
		<CP
			appearance={{
				baseTheme: dark,
				variables: {
					colorPrimary: "#3371FF",
					fontSize: "16px",
				},
			}}
		>
			<div className="">{children}</div>
		</CP>
	);
}
