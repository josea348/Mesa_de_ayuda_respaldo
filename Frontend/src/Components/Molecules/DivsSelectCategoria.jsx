import { useEffect } from "react";
import { useCategorias } from "../../context/CategoriasContext";
import DivContent from "../Atom/DivContent";
import Option from "../Atom/Option";
import Select from "../Atom/Select";

export default function DivsSelectCategoria({ name, value, onChange }) {
  const { categorias, listCategorias } = useCategorias();
  
  console.log(listCategorias);
  
  useEffect(() => {
    listCategorias();
  }, []);

  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select className="w-full py-2 outline-none" name={name} value={value} onChange={onChange}>
        <Option value="">Selecciona el categoria</Option>
        {(categorias || []).map(items => (
          <Option key={items.id} value={items.id} >{items.nombre}</Option>
        ))}
      </Select>
    </DivContent>
  )
}
