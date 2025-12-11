import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardTicketsMolecule from '../Molecules/CardTicketsMolecule'
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';

import { useNavigate } from 'react-router-dom';
import { useTickets } from '../../context/TicketsContext';
import { useAuth } from './../../context/AuthContext';

export default function CardTicketsOrganism() {
  const { ticketsJoin, ticketsError, ticketsLoading, listTicketsJoin, removeTicket } = useTickets();
  const { userId } = useAuth();
  const navigate = useNavigate();

  console.log(userId);
  console.log(listTicketsJoin);

  useEffect(() => {
    listTicketsJoin();
  }, []);

  const updateTickets = (id) => {
    navigate(`/edit-tickets/${id}`);
  }

  const verComentario = (id) => {
    navigate(`/comentarios/${id}`);
  }

  const encuesta = (id) => {
    navigate(`/add-encuesta-ticket/${id}`)
  }

  const file = (id) => {
    navigate(`/add-file/${id}`)
  }

  // ⏳ Mostrar loading
  if (ticketsLoading) {
    return <Texto>Cargando información de los tickets...</Texto>;
  }

  // ❌ Mostrar error 404, 500, etc.
  if (ticketsError) {
    return <Texto>{ticketsError}</Texto>;
  }

  // 📭 Si viene vacío desde backend
  /* if (ticketsJoin?.length === 0) {
    return <Texto>No hay tickets registrados.</Texto>;
  } */
  if (!ticketsJoin) {
    return <Texto>No hay tickets registrados.</Texto>;
  }

  return (
    <>
      {ticketsJoin.map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardTicketsMolecule
            titulo={items.titulo}
            descripcion={items.descripcion}
            categoria={items.categoria}
            prioridad={items.prioridad}
            estado={items.estado}
            solicitante={items.solicitante}
            asignado={items.asignado}
            register={items.fecha_registro}
            update={items.fecha_actualizacion}
            rol={userId.rol}
            comentar={() => verComentario(items.id)}
            adjuntarArchivo={()=>file(items.id)}
            encuesta={() => encuesta(items.id)}
          />
          <DivContent className='flex flex-row gap-2'>
            <EditDeleteButton
              edit={() => updateTickets(items.id)}
              deletes={() => removeTicket(items.id)}
            />
          </DivContent>
        </DivContent>
      ))}
    </>
  )
}
