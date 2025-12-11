import React from 'react'

export default function TableRow({className, children }) {
  return (
    <tr className={className}>
      {children}
    </tr>
  )
}
