"use client";

import React from "react";

type SearchProductInputProps = {
  value: string;
  placeholder?: string;
  LeftIcon: React.ReactNode;
  onChange: (value: string) => void;
};

export function SearchProductInput({
  value,
  onChange,
  LeftIcon,
  placeholder,
}: SearchProductInputProps) {
  return (
    <div className="border-2 border-fk-primary/30 h-10 bg-gray-400/60  rounded-md  w-full flex items-center-safe gap-2 relative  focus-within:border-fk-green focus-within:ring">
      {LeftIcon && (
        <span className="absolute  text-fk-primary left-2">{LeftIcon}</span>
      )}
      <input
        value={value}
        placeholder={placeholder}
        className={`   text-fk-primary  h-9 rounded-md  placeholder:text-gray-400 outline-none  ${
          LeftIcon ? "pl-8" : "pl-2"
        }`}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}
