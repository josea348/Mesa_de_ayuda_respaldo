import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardEquiposMolecules from '../Molecules/CardEquiposMolecules';
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';

import { useEquipos } from '../../context/EquiposContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CardEquiposOrganismo() {
  const { equiposJoin, equiposError, equiposLoading, listEquiposJoin, removeEquipo } = useEquipos();
  const { listUserId, userId } = useAuth();
  const navigate = useNavigate();
  const idUser = localStorage.getItem('id');

  console.log(idUser);
  console.log(userId);
  console.log(listEquiposJoin);

  useEffect(() => {
    listEquiposJoin();
    listUserId(idUser);
  }, []);

  const updateEquipos = (id) => {
    navigate(`/edit-equipo/${id}`);
  }

  if (equiposLoading) {
    return <Texto>Cargando información de los equipos...</Texto>;
  }

  if (equiposError) {
    return <Texto>{equiposError}</Texto>;
  }

  if (!equiposJoin) {
    return <Texto>Cargando información de los equipos...</Texto>;
  }

  return (
    <>
      {(equiposJoin || []).map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardEquiposMolecules
            nombre={items.nombre}
            descripcion={items.descripcion}
            tipo={items.tipo}
            ambiente={items.ambiente}
            register={items.fecha_creacion}
          />
          {userId.rol === 'Administrador' ? (
            <>
              <DivContent className='flex flex-row gap-2'>
                <EditDeleteButton
                  edit={() => updateEquipos(items.id)}
                  deletes={() => removeEquipo(items.id)}
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
