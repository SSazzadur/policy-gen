import { buttonVariants, Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { Icons } from "@/components/icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, leftIcon, rightIcon, isLoading, ...props }, ref) => {
		return (
			<>
				<ShadButton
					disabled={isLoading}
					className={cn("flex items-center gap-2", buttonVariants({ variant, size, className }))}
					ref={ref}
					{...props}
				>
					{isLoading ? <Icons.LoadingIcon className="h-4 w-4 animate-spin mr-2" /> : leftIcon ? leftIcon : null}

					{props.children}

					{rightIcon ? rightIcon : null}
				</ShadButton>
			</>
		);
	}
);
Button.displayName = "Button";

export { Button };
