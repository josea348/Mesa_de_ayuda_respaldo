import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import TitleSecond from '../Atom/TitleSecond'
import Formulario from '../Atom/Formulario'
import Footer from '../Molecules/Footer'
import ContentInputString from '../Organisms/ContentInputString'
import ContentInputTextarea from '../Organisms/ContentInputTextarea'
import ContentSelect from '../Organisms/ContentSelect'
import Option from '../Atom/Option'
import { useBitacoras } from '../../context/BitacorasContext'
import { useTickets } from '../../context/TicketsContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function FormBitacorasTemplate() {
  const idUser = localStorage.getItem('id');
  const [addBitacorasForm, setAddBitacorasForm] = useState({
    accion: '',
    detalles: '',
    usuarioId: idUser || '',
    ticketId: '',
  });
  const { createBitacora, editBitacora, listBitacoraId, bitacoraId } = useBitacoras();
  const { tickets, listTickets } = useTickets();
  const navigate = useNavigate();
  const params = useParams();

  console.log(listTickets);
  console.log(params);
  console.log(params.id);
  console.log(idUser);
  console.log(bitacoraId);

  useEffect(() => {
    listTickets();
  }, []);

  useEffect(() => {
    if (params.id) {
      listBitacoraId(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (bitacoraId && params.id) {
      setAddBitacorasForm({
        accion: bitacoraId.accion || '',
        detalles: bitacoraId.detalles || '',
      })
    }
  }, [bitacoraId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddBitacorasForm({ ...addBitacorasForm, [name]: name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editBitacora(params.id, addBitacorasForm)
      : await createBitacora(addBitacorasForm);
    if (response.success) {
      navigate('/bitacoras');
    }
  }

  const closeForm = () => {
    navigate('/bitacoras');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">Registro De Bitacoras</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Acción' placeholder="Enter your acción" name="accion" onChange={handleChange} value={addBitacorasForm.accion} />
        <ContentInputTextarea text='Detalles' placeholder="Enter your detalles" name="detalles" onChange={handleChange} value={addBitacorasForm.detalles} />
        {!params.id ? (
          <ContentSelect text='Ticket' placeholder="Enter your id ticket" name="ticketId" onChange={handleChange} value={addBitacorasForm.ticketId} >
            <Option value="">Seleccione el tickets</Option>
            {(tickets || []).map(items => (
              <Option key={items.id} value={items.id}>{items.titulo}</Option>
            ))}
          </ContentSelect>
        ) : (
          <></>
        )}

        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
