import React from 'react'

export default function ListDesOrden({className, children}) {
  return (
    <ul className={className}>
      {children}
    </ul>
  )
}
