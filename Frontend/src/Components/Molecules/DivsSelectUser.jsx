import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import DivContent from "../Atom/DivContent";
import Option from "../Atom/Option";
import Select from "../Atom/Select";

export default function DivsSelectUser({ name, value, onChange }) {
  const { users, listUsers } = useAuth();
  
  console.log(listUsers);
  
  useEffect(() => {
    listUsers();
  }, []);

  return (
    <DivContent className="flex items-center border rounded-lg px-3">
      <Select className="w-full py-2 outline-none" name={name} value={value} onChange={onChange}>
        <Option value="">Selecciona el Usuario</Option>
        {(users || []).map(items => (
          items.rol === "Operario" && (
            <Option key={items.identificacion} value={items.identificacion} >{items.nombre}</Option>
          )
        ))}
      </Select>
    </DivContent>
  )
}
