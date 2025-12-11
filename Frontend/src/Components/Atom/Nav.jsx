import React from 'react'

function Nav({className, children}) {
  return (
    <>
      <nav className={className}>{children}</nav>
    </>
  )
}

export default Nav