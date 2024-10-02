import { Icons } from "@/components/icons";
import { FC } from "react";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
	return (
		<div className="flex size-full h-screen items-center justify-center gap-3">
			<Icons.LoadingIcon2 className="animate-spin w-8 h-auto" />
			<p className="text-xl animate-pulse">Loading...</p>
		</div>
	);
};

export default Loader;
