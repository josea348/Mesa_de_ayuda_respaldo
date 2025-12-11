import React from 'react'

export default function TableContent({ className, children }) {
  return (
    <table className={className}>
      {children}
    </table>
  )
}
