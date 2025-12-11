import React from "react";

const HomeIcon = ({ fill = 'currentColor', size, height, width, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size || width || 24}
    height={size || height || 24}
    fill="none"
    stroke={fill}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

export default HomeIcon;
