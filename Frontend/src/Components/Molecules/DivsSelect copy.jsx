import DivContent from "../Atom/DivContent";
import Option from "../Atom/Option";
import Select from "../Atom/Select";

export default function DivsSelect({name,value,onChange}) {
  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select className="w-full py-2 outline-none" name={name} value={value} onChange={onChange}>
        <Option value="">Selecciona el rol</Option>
        <Option value="Operario">Operario</Option>
        <Option value="Instructor">Instructor</Option>
        <Option value="Aprendiz">Aprendiz</Option>
      </Select>
    </DivContent>
  )
}
