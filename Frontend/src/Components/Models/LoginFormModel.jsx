import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DivContent from '../Atom/DivContent';
import TitleSecond from '../Atom/TitleSecond';
import Formulario from '../Atom/Formulario';
import ContentInputEmailLogin from '../Organisms/ContentInputEmailLogin';
import ContentInputPasswordLogin from '../Organisms/ContentInputPasswordLogin';
import Button from '../Atom/Button';
import Footer from '../Molecules/Footer';

import { LockIcon } from '../../Icons/LockIcon';
import { MailIcon } from '../../Icons/MailIcon';

export default function LoginFormModel({ isOpen }) {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })
  const { signin, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signin(formData);
    } catch (error) {
      console.log(error);
    }
  }

  const loginClose = () => {
    navigate('/');
  }

  return (
    <DivContent className='w-lg h-xl bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative'>
      <DivContent className="text-2xl font-bold absolute top-5 right-8 cursor-pointer" onClick={loginClose}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4">Iniciar sesión</TitleSecond>
      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputEmailLogin text='Correo' placeholder="Enter your Email" name='login' onChange={handleChange}>
          <MailIcon />
        </ContentInputEmailLogin>
        <ContentInputPasswordLogin text='Contraseña' placeholder="Enter your password" name='password' onChange={handleChange}>
          <LockIcon />
        </ContentInputPasswordLogin>
        <DivContent className="flex justify-end gap-2 mt-6">
          <Button
            type='Submit'
            className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Entrar
          </Button>
        </DivContent>
      </Formulario>
    </DivContent>
  )
}
