import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import BtnAdd from '../Molecules/BtnAdd'
import CardAreasOrganism from '../Organisms/CardAreasOrganism';

import { useNavigate } from 'react-router-dom'

export default function CardAreas() {
  const navigate = useNavigate();
  const { listUserId, userId } = useAuth();
  const idUser = localStorage.getItem('id');
  
  console.log(idUser);
  console.log(userId);

  useEffect(()=>{
    listUserId(idUser);
  },[]);

  const AddArea = () => {
    navigate('/add-area');
  }

  return (
    <>
      <DivContent>
        <Title className={'text-center text-2xl font-bold mb-10'}>Areas</Title>
        {(userId || '').rol === 'Administrador' ? (
          <>
            <BtnAdd text='Agregar Area' onClick={AddArea} />
          </>
        ):(
          <></>
        )}
        <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
          <CardAreasOrganism />
        </DivContent>
      </DivContent>
    </>
  )
}
