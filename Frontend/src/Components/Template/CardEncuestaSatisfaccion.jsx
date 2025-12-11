import React from 'react'
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import CardEncuestaSatisfaccionOrganism from '../Organisms/CardEncuestaSatisfaccionOrganism'

export default function CardEncuestaSatisfaccion() {
  return (
    <>
      <DivContent>
        <Title className={'text-center text-2xl font-bold mb-10'}>Encuestas de satisfación</Title>
        <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
          <CardEncuestaSatisfaccionOrganism />
        </DivContent>
      </DivContent>
    </>
  )
}
