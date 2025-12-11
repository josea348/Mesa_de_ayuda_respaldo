import React, { useState } from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import CardComentarioOrganismo from '../Organisms/CardComentarioOrganismo';
import FormComentariosTemplate from './FormComentariosTemplate';
import CardTicketsIdOrganismo from '../Organisms/CardTicketsIdOrganismo';
import { useAuth } from '../../context/AuthContext';

export default function CardComentario() {
  const { active } = useAuth();
  const [comentarioToEdit, setComentarioToEdit] = useState(null);

  const handleEditComentario = (comentario) => {
    setComentarioToEdit(comentario);
  };

  const handleFormReset = () => {
    setComentarioToEdit(null);
  };

  return (
    <>
      <DivContent className={`${active ? 'w-[calc(100%-170px)] sm:w-[calc(100%-215px)] lg:w-[calc(100%-260px)]' : 'w-[calc(100%-80px)]'} h-[calc(100%-264px)] fixed overflow-y-auto`}>
        <CardTicketsIdOrganismo />
        <Title className='text-center text-2xl font-bold mb-4 mt-4'>Comentarios</Title>
        <DivContent className='grid grid-cols-1 p-2 gap-4 overflow-y-auto'>
          <CardComentarioOrganismo onEdit={handleEditComentario} />
        </DivContent>
        <FormComentariosTemplate comentarioInicial={comentarioToEdit} onFormReset={handleFormReset} />
      </DivContent>
    </>
  )
}
