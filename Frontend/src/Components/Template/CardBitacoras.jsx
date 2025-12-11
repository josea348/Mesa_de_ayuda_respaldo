import React from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title';
import BtnAdd from '../Molecules/BtnAdd';
import CardBitacorasOrganism from '../Organisms/CardBitacorasOrganism'
import { useNavigate } from 'react-router-dom'

export default function CardBitacoras() {
  const navigate = useNavigate();

  const AddBitacora = () => {
    navigate('/add-bitacoras');
  }

  return (
    <>
      <DivContent>
        <Title className={'text-center text-2xl font-bold mb-10'}>Bitacoras</Title>
        <BtnAdd text='Agregar Bitacora' onClick={AddBitacora} />
        <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
          <CardBitacorasOrganism />
        </DivContent>
      </DivContent>
    </>
  )
}
