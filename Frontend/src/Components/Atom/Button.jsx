import React from 'react'

export default function Button({type, onClick, className, children, variant=""}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    third: "bg-red-400 text-black hover:bg-red-500",
  };

  return (
    <button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg cursor-pointer ${className} ${variants[variant]}`}>
      {children}
    </button>
  )
}
