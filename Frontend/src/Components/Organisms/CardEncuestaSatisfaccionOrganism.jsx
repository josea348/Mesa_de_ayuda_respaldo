import React, { useEffect } from 'react'
import DivContent from '../Atom/DivContent';
import CardEncuestaSatisfaccionMolecule from '../Molecules/CardEncuestaSatisfaccionMolecule';
import EditDeleteButton from '../Molecules/EditDeleteButton';
import Texto from '../Atom/Texto';
import { useEncuestas } from '../../context/EncuestasContext';
import Footer from '../Molecules/Footer';

export default function CardEncuestaSatisfaccionOrganism() {
  const { encuestasJoin, encuestasError, encuestasLoading, listEncuestasJoin, removeEncuesta } = useEncuestas();

  console.log(encuestasJoin);
  console.log(listEncuestasJoin);

  useEffect(() => {
    listEncuestasJoin();
  }, [listEncuestasJoin]);

  if (encuestasLoading) {
    return <Texto>Cargando información de los equipos...</Texto>;
  }

  if (encuestasError) {
    return <Texto>{encuestasError}</Texto>;
  }

  if (!encuestasJoin) {
    return <Texto>Cargando información de los equipos...</Texto>;
  }

  return (
    <>
      {(encuestasJoin || []).map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardEncuestaSatisfaccionMolecule
            user={items.username}
            ticket={items.titleTicket}
            calificacion={items.calificacion}
            comentario={items.comentarios}
            register={items.fecha_registro}
          />
            <Footer
              variant='third'
              onClick={() => removeEncuesta(items.id)}
              textSubmit='Eliminar'
            />
        </DivContent>
      ))}
    </>
  )
}
