import React, { useState } from 'react'
import DivContent from '../Atom/DivContent'
import TitleSecond from '../Atom/TitleSecond'
import Formulario from '../Atom/Formulario'
import ContentInputNumber from './../Organisms/ContentInputNumber';
import ContentInputTextarea from '../Organisms/ContentInputTextarea';
import Footer from '../Molecules/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEncuestas } from '../../context/EncuestasContext';

export default function FormEncuestaSatisfaccionTemplate() {
  const idUser = localStorage.getItem('id');
  const params = useParams();
  const [addEncuestaForm, setAddEncuestaForm] = useState({
    ticketId: params.id || '',
    usuarioId: idUser || '',
    calificacion: '',
    comentarios: '',
  });
  const { createEncuesta } = useEncuestas();
  const navigate = useNavigate();

  console.log(params);
  console.log(params.id);
  console.log(idUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddEncuestaForm({ ...addEncuestaForm, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createEncuesta(addEncuestaForm);
    if (response.success) {
      navigate('/dashboard');
    }
  }

  const closeForm = () => {
    navigate('/dashboard');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">Encuesta de satisfacción</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputNumber text='Calificacion' placeholder="Ingrese su calificacion" name='calificacion' onChange={handleChange} value={addEncuestaForm.calificacion} />
        <ContentInputTextarea text='Comentarios' placeholder="Ingrese su comentarios" name='comentarios' onChange={handleChange} value={addEncuestaForm.comentarios} />
        <Footer textSubmit='Registrar' variant='primary' />
      </Formulario>
    </DivContent>
  )
}
