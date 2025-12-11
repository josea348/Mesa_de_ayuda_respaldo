import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import TitleSecond from '../Atom/TitleSecond'
import Formulario from '../Atom/Formulario'
import ContentSelect from '../Organisms/ContentSelect'
import Option from '../Atom/Option'
import ContentInputDate from '../Organisms/ContentInputDate'
import ContentInputDateTime from '../Organisms/ContentInputDateTime'
import Footer from '../Molecules/Footer'
import { useReservas } from '../../context/ReservasContext'
import { useEquipos } from '../../context/EquiposContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function FormReservasEquipoTemplate() {
  const idUser = localStorage.getItem('id');
  const [addReservasEquipoForm, setAddReservasEquipoForm] = useState({
    usuarioId: idUser || '',
    equipoId: '',
    fechaInicio: '',
    fechaFin: '',
    estado: '',
  });
  const { createReservaEquipo, editReservaEquipo, listReservaEquipoId, reservaEquipoId } = useReservas();
  const { equipos, listEquipos } = useEquipos();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);
  console.log(idUser);

  useEffect(() => {
    if (params.id) {
      listReservaEquipoId(params.id);
    }
  }, [listReservaEquipoId, params.id]);

  useEffect(() => {
    listEquipos();
  }, [listEquipos]);

  console.log(equipos);
  console.log(reservaEquipoId);

  useEffect(() => {
    if (reservaEquipoId && params.id) {
      setAddReservasEquipoForm({
        usuarioId: idUser || '',
        equipoId: reservaEquipoId.equipo_id || '',
        fechaInicio: reservaEquipoId.fecha_inicio || '',
        fechaFin: reservaEquipoId.fecha_fin || '',
        estado: reservaEquipoId.estado || '',
      })
    }
  }, [reservaEquipoId, params.id, idUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddReservasEquipoForm(prev => ({ ...prev, [name]: value }));
    console.log(addReservasEquipoForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editReservaEquipo(params.id, addReservasEquipoForm)
      : await createReservaEquipo(addReservasEquipoForm);
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
      <TitleSecond className="text-2xl font-bold mb-4 text-center">{params.id ? 'Actualizar reserva' : 'Reservar'} equipos</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentSelect text='Equipo' name='equipoId' onChange={handleChange} value={addReservasEquipoForm.equipoId}>
          <Option value="">Selecciona la equipo</Option>
          {(equipos || []).map(items => (
            <Option key={items.id} value={items.id}>{items.nombre}</Option>
          ))}
        </ContentSelect>
        <ContentInputDateTime text='Fecha de incio' name='fechaInicio' onChange={handleChange} value={addReservasEquipoForm.fechaInicio} />
        <ContentInputDateTime text='Fecha de fin' name='fechaFin' onChange={handleChange} value={addReservasEquipoForm.fechaFin} />
        <ContentSelect text='Estado' name='estado' onChange={handleChange} value={addReservasEquipoForm.estado}>
          <Option value="">Selecciona la estado</Option>
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
