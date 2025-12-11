import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'
import Link from '../Atom/Link'

export default function CardArchivosAdjuntosMolecule({ ticket, nameFile, file, ver, register }) {
  const fechaRegister = new Date(register);
  const diaRegister = fechaRegister.getDate();
  const mesRegister = fechaRegister.toLocaleString('default', { month: 'long' });
  const anioRegister = fechaRegister.getFullYear();
  const horaRegister = fechaRegister.getHours();
  const minutoRegister = fechaRegister.getMinutes();
  const segundoRegister = fechaRegister.getSeconds();
  console.log(segundoRegister);

  return (
    <DivContent>
      <Texto><b>Ticket:</b> {ticket}</Texto>
      <Texto><b>Nombre:</b> {nameFile}</Texto>
      <Texto><b>Ver:</b> <Link className='text-blue-300 hover:text-blue-500 cursor-pointer' target='_blank' href={ver} >{file}</Link></Texto>
      <DivContent className='w-full flex justify-between'>
        <Texto className='text-[8px] text-gray-500'>Registrado: {horaRegister}:{minutoRegister}:{segundoRegister} - {diaRegister}/{mesRegister}/{anioRegister} </Texto>
      </DivContent>
    </DivContent>
  )
}
