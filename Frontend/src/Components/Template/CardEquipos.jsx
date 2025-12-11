import React, { useEffect } from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title';
import BtnAdd from '../Molecules/BtnAdd';
import CardEquiposOrganismo from '../Organisms/CardEquiposOrganismo'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

export default function CardEquipos() {
  const navigate = useNavigate();
  const { listUserId, userId } = useAuth();
  const idUser = localStorage.getItem('id');

  console.log(idUser);
  console.log(userId);

  useEffect(() => {
    listUserId(idUser);
  }, []);

  const AddBitacora = () => {
    navigate('/add-equipo');
  }

  return (
    <>
      <DivContent>
        <Title className={'text-center text-2xl font-bold mb-10'}>Equipos</Title>
        {(userId || '').rol === 'Administrador' ? (
          <>
            <BtnAdd text='Agregar equipo' onClick={AddBitacora} />
          </>
        ) : (
          <></>
        )}
        <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
          <CardEquiposOrganismo />
        </DivContent>
      </DivContent>
    </>
  )
}
