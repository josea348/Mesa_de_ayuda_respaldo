import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import TitleSecond from '../Atom/TitleSecond'
import Formulario from '../Atom/Formulario'
import ContentInputTextarea from '../Organisms/ContentInputTextarea'
import Footer from '../Molecules/Footer'
import { useParams } from 'react-router-dom'
import { useComentarios } from '../../context/ComentariosContext'
import Button from '../Atom/Button'
import { useAuth } from '../../context/AuthContext'

export default function FormComentariosTemplate({ comentarioInicial, onFormReset }) {
  // const params = useParams();
  const idUser = localStorage.getItem('id');
  const [addComentarioForm, setAddComentarioForm] = useState({
    ticketId: '',
    usuarioId: idUser || '',
    comentario: '',
  });
  const { createComentario, editComentario, listComentarioId, comentarioId } = useComentarios();
  const { active } = useAuth();
  // const navigate = useNavigate();
  
  const { id: ticketIdFromUrl } = useParams();

  console.log(ticketIdFromUrl);
  console.log(comentarioInicial);
  // console.log(params.id);

  useEffect(() => {
    if (comentarioInicial) {
      listComentarioId(comentarioInicial);
    }
  }, [comentarioInicial]);

  console.log(comentarioId);

  useEffect(() => {
    if (comentarioId && comentarioInicial) {
      setAddComentarioForm({
        ticketId: comentarioId.ticket_id || ticketIdFromUrl,
        usuarioId: comentarioId.usuario_id || idUser,
        comentario: comentarioId.comentario || '',
      })
    } else {
      setAddComentarioForm({
        ticketId: ticketIdFromUrl || '',
        usuarioId: idUser || '',
        comentario: '',
      })
    }
  }, [comentarioInicial, idUser, ticketIdFromUrl, comentarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddComentarioForm({ ...addComentarioForm, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = comentarioInicial
      ? await editComentario(comentarioInicial, addComentarioForm)
      : await createComentario(addComentarioForm);
    if (response.success) {
      onFormReset();
    }
  }

  // --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));

  return (
    <DivContent className={`bg-white rounded-xl p-2 shadow-2xl fixed bottom-4  right-[10%] ${active ? 'w-[calc(80%-150px)] sm:w-[calc(80%-195px)] lg:w-[calc(80%-240px)] left-[calc(10%+150px)] sm:left-[calc(10%+195px)] lg:left-[calc(10%+240px)]' : 'w-[calc(80%-50px)] left-[calc(10%+50px)]'}`}>
      <Formulario onSubmit={handleSubmit} className="space-y-4 flex flex-row  items-center">
        <ContentInputTextarea text='Comentario' placeholder="Ingrese su comentario" name="comentario" onChange={handleChange} value={addComentarioForm.comentario} className='w-full mr-2' />
        <Footer textSubmit={comentarioInicial ? 'Actualizar' : 'Registrar'} clasName='mt-auto mb-auto' variant='primary' />
        {comentarioInicial && (
          <Button
            type="button"
            onClick={onFormReset}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200'
          >
            Cancelar
          </Button>
        )}
      </Formulario>
    </DivContent>
  )
}
