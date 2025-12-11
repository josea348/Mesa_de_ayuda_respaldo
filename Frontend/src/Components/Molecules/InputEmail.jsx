import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'

export default function InputEmail({ name, value, onChange }) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="email"
        placeholder="Ingrese su correo"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full py-2 outline-none"
      />
    </DivContent>
  )
}
