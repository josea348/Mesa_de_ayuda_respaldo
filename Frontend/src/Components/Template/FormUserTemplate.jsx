import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import Formulario from '../Atom/Formulario'
import ContentInputNumber from '../Organisms/ContentInputNumber'
import ContentInputString from '../Organisms/ContentInputString'
import ContentInputEmail from '../Organisms/ContentInputEmail'
import ContentInputPassword from '../Organisms/ContentInputPassword'
import ContentSelect from '../Organisms/ContentSelect'
import Option from '../Atom/Option'
import ContentInputFile from '../Organisms/ContentInputFile'
import Footer from '../Molecules/Footer'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function FormUserTemplate() {
  const [addUserForm, setAddUserForm] = useState({
    identificacion: '',
    nombre: '',
    telefono: '',
    email: '',
    password: '',
    rol: '',
    image: null
  });
  const { createUser, editUser, listUserId, userId } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);

  useEffect(() => {
    if (params.id) {
      listUserId(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (userId && params.id) {
      setAddUserForm({
        identificacion: userId.identificacion || '',
        nombre: userId.nombre || '',
        telefono: userId.telefono || '',
        email: userId.email || '',
        password: '',
        rol: userId.rol || '',
        image: null,
      })
    }
  }, [userId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddUserForm({ ...addUserForm, [name] : name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in addUserForm) {
      formData.append(key, addUserForm[key]);
    }

    const response = params.id
      ? await editUser(params.id, formData)
      : await createUser(formData);
    if (response.success) {
      navigate('/perfil');
    }
  }
  
  const closeForm = () => {
    navigate('/perfil');
  }

  return (
    <DivContent className='w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4'>
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <Title className='font-bold text-2xl m-3 mb-5'>{params.id ? 'Actualizar' : 'Añadir'} usuario</Title>
      <Formulario onSubmit={handleSubmit}>
        <ContentInputNumber text='Identificacion' placeholder="Ingrese su identificación" name='identificacion' onChange={handleChange} value={addUserForm.identificacion} />
        <ContentInputString text='Nombre' placeholder="Ingrese su nombre" name='nombre' onChange={handleChange} value={addUserForm.nombre} />
        <ContentInputFile text='Imagen' placeholder="Ingrese su image" name='image' onChange={handleChange} value={addUserForm.image} />
        <ContentInputNumber text='Telefono' placeholder="Ingrese su telefono" name='telefono' onChange={handleChange} value={addUserForm.telefono} />
        <ContentInputEmail text='Correo' name='email' onChange={handleChange} value={addUserForm.email} />
        <ContentInputPassword text='Contraseña' name='password' onChange={handleChange} value={addUserForm.password} />
        <ContentSelect text='Rol' name='rol' onChange={handleChange} value={addUserForm.rol}>
          <Option value="">Selecciona el rol</Option>
          <Option value="Operario">Operario</Option>
          <Option value="Instructor">Instructor</Option>
          <Option value="Aprendiz">Aprendiz</Option>
        </ContentSelect>
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
