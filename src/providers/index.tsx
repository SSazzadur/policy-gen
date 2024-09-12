import { FC } from "react";
import ClerkProvider from "./clerk-provider";

interface ProvidersProps {
	children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	return <ClerkProvider>{children}</ClerkProvider>;
};

export default Providers;
