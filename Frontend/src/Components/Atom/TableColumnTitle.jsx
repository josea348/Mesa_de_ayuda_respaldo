import React from 'react'

export default function TableColumnTitle({className,children}) {
  return (
    <th className={className}>
      {children}
    </th>
  )
}
