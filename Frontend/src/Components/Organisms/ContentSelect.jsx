import React from 'react'
import ContentsInputs from '../Molecules/ContentsInputs'
import DivsSelect from '../Molecules/DivsSelect'

export default function ContentSelect({ text, name, value, onChange, children }) {
  return (
    <ContentsInputs text={text}>
      <DivsSelect name={name} value={value} onChange={onChange}>{children}</DivsSelect>
    </ContentsInputs>
  )
}
