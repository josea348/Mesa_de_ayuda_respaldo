import { useEffect } from "react";
import CardUserOrganism from "../Organisms/CardUserOrganism";
import DivContent from "../Atom/DivContent";
import TableUserOrganism from "../Organisms/TableUserOrganism";
import TableContentUserBody from "../Molecules/TableContentUserBody";
import BtnAdd from "../Molecules/BtnAdd";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const { users, listUsers, userId, removeUser } = useAuth();
  const navigate = useNavigate();

  console.log(users);
  console.log(userId);

  const add = () => {
    navigate(`/add-user`)
  }

  const edit = (id) => {
    navigate(`/edit-user/${id}`)
  }

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <DivContent className="w-full h-full p-4">
      <DivContent className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mb-4 rounded-lg shadow-lg bg-gray-100'>
        <CardUserOrganism />
      </DivContent>
      {(userId || []).rol === 'Administrador' && (
        <>
          <hr />
          <DivContent className={'p-4 mt-4 rounded-lg shadow-lg bg-gray-100'}>
            <BtnAdd className='mb-8' text='Agregar Usuario' onClick={add} />
            <TableUserOrganism>
              {(users || []).map((items) => (
                <TableContentUserBody onClick={() => edit(items.identificacion)} onDeletes={() => removeUser(items.identificacion)} key={items.identificacion} identificacion={items.identificacion} name={items.nombre} img={`http://localhost:4001/img/${items.image}`} telefono={items.telefono} email={items.email} rol={items.rol} />
              ))}
            </TableUserOrganism>
          </DivContent>
        </>
      )}
    </DivContent>
  );
}
