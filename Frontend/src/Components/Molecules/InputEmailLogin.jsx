import DivContent from '../Atom/DivContent'
import Input from '../Atom/Input'
import Span from '../Atom/Span'

export default function InputEmailLogin({name, value, onChange, children}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Input
        type="email"
        placeholder="Ingrese su correo"
        className="w-full py-2 outline-none"
        name={name}
        value={value}
        onChange={onChange}
      />
      <Span className="text-gray-400 ml-2">
        {children}
      </Span>
    </DivContent>
  )
}
