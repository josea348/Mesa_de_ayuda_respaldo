import React from 'react'
import DivContent from '../Atom/DivContent'
import Texto from '../Atom/Texto'

export default function CardComentarioMolecule({ username, comentario }) {
  return (
    <DivContent>
      <Texto>{username}</Texto>
      <Texto><b>Descripción:</b> {comentario}</Texto>
    </DivContent>
  )
}
