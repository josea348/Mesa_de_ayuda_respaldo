import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'

export default function InputFile({ placeholder, name, onChange }) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="file"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="w-full py-2 outline-none"
      />
    </DivContent>
  )
}
