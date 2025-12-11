import DivContent from './../Atom/DivContent';
import CardReservaOrganism from '../Organisms/CardReservaOrganism';
import Title from '../Atom/Title';
import BtnAdd from '../Molecules/BtnAdd';

import { useNavigate } from 'react-router-dom';

export default function CardReserva() {
  const navigate = useNavigate();

  const addReservaAmbiente = () => {
    navigate('/add-reserva-ambiente');
  }
  const addReservaEquipo = () => {
    navigate('/add-reserva-equipo');
  }

  return (
    <DivContent>
      <Title className={'text-center text-2xl font-bold mb-10'}>Reservas</Title>
      <DivContent className='flex flex-rows gap-1 mb-5'>
        <BtnAdd text='Reservar Ambiente' onClick={addReservaAmbiente} />
        <BtnAdd text='Reservar Equipo' onClick={addReservaEquipo} />
      </DivContent>
      <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
        <CardReservaOrganism />
      </DivContent>
    </DivContent>

  )
}
