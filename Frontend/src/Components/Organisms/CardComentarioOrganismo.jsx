import React, { useEffect } from 'react'
import DivContent from '../Atom/DivContent'
import CardComentarioMolecule from '../Molecules/CardComentarioMolecule';
import EditDelete from '../Molecules/EditDelete';
import Texto from '../Atom/Texto';
import { useComentarios } from '../../context/ComentariosContext';
import { useParams } from 'react-router-dom';

export default function CardComentarioOrganismo({onEdit}) {
  const { listComentariosJoin, comentariosError, comentariosLoading, removeComentario, comentarioIdByTickets, listComentarioByTickets } = useComentarios();
  const params = useParams();
  const idUser = localStorage.getItem('id');

  console.log(listComentarioByTickets);
  console.log(params.id);
  console.log(idUser);
  console.log(comentarioIdByTickets);

  useEffect(() => {
    listComentarioByTickets(params.id);
  }, [listComentarioByTickets, params.id]);

  useEffect(() => {
    listComentariosJoin();
  }, [listComentariosJoin]);

  const updateComentario = (comentario) => {
    onEdit(comentario);
  }

  if (comentariosLoading) {
    return <Texto>Cargando información de los comentarios...</Texto>;
  }

  if (comentariosError) {
    return <Texto>{comentariosError}</Texto>;
  }

  if (!comentarioIdByTickets) {
    return <Texto>Cargando información de los comentarios...</Texto>;
  }

  return (
    <>
      {(comentarioIdByTickets || []).map(items => (
        <DivContent className='w-full flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id} >
          <CardComentarioMolecule
            username={items.usuario}
            comentario={items.comentario}
          />
          {items.usuario_id == idUser && (
              <DivContent className='flex flex-row gap-2'>
                <EditDelete
                  edit={() => updateComentario(items.id)}
                  deletes={() => removeComentario(items.id)}
                />
              </DivContent> 
          )}
        </DivContent>
      ))}
    </>
  )
}
