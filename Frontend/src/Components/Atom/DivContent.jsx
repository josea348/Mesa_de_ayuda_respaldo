import React from 'react'

export default function DivContent({className, onClick, estilo, children}) {
  return (
    <div className={className} onClick={onClick} style={estilo}>
      {children}
    </div>
  )
}
