"use client";

import { KeyboardEvent, useState } from "react";

interface InputType {
  type: "text" | "email" | "number" | "password",
  name: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  defaultValue?: string
}

export default function Input({ label, name, type, placeholder, required = false, defaultValue, disabled = false }: InputType) {
  const [isFilled, setIsFilled] = useState<boolean>(defaultValue ? true : false)

  const handleType = (e: KeyboardEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }

  return <div className="relative">
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required={required}
      onKeyUp={handleType}
      defaultValue={defaultValue}
      disabled={disabled}
      className="w-full h-10 px-2 outline-none border border-neutral-200 dark:border-neutral-700 rounded peer disabled:border-neutral-800"
    />
    <label
      htmlFor={name}
      className={`absolute text-neutral-700 dark:text-neutral-400 ${isFilled ? "text-sm -top-3 left-2 px-2" : "top-2 left-2"} bg-neutral-50 dark:bg-neutral-900 peer-focus:text-sm peer-focus:-top-3 peer-focus:left-2 peer-focus:px-2 transition-all cursor-text`}
    >
      {label}
    </label>
  </div>
}
