import React from 'react'
import ContentsInputs from '../Molecules/ContentsInputs'
import DivsSelectEstadoAmbiente from '../Molecules/DivsSelectEstadoAmbiente'

export default function ContentSelectEstadoAmbiente({ text, name, value, onChange }) {
  return (
    <ContentsInputs text={text}>
      <DivsSelectEstadoAmbiente name={name} value={value} onChange={onChange} />
    </ContentsInputs>
  )
}
