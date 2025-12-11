import Texto from '../Atom/Texto'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'

export default function EditDelete({ edit, deletes }) {
  return (
    <>
      <Texto className="m-2 font-medium text-[12px] text-gray-500 hover:text-gray-700 cursor-pointer flex flex-row items-center gap-1 justify-center" variant='primary' onClick={edit}><FiEdit /> Editar</Texto>
      <Texto className="m-2 font-medium text-[12px] text-gray-500 hover:text-gray-700 cursor-pointer flex flex-row items-center gap-1 justify-center" variant='third' onClick={deletes}><MdDeleteOutline /> Eliminar</Texto>
    </>
  )
}
