"use client";

import { forwardRef, ReactNode, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  LeftIcon?: ReactNode;
  divClass?: string;
  imputClass?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { LeftIcon, divClass, type, value, imputClass, ...props }: InputProps,
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (visible ? "text" : "password") : type;

    return (
      <div
        className={`w-full flex items-center-safe gap-2 relative ${
          divClass ?? ""
        }`}
      >
        {LeftIcon && (
          <span className="absolute  text-fk-primary left-2">{LeftIcon}</span>
        )}
        <input
          ref={ref}
          type={inputType}
          defaultValue={value ? value : ""}
          {...props}
          className={`border-2   border-fk-primary/30 text-fk-primary outline-fk-primary h-10 rounded-md w-full   placeholder:text-gray-400 ${
            LeftIcon ? "pl-6" : "pl-2"
          } ${imputClass}`}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-2 text-fk-primary"
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
