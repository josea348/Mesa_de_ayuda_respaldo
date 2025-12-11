import React from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title';
import BtnAdd from '../Molecules/BtnAdd';
import CardTicketsOrganism from './../Organisms/CardTicketsOrganism';
import { useNavigate } from 'react-router-dom';

export default function CardTickets() {
  const navigate = useNavigate();

  const addTickets = () => {
    navigate('/add-tickets');
  }
 
  return (
    <DivContent>
      <Title className={'text-center text-2xl font-bold mb-10'}>Tickets</Title>
      <BtnAdd text='Agregar Tickets' onClick={addTickets} />
      <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-2 gap-4'>
        <CardTicketsOrganism />
      </DivContent>
    </DivContent>
  )
}
