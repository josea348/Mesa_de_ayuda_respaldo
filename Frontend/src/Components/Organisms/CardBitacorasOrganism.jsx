import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardBitacorasMolecule from '../Molecules/CardBitacorasMolecule'
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';

import { useBitacoras } from '../../context/BitacorasContext';
import { useNavigate } from 'react-router-dom';

export default function CardBitacorasOrganism() {
  const { bitacorasJoin, bitacorasError, bitacorasLoading, listBitacorasJoin, removeBitacora } = useBitacoras();
  const navigate = useNavigate();

  console.log(listBitacorasJoin);

  useEffect(() => {
    listBitacorasJoin();
  }, []);

  const updateBitacoras = (id) => {
    navigate(`/edit-bitacoras/${id}`);
  }

  if (bitacorasLoading) {
    return <Texto>Cargando información de los bitacoras...</Texto>;
  }

  if (bitacorasError) {
    return <Texto>{bitacorasError}</Texto>;
  }

  if (!bitacorasJoin) {
    return <Texto>Cargando información de los bitacoras...</Texto>;
  }

  return (
    <>
      {(bitacorasJoin || []).map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardBitacorasMolecule
            accion={items.accion}
            detalles={items.detalles}
            usuarioId={items.username}
            ticketId={items.title_tickets}
            register={items.fecha_creacion}
          />
          <DivContent className='flex flex-row gap-2'>
            <EditDeleteButton
              edit={() => updateBitacoras(items.id)}
              deletes={() => removeBitacora(items.id)}
            />
          </DivContent>
        </DivContent>
      ))}
    </>
  )
}
