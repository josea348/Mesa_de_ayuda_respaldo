import React from 'react'
import TableHead from '../Atom/TableHead'
import TableRow from '../Atom/TableRow'

export default function TableUserHead({className, children }) {
  return (
    <TableHead className={className}>
      <TableRow>
        {children}
      </TableRow>
    </TableHead>
  )
}
