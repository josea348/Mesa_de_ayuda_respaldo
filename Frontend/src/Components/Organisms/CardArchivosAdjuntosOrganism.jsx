import React, { useEffect } from 'react'
import DivContent from '../Atom/DivContent'
import CardArchivosAdjuntosMolecule from '../Molecules/CardArchivosAdjuntosMolecule'
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';
import { useArchivoAdjunto } from '../../context/ArchivosAdjuntosContext';
import { useNavigate } from 'react-router-dom';

export default function CardArchivosAdjuntosOrganism() {
  const { archivosJoin, listArchivosJoin, archivosError, archivosLoading, removeArchivos } = useArchivoAdjunto();
  const navigate = useNavigate();
  const idUser = localStorage.getItem('id');

  console.log(idUser);
  console.log(listArchivosJoin);

  useEffect(() => {
    listArchivosJoin();
  }, []);

  const updateArchivo = (id) => {
    navigate(`/edit-file/${id}`);
  }

  if (archivosLoading) {
    return <Texto>Cargando información de los archivos...</Texto>;
  }

  if (archivosError) {
    return <Texto>{archivosError}</Texto>;
  }

  if (archivosJoin?.length === 0) {
    return <Texto>No hay archivos registrados.</Texto>;
  }
  /* if (!archivosJoin) {
      return <Texto>Cargando información del archivos...</Texto>;
    } */

  return (
    <>
      {archivosJoin.map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardArchivosAdjuntosMolecule
            ticket={items.ticket}
            nameFile={items.nombre_archivo}
            file={items.archivo}
            ver={`http://localhost:4001/files/${items.archivo}`}
            register={items.fecha_creacion}
          />
          <DivContent className='flex flex-row gap-2'>
            <EditDeleteButton
              edit={() => updateArchivo(items.id)}
              deletes={() => removeArchivos(items.id)}
            />
          </DivContent>
        </DivContent>
      ))}
    </>
  )
}
