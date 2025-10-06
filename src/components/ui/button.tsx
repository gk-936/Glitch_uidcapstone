import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-neu-sm hover:shadow-neu",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 active:scale-95 shadow-neu-sm hover:shadow-neu",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 shadow-neu-sm hover:shadow-neu",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 active:scale-95 shadow-neu-sm hover:shadow-neu",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        gradient: "gradient-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-neu-sm hover:shadow-neu",
        "gradient-secondary": "gradient-secondary text-foreground hover:scale-105 active:scale-95 shadow-neu-sm hover:shadow-neu",
        neu: "neu-button text-foreground hover:text-primary active:shadow-neu-inset",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const btnRef = React.useRef<HTMLButtonElement>(null);

    // Ripple effect handler
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (btnRef.current && btnRef.current.classList.contains("neu-button")) {
        const button = btnRef.current;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        button.appendChild(ripple);
        ripple.addEventListener("animationend", () => {
          ripple.remove();
        });
      }
      if (props.onClick) props.onClick(e);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={btnRef}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
