import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'

export default function InputDate({placeholder}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="date"
        placeholder={placeholder}
        className="w-full py-2 outline-none"
      />
    </DivContent>
  )
}
