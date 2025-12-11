import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'
import Select from '../Atom/Select'

export default function SelectRol({value,onChange,children}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select
        value={value}
        onChange={onChange}
        className="w-full py-2 outline-none"
      >
        {children}
      </Select>
    </DivContent>
  )
}
