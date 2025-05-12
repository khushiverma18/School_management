import React from "react";

export const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-md border p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-xl font-bold ${className}`} {...props}>
    {children}
  </h2>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`text-sm ${className}`} {...props}>
    {children}
  </div>
);
