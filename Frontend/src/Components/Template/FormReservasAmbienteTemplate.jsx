import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import TitleSecond from '../Atom/TitleSecond'
import Formulario from '../Atom/Formulario'
import ContentSelect from '../Organisms/ContentSelect'
import Option from '../Atom/Option'
import ContentInputDate from './../Organisms/ContentInputDate';
import Footer from '../Molecules/Footer'
import { useReservas } from '../../context/ReservasContext'
import { useAmbientes } from '../../context/AmbientesContext'
import { useNavigate, useParams } from 'react-router-dom'
import ContentInputDateTime from '../Organisms/ContentInputDateTime'

export default function FormReservasAmbienteTemplate() {
  const idUser = localStorage.getItem('id');
  const [addReservasAmbienteForm, setAddReservasAmbienteForm] = useState({
    usuarioId: idUser || '',
    ambienteId: '',
    fechaInicio: '',
    fechaFin: '',
    estado: '',
  });
  const { createReservaAmbiente, editReservaAmbiente, listReservaAmbienteId, reservaAmbienteId } = useReservas();
  const { ambientes, listAmbientes } = useAmbientes();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);
  console.log(idUser);

  useEffect(() => {
    if (params.id) {
      listReservaAmbienteId(params.id);
    }
  }, [params.id, listReservaAmbienteId]);

  useEffect(() => {
    listAmbientes();
  }, [listAmbientes]);

  console.log(ambientes);
  console.log(reservaAmbienteId);

  useEffect(() => {
    if (reservaAmbienteId && params.id) {
      setAddReservasAmbienteForm({
        usuarioId: idUser || '',
        ambienteId: reservaAmbienteId.ambiente_id || '',
        fechaInicio: reservaAmbienteId.fecha_inicio || '',
        fechaFin: reservaAmbienteId.fecha_fin || '',
        estado: reservaAmbienteId.estado || '',
      })
    }
  }, [reservaAmbienteId, params.id, idUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddReservasAmbienteForm({ ...addReservasAmbienteForm, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editReservaAmbiente(params.id, addReservasAmbienteForm)
      : await createReservaAmbiente(addReservasAmbienteForm);
    if (response.success) {
      navigate('/reservas');
    }
  }

  const closeForm = () => {
    navigate('/reservas');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">{params.id ? 'Actualizar reserva' : 'Reservar'} ambiente</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentSelect text='Ambiente' name='ambienteId' onChange={handleChange} value={addReservasAmbienteForm.ambienteId}>
          <Option value="">Selecciona la ambiente</Option>
          {(ambientes || []).map(items => (
            <Option key={items.id} value={items.id}>{items.nombre}</Option>
          ))}
        </ContentSelect>
        <ContentInputDateTime text='Fecha de incio' name='fechaInicio' onChange={handleChange} value={addReservasAmbienteForm.fechaInicio} />
        <ContentInputDateTime text='Fecha de fin' name='fechaFin' onChange={handleChange} value={addReservasAmbienteForm.fechaFin} />
        <ContentSelect text='Ambiente' name='estado' onChange={handleChange} value={addReservasAmbienteForm.estado}>
          <Option value="">Selecciona la ambiente</Option>
          <Option value="Pendiente">Pendiente</Option>
          <Option value="Confirmado">Confirmado</Option>
          <Option value="Cancelada">Cancelada</Option>
          <Option value="Completada">Completada</Option>
        </ContentSelect>
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
