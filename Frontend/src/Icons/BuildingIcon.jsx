import React from "react";

const BuildingIcon = ({ fill = 'currentColor', size, height, width, ...props }) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 21V9h6v12" />
    <line x1="9" y1="13" x2="15" y2="13" />
  </svg>
);

export default BuildingIcon;
