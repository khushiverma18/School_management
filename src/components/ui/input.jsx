import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 w-full outline-none focus:ring focus:ring-blue-200 ${className}`}
      {...props}
    />
  );
});
Input.displayName = "Input";
