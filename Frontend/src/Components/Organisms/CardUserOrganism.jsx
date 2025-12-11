import React, { useEffect } from 'react'
import CardUserMolecule from '../Molecules/CardUserMolecule'
import Image from '../Atom/Image';
import ActionButtonsUser from '../Molecules/ActionButtonsUser';
import Texto from '../Atom/Texto';

import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router';

export default function CardUserOrganism() {
  const { userId, listUserId } = useAuth();
  const id = JSON.parse(localStorage.getItem('id'));
  const navigate = useNavigate();
  console.log(id);
  console.log(userId);

  useEffect(() => {
    if (id) {
      listUserId(id);
    }
  }, [id]);

  if (!userId) {
    return <Texto>Cargando información del perfil...</Texto>;
  }

  const edit_data_user = (id) => {
    navigate(`/edit-data-user/${id}`)
  }

  const edit_password_user = (id) => {
    navigate(`/edit-password-user/${id}`)
  }

  return (
    <>
      <Image src={`http://localhost:4001/img/${userId.image}`} alt={userId.nombre} className="w-34 h-34 rounded-full mx-auto" />
      <CardUserMolecule identificacion={userId.identificacion} nombre={userId.nombre} telefono={userId.telefono} correo={userId.email} rol={userId.rol} />
      <ActionButtonsUser onEditData={() => edit_data_user(userId.identificacion)} onEditPassword={() => edit_password_user(userId.identificacion)} />
    </>
  )
}
