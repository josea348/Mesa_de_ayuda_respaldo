import React from 'react'
import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'

export default function CardCategoriaMolecule({nombre, descripcion, register, update}) {
  const fechaRegister = new Date(register);
  const fechaUpdate = new Date(update);
  const diaRegister = fechaRegister.getDate();
  const mesRegister = fechaRegister.toLocaleString('default', { month: 'long' });
  const anioRegister = fechaRegister.getFullYear();
  const horaRegister = fechaRegister.getHours();
  const minutoRegister = fechaRegister.getMinutes();
  const segundoRegister = fechaRegister.getSeconds();
  const diaUpdate = fechaUpdate.getDate();
  const mesUpdate = fechaUpdate.toLocaleString('default', { month: 'long' });
  const anioUpdate = fechaUpdate.getFullYear();
  const horaUpdate = fechaUpdate.getHours();
  const minutoUpdate = fechaUpdate.getMinutes();
  const segundoUpdate = fechaUpdate.getSeconds();

  return (
    <DivContent>
      <Texto><b>Nombre:</b> {nombre}</Texto>
      <Texto><b>Descripción:</b> {descripcion}</Texto>
      <DivContent className='w-full flex justify-between'>
              <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister} </Texto>
              <Texto className='text-[8px] text-gray-500'>Editado: {horaUpdate}:{minutoUpdate}:{segundoUpdate} - {diaUpdate}/{mesUpdate}/{anioUpdate}</Texto>
            </DivContent>
    </DivContent>
  )
}
