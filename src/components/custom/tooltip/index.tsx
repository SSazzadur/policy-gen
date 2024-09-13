import { FC } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CustomTooltipProps {
	children: React.ReactNode;
	title: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ children, title }) => {
	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side="bottom">
					<p>{title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default CustomTooltip;
