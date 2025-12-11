import React from 'react'

export default function Image({ src, alt, className, onClick }) {
  return (
    <img src={src} alt={alt} className={className} onClick={onClick} />
  )
}
