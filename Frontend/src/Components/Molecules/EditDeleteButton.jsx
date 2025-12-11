import Button from "../Atom/Button";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

export default function EditDeleteButton({ edit, deletes }) {
  return (
    <>
      <Button className="m-2 px-4 py-1 rounded-lg font-medium transition duration-200 flex flex-row items-center gap-1 justify-center" variant='primary' onClick={edit}><FiEdit /> Editar</Button>
      <Button className="m-2 px-4 py-1 rounded-lg font-medium transition duration-200 flex flex-row items-center gap-1 justify-center" variant='third' onClick={deletes}><MdDeleteOutline /> Eliminar</Button>
    </>
  )
}
