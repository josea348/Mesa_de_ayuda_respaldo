import React from 'react'
import DivContent from '../Atom/DivContent'
import Button from '../Atom/Button'

export default function Footer({ type, textSubmit, clasName, variant, onClick }) {
  return (
    <DivContent className={`flex justify-end gap-2 mt-6 ${clasName}`}>
      <Button
        type={type}
        variant={variant}
        onClick={onClick}
        className="mb-2 mr-4"
      >
        {textSubmit}
      </Button>
    </DivContent>
  )
}
