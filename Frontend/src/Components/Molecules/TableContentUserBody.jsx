import React from 'react'
import Button from '../Atom/Button'
import { EditIcon } from '../../Icons/EditIcon'
import TableRow from '../Atom/TableRow'
import TableColumn from '../Atom/TableColumn'
import EditDeleteButton from './EditDeleteButton';
import Image from '../Atom/Image'

export default function TableContentUserBody({ onClick, onDeletes, identificacion, name, img, telefono, email, rol }) {
  return (
    <TableRow>
      <TableColumn className='p-1'>{identificacion}</TableColumn>
      <TableColumn className='p-1'>{name}</TableColumn>
      <TableColumn className='p-1'><Image src={img} alt={name} className='w-13 h-13 rounded-full' /></TableColumn>
      <TableColumn className='p-1'>{telefono}</TableColumn>
      <TableColumn className='p-1'>{email}</TableColumn>
      <TableColumn className='p-1'>{rol}</TableColumn>
      <TableColumn className='p-1 flex justify-center flex-row'>
        <EditDeleteButton edit={onClick} deletes={onDeletes} />
      </TableColumn>
    </TableRow>
  )
}
