import DivContent from '../Atom/DivContent'
import Textarea from '../Atom/Textarea'

export default function InputTextarea({ placeholder, value, name, onChange, children}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Textarea
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-2 outline-none"
      >{children}</Textarea>
    </DivContent>
  )
}
