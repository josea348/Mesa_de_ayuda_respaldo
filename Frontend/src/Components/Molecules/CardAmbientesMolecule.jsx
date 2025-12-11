import React from 'react'
import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'

export default function CardAmbientesMolecule({ nombre, ubicacion, capacidad, estado, areaId, register }) {
  const fechaRegister = new Date(register);
  const diaRegister = fechaRegister.getDate();
  const mesRegister = fechaRegister.toLocaleString('default', { month: 'long' });
  const anioRegister = fechaRegister.getFullYear();
  const horaRegister = fechaRegister.getHours();
  const minutoRegister = fechaRegister.getMinutes();
  const segundoRegister = fechaRegister.getSeconds();

  return (
    <DivContent>
      <Texto><b>Nombre:</b> {nombre}</Texto>
      <Texto><b>Ubicación:</b> {ubicacion}</Texto>
      <Texto><b>Capacidad:</b> {capacidad}</Texto>
      <Texto><b>Estado:</b> {estado}</Texto>
      <Texto><b>Area:</b> {areaId}</Texto>
      <DivContent className='w-full flex justify-between'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister} </Texto>
      </DivContent>
    </DivContent>
  )
}
