import React from 'react'
import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'

export default function CardReservaMolecule({ usuarioId, ambienteId, fechaInicio, fechaFin, estado, register, update }) {
  const dateFechaInicio = new Date(fechaInicio);
  const dateFechaFin = new Date(fechaFin);
  const fechaRegister = new Date(register);
  const fechaUpdate = new Date(update);

  const diaFechaInicio = dateFechaInicio.getDate();
  const mesFechaInicio = dateFechaInicio.toLocaleString('default', { month: 'long' });
  const anioFechaInicio = dateFechaInicio.getFullYear();
  let horaFechaInicio = dateFechaInicio.getHours();
  const minutoFechaInicio = dateFechaInicio.getMinutes();
  const segundoFechaInicio = dateFechaInicio.getSeconds();
  const diaFechaFin = dateFechaFin.getDate();
  const mesFechaFin = dateFechaFin.toLocaleString('default', { month: 'long' });
  const anioFechaFin = dateFechaFin.getFullYear();
  let horaFechaFin = dateFechaFin.getHours();
  const minutoFechaFin = dateFechaFin.getMinutes();
  const segundoFechaFin = dateFechaFin.getSeconds();

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

  horaFechaInicio = horaFechaInicio % 12 === 0 ? 12 : horaFechaInicio % 12;
  horaFechaFin = horaFechaFin % 12 === 0 ? 12 : horaFechaFin % 12;

  let timeHorarioInicio = '';
  let timeHorarioFin = '';

  timeHorarioInicio = horaFechaInicio >= 12 ? 'AM' : 'PM';
  timeHorarioFin = horaFechaFin >= 12 ? 'AM' : 'PM';

  return (
    <DivContent>
      <Texto> <b>usuario:</b> {usuarioId}</Texto>
      <Texto> <b>ambiente:</b> {ambienteId}</Texto>
      <Texto> <b>fecha inicio:</b> {diaFechaInicio}/{mesFechaInicio}/{anioFechaInicio} - {horaFechaInicio}:{minutoFechaInicio}:{segundoFechaInicio} {timeHorarioInicio}</Texto>
      <Texto> <b>fecha fin:</b> {diaFechaFin}/{mesFechaFin}/{anioFechaFin} - {horaFechaFin}:{minutoFechaFin}:{segundoFechaFin} {timeHorarioFin}</Texto>
      <Texto> <b>estado:</b> {estado}</Texto>
      <DivContent className='w-full flex justify-between'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister} </Texto>
        <Texto className='text-[8px] text-gray-500'>Editado: {horaUpdate}:{minutoUpdate}:{segundoUpdate} - {diaUpdate}/{mesUpdate}/{anioUpdate}</Texto>
      </DivContent>
    </DivContent>
  )
}
