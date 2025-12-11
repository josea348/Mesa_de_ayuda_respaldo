import React from 'react'
import DivContent from './../Atom/DivContent';
import Texto from '../Atom/Texto'
import { useParams } from 'react-router-dom';
import Button from '../Atom/Button';

export default function CardTicketsMolecule({ titulo, descripcion, categoria, prioridad, estado, solicitante, asignado, register, update, rol, comentar, adjuntarArchivo, encuesta }) {
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

  const params = useParams();

  return (
    <DivContent>
      <Texto><b>Título:</b> {titulo}</Texto>
      <Texto><b>Descripción:</b> {descripcion}</Texto>
      <Texto><b>Categoría:</b> {categoria}</Texto>
      <Texto><b>Prioridad:</b> {prioridad}</Texto>
      <Texto><b>Estado:</b> {estado}</Texto>
      <Texto><b>Solicitante:</b> {solicitante}</Texto>
      <Texto><b>Asignado:</b> {asignado}</Texto>
      {!params.id ? (
        <DivContent className='w-full flex justify-end mb-2'>
          <Texto className='text-[12px] text-blue-400 hover:text-blue-500 cursor-pointer' onClick={comentar}>Ver comentarios </Texto>
        </DivContent>
      ) : (
        <></>
      )}
      <DivContent className='w-full flex justify-between'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister} </Texto>
        <Texto className='text-[8px] text-gray-500'>Editado: {horaUpdate}:{minutoUpdate}:{segundoUpdate} - {diaUpdate}/{mesUpdate}/{anioUpdate}</Texto>
      </DivContent>
      {estado === "Cerrado" && (
        params.id ? (
          <></>
        ):(
            <DivContent className='text-[12px] w-full flex justify-end mt-2'>
              {rol === "Operario" && (
                <Button className='p-none bg-blue-500 hover:bg-blue-700 mr-6 cursor-pointer' onClick={adjuntarArchivo}>Añadir archivo</Button>
              )}
            <Button className='p-none bg-blue-500 hover:bg-blue-700 cursor-pointer' onClick={encuesta}>Encuesta de satisfacción</Button>
          </DivContent>
        )
      )}
    </DivContent>
  )
}
