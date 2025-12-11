import React from 'react'
import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'

export default function InputDateTime({ placeholder, name, value, onChange }) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="datetime-local"
        placeholder={placeholder}
        className="w-full py-2 outline-none"
        name={name}
        value={value}
        onChange={onChange}
      />
    </DivContent>
  )
}
