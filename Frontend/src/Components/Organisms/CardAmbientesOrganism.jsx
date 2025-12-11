import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardAmbientesMolecule from '../Molecules/CardAmbientesMolecule'
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAmbientes } from '../../context/AmbientesContext';

export default function CardAmbientesOrganism() {
  const { ambientesJoin, listAmbientesJoin, removeAmbiente } = useAmbientes();
  const { listUserId, userId } = useAuth();
  const navigate = useNavigate();
  const idUser = localStorage.getItem('id');

  console.log(idUser);
  console.log(userId);

  console.log(listAmbientesJoin);

  useEffect(() => {
    listAmbientesJoin();
    listUserId(idUser);
  }, []);

  const updateArea = (id) => {
    navigate(`/edit-ambiente/${id}`);
  }

  if (!ambientesJoin) {
    return <Texto>Cargando información del ambiente...</Texto>;
  }

  return (
    <>
      {ambientesJoin.map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardAmbientesMolecule
            nombre={items.nombre}
            ubicacion={items.ubicacion}
            capacidad={items.capacidad}
            estado={items.estado}
            areaId={items.area_id}
            register={items.fecha_creacion}
          />
          {userId.rol === 'Administrador' ? (
            <>
              <DivContent className='flex flex-row gap-2'>
                <EditDeleteButton
                  edit={() => updateArea(items.id)}
                  deletes={() => removeAmbiente(items.id)}
                />
              </DivContent>
            </>
          ) : (
            <></>
          )}
        </DivContent>
      ))}
    </>
  )
}
