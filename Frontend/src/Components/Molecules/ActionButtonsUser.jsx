import DivContent from '../Atom/DivContent'
import Button from '../Atom/Button'
import { EditIcon } from '../../Icons/EditIcon'

export default function ActionButtonsUser({onEditData, onEditPassword}) {
  return (
    <DivContent className={"flex gap-4 flex-col mt-4"}>
      <Button onClick={onEditData} className="m-2 px-4 py-2 rounded-lg font-medium transition duration-200 flex flex-row justify-center items-center gap-2 cursor-pointer" variant="primary"> <EditIcon /> Editar Datos</Button>
      <Button onClick={onEditPassword} className="m-2 px-4 py-2 rounded-lg font-medium transition duration-200 flex flex-row justify-center items-center gap-2 cursor-pointer" variant="secondary">
        <EditIcon /> Editar Contraseña
      </Button>
    </DivContent>
  )
}
