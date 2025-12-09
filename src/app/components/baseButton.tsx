"use Client";

import { Spin } from "./loadings/skeleton";

type ButtonProp = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function BaseButton({
  text,
  className,
  disabled,
  isLoading,
  ...props
}: ButtonProp) {
  return (
    <button
      className={`flex w-full h-12 text-lg capitalize border rounded-md bg-fk-primary text-fk-background  hover:bg-fk-green-hover active:bg-fk-green-hover disabled:bg-fk-green-hover/30  transition-all duration-75 items-center justify-center ${
        className ?? ""
      }`}
      disabled={disabled || false}
      {...props}
    >
      {isLoading ? <Spin className="h-4 w-4" /> : text}
    </button>
  );
}
