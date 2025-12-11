import DivContent from '../Atom/DivContent'
import ContentInputString from '../Organisms/ContentInputString';
import TitleSecond from '../Atom/TitleSecond';
import Formulario from '../Atom/Formulario';
import ContentSelect from '../Organisms/ContentSelect';
import ContentInputNumber from '../Organisms/ContentInputNumber';
import ContentInputTextarea from '../Organisms/ContentInputTextarea';
import ContentSelectCategoria from '../Organisms/ContentSelectCategoria';
import ContentSelectUser from '../Organisms/ContentSelectUser';
import Option from '../Atom/Option';
import Footer from '../Molecules/Footer';
import { useTickets } from '../../context/TicketsContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormTicketsTemplate() {
  const idUser = localStorage.getItem('id');
  const [addTicketsForm, setAddTicketsForm] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    prioridad: '',
    estado: '',
    solicitante: idUser || '',
    asignado: '',
  });
  const { createTicket, editTicket, listTicketId, ticketId } = useTickets();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);
  console.log(idUser);

  useEffect(() => {
    if (params.id) {
      listTicketId(params.id);
    }
  }, [params.id]);

  console.log(ticketId);

  useEffect(() => {
    if (ticketId && params.id) {
      setAddTicketsForm({
        titulo: ticketId.titulo || '',
        descripcion: ticketId.descripcion || '',
        categoria: ticketId.categoria || '',
        prioridad: ticketId.prioridad || '',
        estado: ticketId.estado || '',
        solicitante: idUser || '',
        asignado: ticketId.asignado || '',
      })
    }
  }, [ticketId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddTicketsForm({ ...addTicketsForm, [name]: name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editTicket(params.id, addTicketsForm)
      : await createTicket(addTicketsForm);
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
      <TitleSecond className="text-2xl font-bold mb-4 text-center">Registro De Tickets</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Titulo' placeholder="Ingrese su titulo" name='titulo' onChange={handleChange} value={addTicketsForm.titulo} />
        <ContentInputTextarea text='Descripcion' placeholder="Ingrese su descripcion" name='descripcion' onChange={handleChange} value={addTicketsForm.descripcion} />
        <ContentSelectCategoria text='Categoria' name='categoria' onChange={handleChange} value={addTicketsForm.categoria} />
        <ContentSelect text='Prioridad' name='prioridad' onChange={handleChange} value={addTicketsForm.prioridad}>
          <Option value="">Selecciona la prioridad</Option>
          <Option value="Alta">Alta</Option>
          <Option value="Media">Media</Option>
          <Option value="Baja">Baja</Option>
        </ContentSelect>
        <ContentSelect text='Estado' name='estado' onChange={handleChange} value={addTicketsForm.estado}>
          <Option value="">Selecciona el estado</Option>
          <Option value="Abierto">Abierto</Option>
          <Option value="En progreso">En progreso</Option>
          <Option value="Cerrado">Cerrado</Option>
        </ContentSelect>
        <ContentSelectUser text='Asignado' name='asignado' onChange={handleChange} value={addTicketsForm.asignado} />
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
