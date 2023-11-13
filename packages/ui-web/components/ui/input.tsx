import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelClassName, className, type, name, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={name}
          className={cn(
            "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            labelClassName,
          )}
        >
          {label}
        </label>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
