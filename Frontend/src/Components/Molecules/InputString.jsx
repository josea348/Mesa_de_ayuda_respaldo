import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'

export default function InputString({ placeholder, name, value, onChange }) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full py-2 outline-none"
      />
    </DivContent>
  )
}
