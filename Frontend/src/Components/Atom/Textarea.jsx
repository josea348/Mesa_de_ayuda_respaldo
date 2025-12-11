import React from 'react'

export default function Textarea({ type, value, name, className, placeholder, onChange, children }) {
  return (
    <textarea type={type} value={value} name={name} className={className} placeholder={placeholder} onChange={onChange}>
      {children}
    </textarea>
  )
}
