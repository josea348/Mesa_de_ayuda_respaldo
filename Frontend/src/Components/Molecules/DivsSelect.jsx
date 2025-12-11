import DivContent from "../Atom/DivContent";
import Option from "../Atom/Option";
import Select from "../Atom/Select";

export default function DivsSelect({name,value,onChange,children}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select className="w-full py-2 outline-none" name={name} value={value} onChange={onChange}>
        {children}
      </Select>
    </DivContent>
  )
}
