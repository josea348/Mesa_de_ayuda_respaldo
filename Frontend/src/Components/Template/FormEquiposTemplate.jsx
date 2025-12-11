import DivContent from '../Atom/DivContent'
import ContentInputString from '../Organisms/ContentInputString';
import TitleSecond from '../Atom/TitleSecond';
import Formulario from '../Atom/Formulario';
import ContentSelect from '../Organisms/ContentSelect';
import ContentInputTextarea from '../Organisms/ContentInputTextarea';
import Option from '../Atom/Option';
import Footer from '../Molecules/Footer';
import { useEquipos } from '../../context/EquiposContext';
import { useAmbientes } from '../../context/AmbientesContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormEquiposTemplate() {
  const idUser = localStorage.getItem('id');
  const [addEquiposForm, setAddEquiposForm] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    idAmbiente: '',
  });
  const { createEquipo, editEquipo, listEquipoId, equipoId } = useEquipos();
  const { ambientes, listAmbientes } = useAmbientes();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);
  console.log(idUser);

  useEffect(() => {
    if (params.id) {
      listEquipoId(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    listAmbientes();
  }, []);

  console.log(ambientes);
  console.log(equipoId);

  useEffect(() => {
    if (equipoId && params.id) {
      setAddEquiposForm({
        nombre: equipoId.nombre || '',
        descripcion: equipoId.descripcion || '',
        tipo: equipoId.tipo || '',
        idAmbiente: equipoId.id_ambiente || '',
      })
    }
  }, [equipoId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddEquiposForm({ ...addEquiposForm, [name]: name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editEquipo(params.id, addEquiposForm)
      : await createEquipo(addEquiposForm);
    if (response.success) {
      navigate('/equipos');
    }
  }

  const closeForm = () => {
    navigate('/equipos');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">Registro De Equipos</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Nombre' placeholder="Ingrese su nombre" name='nombre' onChange={handleChange} value={addEquiposForm.nombre} />
        <ContentInputTextarea text='Descripcion' placeholder="Ingrese su descripcion" name='descripcion' onChange={handleChange} value={addEquiposForm.descripcion} />
        <ContentInputString text='Tipo' placeholder="Ingrese su tipo" name='tipo' onChange={handleChange} value={addEquiposForm.tipo} />
        <ContentSelect text='Ambiente' name='idAmbiente' onChange={handleChange} value={addEquiposForm.idAmbiente}>
          <Option value="">Selecciona la ambiente</Option>
          {(ambientes || []).map(items => (
            <Option key={items.id} value={items.id}>{items.nombre}</Option>
          ))}
        </ContentSelect>
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
