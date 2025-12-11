import React from "react";

const SurveyIcon = ({ fill = 'currentColor', size, height, width, ...props }) => (
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
    <circle cx="12" cy="12" r="10" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
    <path d="M8 15c1.5 2 6.5 2 8 0" />
    <polyline points="17 7 19 9 22 5" />
  </svg>
);

export default SurveyIcon;
