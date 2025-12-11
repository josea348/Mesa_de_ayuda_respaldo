import React from 'react'

export default function TableColumn({ className, children }) {
  return (
    <td className={className}>
      {children}
    </td>
  )
}
