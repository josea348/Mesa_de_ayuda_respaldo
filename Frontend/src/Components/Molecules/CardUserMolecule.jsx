import React from 'react'
import DivContent from '../Atom/DivContent';
import Texto from '../Atom/Texto';

import Phone from './../../Icons/Phone';
import { UserIcon } from '../../Icons/UserIcon';
import UserRol from './../../Icons/UserRol';
import { MailIcon } from './../../Icons/MailIcon';

export default function CardUserMolecule({ identificacion, nombre, telefono,correo, rol}) {
  return (
    <DivContent className='flex justify-center items-center flex-col'>
      <DivContent>
        <Texto className='flex flex-row gap-2'><UserIcon />{identificacion}</Texto>
        <Texto className='flex flex-row gap-2'><UserIcon /> {nombre}</Texto>
        <Texto className='flex flex-row gap-2'><Phone /> {telefono}</Texto>
        <Texto className='flex flex-row gap-2'><MailIcon /> {correo}</Texto>
        <Texto className='flex flex-row gap-2'><UserRol /> {rol}</Texto>
      </DivContent>
    </DivContent>
  )
}
