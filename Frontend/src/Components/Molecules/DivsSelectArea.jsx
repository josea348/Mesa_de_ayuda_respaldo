import { useEffect } from "react";
import { useAreas } from "../../context/AreasContext";
import DivContent from "../Atom/DivContent";
import Option from "../Atom/Option";
import Select from "../Atom/Select";

export default function DivsSelectArea({ name, value, onChange }) {
  const { areas, listAreas } = useAreas();
  
  console.log(listAreas);
  
  useEffect(() => {
    listAreas();
  }, []);

  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select className="w-full py-2 outline-none" name={name} value={value} onChange={onChange}>
        <Option value="">Selecciona el area</Option>
        {(areas || []).map(items => (
          <Option key={items.id} value={items.id} >{items.nombre}</Option>
        ))}
      </Select>
    </DivContent>
  )
}
