import React, { useState } from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import Formulario from '../Atom/Formulario'
import ContentInputPasswordLogin from '../Organisms/ContentInputPasswordLogin'
import Footer from '../Molecules/Footer'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { LockIcon } from '../../Icons/LockIcon'

export default function FormUserPasswordTemplate() {
  const [updateUserForm, setUpdateUserForm] = useState({
    password: '',
  });
  const { editPasswordUser } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserForm({ ...updateUserForm, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await editPasswordUser(params.id, updateUserForm);
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
      <Title className='font-bold text-2xl m-3 mb-5'>Atualizar contraseña del usuario</Title>
      <Formulario onSubmit={handleSubmit}>
        <ContentInputPasswordLogin text='Contraseña' placeholder="Ingrese su contraseña" name='password' onChange={handleChange} value={updateUserForm.password} >
          <LockIcon />
        </ContentInputPasswordLogin>
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
