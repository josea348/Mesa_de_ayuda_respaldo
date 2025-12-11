import { useEffect } from 'react'
import Title from '../Atom/Title'
import BtnAdd from '../Molecules/BtnAdd'
import DivContent from '../Atom/DivContent'
import CardAmbientesOrganism from '../Organisms/CardAmbientesOrganism'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function CardAmbientes() {
  const navigate = useNavigate();
  const { listUserId, userId } = useAuth();
  const idUser = localStorage.getItem('id');

  console.log(idUser);
  console.log(userId);

  useEffect(() => {
    listUserId(idUser);
  }, []);

  const addAmbiente = () => {
    navigate('/add-ambiente');
  }

  return (
    <><Title className={'text-center text-2xl font-bold mb-10'}>Ambientes</Title>
      {(userId || '').rol === 'Administrador' ? (
        <>
          <BtnAdd text='Agregar Ambiente' onClick={addAmbiente} />
        </>
      ) : (
        <></>
      )}
      <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
        <CardAmbientesOrganism />
      </DivContent>
      
    </>
  )
}
