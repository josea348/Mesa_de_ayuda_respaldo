import React from 'react'
import DivContent from '../Atom/DivContent'
import Select from '../Atom/Select'
import Option from '../Atom/Option'

export default function DivsSelectEstadoAmbiente({name,value,onChange}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select className="w-full py-2 outline-none" name={name} value={value} onChange={onChange}>
        <Option value="">Selecciona el Estado</Option>
        <Option value="Disponible">Disponible</Option>
        <Option value="Ocupado">Ocupado</Option>
        <Option value="Mantenimiento">Mantenimiento</Option>
      </Select>
    </DivContent>
  )
}
