import React from 'react'
import ContentsInputs from '../Molecules/ContentsInputs'
import DivsSelectArea from '../Molecules/DivsSelectArea'

export default function ContentSelectArea({ text, name, value, onChange }) {
  return (
    <ContentsInputs text={text}>
      <DivsSelectArea name={name} value={value} onChange={onChange} />
    </ContentsInputs>
  )
}
