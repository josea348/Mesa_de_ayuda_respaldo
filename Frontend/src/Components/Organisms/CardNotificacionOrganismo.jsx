import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardNotificacionMolecule from '../Molecules/CardNotificacionMolecule'
import EditDeleteButton from '../Molecules/EditDeleteButton'
import Texto from '../Atom/Texto';

import { useNotificacion } from '../../context/NotificacionContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Molecules/Footer';

export default function CardNotificacionOrganismo({ isGridActive }) {
  const idUser = localStorage.getItem('id');
  const { notificacion, notificacionId, notificacionError, notificacionLoading, listNotificaciones, listNotificacionesId, removeNotificacion } = useNotificacion();
  const navigate = useNavigate();

  console.log(notificacion);
  console.log(notificacionId);

  useEffect(() => {
    listNotificaciones();
  }, [listNotificaciones]);

  useEffect(() => {
    listNotificacionesId(idUser);
  }, [listNotificacionesId, idUser]);

  if (notificacionLoading) {
    return <Texto>Cargando información de las notificaciones...</Texto>;
  }

  if (notificacionError) {
    return <Texto>{notificacionError}</Texto>;
  }

  if (!notificacion) {
    return <Texto>Cargando información de las notificaciones...</Texto>;
  }

  if (!notificacionId) {
    return <Texto>Cargando información de las notificaciones...</Texto>;
  }

  return (
    <>
      {notificacionId.map((items) => (
        <DivContent className={`${isGridActive ? 'flex-col' : 'justify-between' } flex gap-2 p-3 rounded-lg bg-gray-50 shadow-md`} key={items.id}>
          <CardNotificacionMolecule
            titulo={items.titulo}
            comentario={items.comentario}
            register={items.f_register_notificacion}
          />
          <Footer
            variant='third'
            onClick={() => removeNotificacion(items.id)}
            textSubmit='Eliminar'
          />
        </DivContent>
      ))}
    </>
  )
}
