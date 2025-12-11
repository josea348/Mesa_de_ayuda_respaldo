import React from 'react'

export default function Aside({className, children}) {
  return (
    <aside className={className}>
      {children}
    </aside>
  )
}
