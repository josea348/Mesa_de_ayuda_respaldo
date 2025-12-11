import React from 'react'

export default function TableHead({className,children}) {
  return (
    <thead className={className}>
      {children}
    </thead>
  )
}
