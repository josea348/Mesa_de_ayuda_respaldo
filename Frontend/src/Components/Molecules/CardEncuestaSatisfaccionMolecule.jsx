import React from 'react'
import DivContent from '../Atom/DivContent';
import Texto from '../Atom/Texto';

export default function CardEncuestaSatisfaccionMolecule({user, ticket, calificacion, comentario, register}) {
  const fechaRegister = new Date(register);
  const diaRegister = fechaRegister.getDate();
  const mesRegister = fechaRegister.toLocaleString('default', { month: 'long' });
  const anioRegister = fechaRegister.getFullYear();
  const horaRegister = fechaRegister.getHours();
  const minutoRegister = fechaRegister.getMinutes();
  const segundoRegister = fechaRegister.getSeconds();

  return (
    <DivContent>
      <Texto><b>Username:</b> {user}</Texto>
      <Texto><b>Ticket:</b> {ticket}</Texto>
      <Texto><b>Calificacion:</b> {calificacion}</Texto>
      <Texto><b>Comentarios:</b> {comentario}</Texto>
      <DivContent className='w-full flex justify-between'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister}</Texto>
      </DivContent>
    </DivContent>
  )
}
