import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#044cd0] text-white hover:bg-[#044cd0]/80",
        destructive: "border-transparent bg-[#d72503] text-white hover:bg-[#d72503]/80",
        success: "border-transparent bg-[#1fae51] text-white hover:bg-[#1fae51]/80",
        warning: "border-transparent bg-[#e6bc15] text-[#111111] hover:bg-[#ffe45c]",
        info: "border-transparent bg-[#09aeae] text-white hover:bg-[#09aeae]/80",
        secondary: "border-transparent bg-[#7a8793] text-white hover:bg-[#7a8793]/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
