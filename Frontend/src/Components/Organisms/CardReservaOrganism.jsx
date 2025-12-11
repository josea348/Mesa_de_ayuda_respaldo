import { useEffect } from 'react';
import DivContent from '../Atom/DivContent';
import CardReservaMolecule from '../Molecules/CardReservaMolecule';
import EditDeleteButton from '../Molecules/EditDeleteButton';
import Texto from '../Atom/Texto';

import { useReservas } from '../../context/ReservasContext';
import { useNavigate } from 'react-router-dom';

export default function CardReservaOrganism() {
  const { reservas, reservasId, reservasError, reservasLoading, listReservas, listReservasId, removeReservaAmbiente, removeReservaEquipo } = useReservas();
  const idUser = localStorage.getItem('id');
  const navigate = useNavigate();

  console.log(reservas);
  console.log(reservasId);

  useEffect(() => {
    listReservas();
  }, []);

  useEffect(() => {
    listReservasId(idUser);
  }, [listReservasId, idUser]);

  const updateReserva = (tipoReserva, id) => {
    if (tipoReserva === 'Ambiente') {
      navigate(`/edit-reserva-ambiente/${id}`);
    } else if (tipoReserva === 'Equipo') {
      navigate(`/edit-reserva-equipo/${id}`);
    }
  }

  const deleteReserva = (tipoReserva, id) => {
    if (tipoReserva === 'Ambiente') {
      removeReservaAmbiente(id);
    } else if (tipoReserva === 'Equipo') {
      removeReservaEquipo(id);
    }
  }

  // console.log(reservasId[0].tipo_reserva);

  if (reservasLoading) {
    return <Texto>Cargando información de las reservas...</Texto>;
  }

  if (reservasError) {
    return <Texto>{reservasError}</Texto>;
  }

  if (!reservas) {
    return <Texto>Cargando información de las reservas...</Texto>;
  }

  return (
    <>
      {(reservasId || []).map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id_reserva}>
          <CardReservaMolecule
            usuarioId={items.username}
            ambienteId={items.item_reservado}
            fechaInicio={items.fecha_inicio}
            fechaFin={items.fecha_fin}
            estado={items.estado}
            register={items.fecha_registro}
            update={items.fecha_actualizacion}
          />
          <DivContent className='flex flex-row gap-2'>
            <EditDeleteButton
              edit={() => updateReserva(items.tipo_reserva, items.id_reserva)}
              deletes={() => deleteReserva(items.tipo_reserva, items.id_reserva)}
            />
          </DivContent>
        </DivContent>
      ))}
    </>
  )
}
