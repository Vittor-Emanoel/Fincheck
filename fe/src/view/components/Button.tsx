import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 text-white rounded-2xl font-medium transition-all active:bg-teal-900"
    />
  );
}
