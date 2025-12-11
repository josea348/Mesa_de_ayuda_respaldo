import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent';
import TitleSecond from '../Atom/TitleSecond';
import Formulario from '../Atom/Formulario';
import ContentInputString from '../Organisms/ContentInputString';
import ContentInputNumber from '../Organisms/ContentInputNumber';
import Footer from '../Molecules/Footer';
import ContentSelectArea from '../Organisms/ContentSelectArea';
import { useAmbientes } from '../../context/AmbientesContext';
import { useNavigate, useParams } from 'react-router-dom';
import ContentInputTextarea from '../Organisms/ContentInputTextarea';
import ContentSelectEstadoAmbiente from '../Organisms/ContentSelectEstadoAmbiente';

export default function FormAmbienteTemplate() {
  const [addAmbienteForm, setAddAmbienteForm] = useState({
    nombre: '',
    ubicacion: '',
    capacidad: '',
    estado: '',
    areaId: ''
  });
  const { createAmbiente, editAmbiente, listAmbienteId, ambienteId } = useAmbientes();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);

  useEffect(() => {
    if (params.id) {
      listAmbienteId(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (ambienteId && params.id) {
      setAddAmbienteForm({
        nombre: ambienteId.nombre || '',
        ubicacion: ambienteId.ubicacion || '',
        capacidad: ambienteId.capacidad || '',
        estado: ambienteId.estado || '',
        areaId: ambienteId.area_id || '',
      })
    }
  }, [ambienteId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddAmbienteForm({ ...addAmbienteForm, [name]: name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editAmbiente(params.id, addAmbienteForm)
      : await createAmbiente(addAmbienteForm);
    if (response.success) {
      navigate('/ambientes');
    }
  }

  const closeForm = () => {
    navigate('/ambientes');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">{params.id ? 'Actualizar' : 'Registro De'} Ambiente</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Nombre' name='nombre' placeholder="Ingrise su nombre" onChange={handleChange} value={addAmbienteForm.nombre} />
        <ContentInputTextarea text='Ubicación' name='ubicacion' placeholder="Ingrise su ubicación" onChange={handleChange} value={addAmbienteForm.ubicacion} />
        <ContentInputNumber text='Capacidad' name='capacidad' placeholder="Ingrise su capacidad" onChange={handleChange} value={addAmbienteForm.capacidad} />
        <ContentSelectEstadoAmbiente text='Estado' name='estado' onChange={handleChange} value={addAmbienteForm.estado} />
        <ContentSelectArea text='Area' name='areaId' onChange={handleChange} value={addAmbienteForm.areaId} />
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>

    </DivContent>
  )
}
