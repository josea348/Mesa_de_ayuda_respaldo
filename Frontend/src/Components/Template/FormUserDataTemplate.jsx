import React, { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import Formulario from '../Atom/Formulario'
import ContentInputString from '../Organisms/ContentInputString'
import ContentInputNumber from '../Organisms/ContentInputNumber'
import ContentInputEmail from '../Organisms/ContentInputEmail'
import ContentInputFile from '../Organisms/ContentInputFile'
import Footer from '../Molecules/Footer'

import { useAuth } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function FormUserDataTemplate() {
  const [updateUserForm, setUpdateUserForm] = useState({
      nombre: '',
      telefono: '',
      email: '',
      image: null
    });
    const { editDataUser, listUserId, userId } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
  
    console.log(params);
    console.log(params.id);
  
    useEffect(() => {
      if (params.id) {
        listUserId(params.id);
      }
    }, [listUserId, params.id]);
  
    useEffect(() => {
      if (userId && params.id) {
        setUpdateUserForm({
          nombre: userId.nombre || '',
          telefono: userId.telefono || '',
          email: userId.email || '',
          image: null,
        })
      }
    }, [userId, params.id]);
  
    const handleChange = (e) => {
      const {name,value,files} = e.target;
      setUpdateUserForm({...updateUserForm, [name]: name === "image" ? files[0] : value});
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      for (let key in updateUserForm) {
        formData.append(key, updateUserForm[key]);
      }
  
      const response = await editDataUser(params.id, formData);
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
      <Title className='font-bold text-2xl m-3 mb-5'>Actualizar datos del usuario</Title>
      <Formulario onSubmit={handleSubmit}>
        <ContentInputString text='Nombre' placeholder="Ingrese su nombre" name='nombre' onChange={handleChange} value={updateUserForm.nombre} />
        <ContentInputNumber text='Telefono' placeholder="Ingrese su telefono" name='telefono' onChange={handleChange} value={updateUserForm.telefono} />
        <ContentInputEmail text='Correo' name='email' onChange={handleChange} value={updateUserForm.email} />
        <ContentInputFile text='Imagen' name='image' onChange={handleChange} value={updateUserForm.image} />
        <Footer textSubmit='Registrar' variant='primary' />
      </Formulario>
    </DivContent>
  )
}
