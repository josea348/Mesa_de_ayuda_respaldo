import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'

export default function CardBitacorasMolecule({ accion, detalles, usuarioId, ticketId, register }) {
  const fechaRegister = new Date(register);
  const diaRegister = fechaRegister.getDate();
  const mesRegister = fechaRegister.toLocaleString('default', { month: 'long' });
  const anioRegister = fechaRegister.getFullYear();
  const horaRegister = fechaRegister.getHours();
  const minutoRegister = fechaRegister.getMinutes();
  const segundoRegister = fechaRegister.getSeconds();

  return (
    <DivContent>
      <Texto><b>acción:</b> {accion}</Texto>
      <Texto><b>detalles:</b> {detalles}</Texto>
      <Texto><b>usuario:</b> {usuarioId}</Texto>
      <Texto><b>ticket:</b> {ticketId}</Texto>
      <DivContent className='w-full flex justify-between'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister}</Texto>
      </DivContent>
    </DivContent>
  )
}
