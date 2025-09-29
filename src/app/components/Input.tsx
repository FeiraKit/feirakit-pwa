"use client";

import { forwardRef, ReactNode, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  LeftIcon?: ReactNode;
  divClass?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ LeftIcon, divClass, type, value, ...props }: InputProps, ref) => {
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
          <span className="absolute  text-fk-primary left-1">{LeftIcon}</span>
        )}
        <input
          ref={ref}
          type={inputType}
          value={value ? value : ""}
          {...props}
          className={`border text-fk-primary border-gray-300 h-10 rounded-md w-full  outline-fk-primary placeholder:text-fk-primary/80 ${
            LeftIcon ? "pl-6" : "pl-2"
          }`}
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
