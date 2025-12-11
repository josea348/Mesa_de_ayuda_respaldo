import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'

export default function InputNumber({ placeholder, name, onChange, value }) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="number"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className="w-full py-2 outline-none"
      />
    </DivContent>
  )
}
