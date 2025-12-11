import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardAreasMolecule from '../Molecules/CardAreasMolecule'
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';
import { useAreas } from '../../context/AreasContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CardAreasOrganism() {
  const { areas, listAreas, removeArea } = useAreas();
  const { listUserId, userId } = useAuth();
    const idUser = localStorage.getItem('id');
  const navigate = useNavigate();
    
  console.log(idUser);
  console.log(userId);
  console.log(listAreas);

  useEffect(() => {
    listAreas();
    listUserId(idUser);
  }, []);

  const updateArea = (id) => {
    navigate(`/edit-area/${id}`);
  }

  if (!areas) {
    return <Texto>Cargando información del area...</Texto>;
  }

  return (
    <>
      {(areas || []).map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardAreasMolecule
            nombre={items.nombre}
            descripcion={items.descripcion}
            register={items.fecha_creacion}
          />
          {userId.rol === 'Administrador' ? (
            <>
              <DivContent className='flex flex-row gap-2'>
                <EditDeleteButton
                  edit={() => updateArea(items.id)}
                  deletes={() => removeArea(items.id)}
                />
              </DivContent>
            </>
          ):(
            <></>
          )}
        </DivContent>
      ))}
    </>
  )
}
