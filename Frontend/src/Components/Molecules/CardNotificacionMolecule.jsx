import React from 'react'
import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'

export default function CardNotificacionMolecule({ titulo, comentario, register }) {
  const fechaRegister = new Date(register);
  const diaRegister = fechaRegister.getDate();
  const mesRegister = fechaRegister.toLocaleString('default', { month: 'long' });
  const anioRegister = fechaRegister.getFullYear();
  const horaRegister = fechaRegister.getHours();
  const minutoRegister = fechaRegister.getMinutes();
  const segundoRegister = fechaRegister.getSeconds();

  return (
    <DivContent className='grid grid-cols-1'>
      <DivContent className='w-full'>
        <Texto className='font-bold'>{titulo}</Texto>
        <Texto>{comentario}</Texto>
      </DivContent>
      <DivContent className='w-full flex justify-between items-end'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister} </Texto>
      </DivContent>
    </DivContent>
  )
}
