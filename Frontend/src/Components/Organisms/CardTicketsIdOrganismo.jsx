import React, { useEffect } from 'react'
import DivContent from '../Atom/DivContent';
import CardTicketsMolecule from '../Molecules/CardTicketsMolecule';
import Texto from '../Atom/Texto';
import { useTickets } from '../../context/TicketsContext';
import { useParams } from 'react-router-dom';

export default function CardTicketsIdOrganismo() {
  const { ticketIdJoin, ticketsError, ticketsLoading, listTicketIdJoin } = useTickets();
  const params = useParams();

  console.log(params);
  console.log(ticketIdJoin);
  // console.log(listTicketIdJoin);

  useEffect(() => {
    listTicketIdJoin(params.id);
  }, [listTicketIdJoin, params.id]);

  if (ticketsLoading) {
    return <Texto>Cargando información de los tickets...</Texto>;
  }

  if (ticketsError) {
    return <Texto>{ticketsError}</Texto>;
  }

  if (!ticketIdJoin) {
    return <Texto>Cargando información de los tickets...</Texto>;
  }

  return (
    <>
      {ticketIdJoin && (
        <DivContent className='w-[60%] m-auto flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md'>
          <CardTicketsMolecule
            titulo={ticketIdJoin.titulo}
            descripcion={ticketIdJoin.descripcion}
            categoria={ticketIdJoin.categoria}
            prioridad={ticketIdJoin.prioridad}
            estado={ticketIdJoin.estado}
            solicitante={ticketIdJoin.solicitante}
            asignado={ticketIdJoin.asignado}
            register={ticketIdJoin.fecha_registro}
            update={ticketIdJoin.fecha_actualizacion}
          />
        </DivContent>
      )}
    </>
  )
}
