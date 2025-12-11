import React from "react";

const MapIcon = ({ fill = 'currentColor', size, height, width, ...props }) => (
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
    <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

export default MapIcon;
