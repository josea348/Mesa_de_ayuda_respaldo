import React from "react";

export const LogbookIcon = ({ fill = 'currentColor', size, height, width, ...props }) => (
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
        <rect x="4" y="3" width="16" height="18" rx="2" ry="2" />
        <line x1="8" y1="3" x2="8" y2="21" />
        <line x1="12" y1="7" x2="16" y2="7" />
        <line x1="12" y1="11" x2="16" y2="11" />
        <line x1="12" y1="15" x2="16" y2="15" />
    </svg>
);
