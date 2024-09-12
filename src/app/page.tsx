import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div>
			{/* <Button>Button</Button> */}

			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
}
