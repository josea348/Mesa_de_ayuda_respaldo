import { createContext, useContext, useState } from 'react'
import { getNotificaReservasAmbiente, getNotificaReservasAmbienteJoin, getNotificaReservasAmbienteId, getNotificaReservasAmbienteIdJoin, getNotificaReservasJoinId, registerNotificaReservasAmbiente, updateNotificaReservasAmbiente, deleteNotificaReservasAmbiente, getNotificaReservasJoin, getNotificaReservasEquipo, getNotificaReservasEquipoJoin, getNotificaReservasEquipoId, getNotificaReservasEquipoIdJoin, registerNotificaReservasEquipo, updateNotificaReservasEquipo, deleteNotificaReservasEquipo } from '../apis/notificaciones';
import Swal from 'sweetalert2';

const NotificacionContext = createContext();

export const useNotificacion = () => {
  const context = useContext(NotificacionContext);
  if (!context) {
    throw new Error("useNotificacion must be used within an NotificacionProvider.");
  }
  return context;
}

export const NotificacionProvider = ({ children }) => {
  const [notificacion, setNotificacion] = useState(null);
  const [notificacionId, setNotificacionId] = useState(null);
  const [notificacionAmbiente, setNotificacionAmbiente] = useState(null);
  const [notificacionesAmbiente, setNotificacionesAmbiente] = useState(null);
  const [notificacionesAmbienteJoin, setNotificacionesAmbienteJoin] = useState(null);
  const [notificacionAmbienteId, setNotificacionAmbienteId] = useState(null);
  const [notificacionEquipo, setNotificacionEquipo] = useState(null);
  const [notificacionesEquipo, setNotificacionesEquipo] = useState(null);
  const [notificacionesEquipoJoin, setNotificacionesEquipoJoin] = useState(null);
  const [notificacionEquipoId, setNotificacionEquipoId] = useState(null);
  const [notificacionError, setNotificacionError] = useState(null);
  const [notificacionLoading, setNotificacionLoading] = useState(true);
  
  const listNotificacionesAmbiente = async () => {
    try {
      const response = await getNotificaReservasAmbiente();
      console.log(response);
      setNotificacionesAmbiente(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listNotificacionesAmbienteJoin = async () => {
    try {
      const response = await getNotificaReservasAmbienteJoin();
      console.log(response);
      setNotificacionesAmbienteJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        setNotificacionError(error.response?.data?.msg || "Error al cargar las notificaciones");
        setNotificacionesAmbienteJoin(null);
      } else if (error.response.data.status === 500) {
        setNotificacionError(error.response?.data?.msg || "Error al cargar las notificaciones");
        setNotificacionesAmbienteJoin(null);
      }
    } finally {
      setNotificacionLoading(false);
    }
  }

  const listNotificacionAmbienteId = async (id) => {
    try {
      const response = await getNotificaReservasAmbienteId(id);
      console.log(response.data);
      setNotificacionAmbienteId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listNotificacionAmbienteIdJoin = async (id) => {
    try {
      const response = await getNotificaReservasAmbienteIdJoin(id);
      console.log(response.data);
      setNotificacionAmbienteId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createNotificacionAmbiente = async (data) => {
    console.log(data);
    try {
      const response = await registerNotificaReservasAmbiente(data);
      console.log(response);
      setNotificacionAmbiente(response.data);
      await listNotificaciones();
      await listNotificacionesAmbiente();
      await listNotificacionesAmbienteJoin();
      Swal.fire({ title: 'Registro con exito', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.data.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return { success: false };
    }
  }

  const editNotificacionAmbiente = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateNotificaReservasAmbiente(id, data);
      console.log(response);
      setNotificacionAmbiente(response.data);
      await listNotificaciones();
      await listNotificacionesAmbiente();
      await listNotificacionesAmbienteJoin();
      Swal.fire({ title: 'Actualizado', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.data.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return { success: false };
    }
  }

  const removeNotificacionAmbiente = async (id) => {
    try {
      const response = await deleteNotificaReservasAmbiente(id);
      await listNotificaciones();
      await listNotificacionesAmbiente();
      await listNotificacionesAmbienteJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };



  const listNotificaciones = async () => {
    try {
      const response = await getNotificaReservasJoin();
      console.log(response);
      setNotificacion(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setNotificacionError(error.response?.data?.msg || "Error al cargar las notificaciones");
        setNotificacion(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setNotificacionError(error.response?.data?.msg || "Error al cargar las Notificaciones");
        setNotificacion(null);
      }
    } finally {
      setNotificacionLoading(false);
    }
  }

  const listNotificacionesId = async (id) => {
    console.log(id)
    try {
      const response = await getNotificaReservasJoinId(id);
      console.log(response);
      setNotificacionId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        setNotificacionError(error.response?.data?.msg || "Error al cargar las notificaciones");
        setNotificacionId(null);
      } else if (error.response.data.status === 500) {
        setNotificacionError(error.response?.data?.msg || "Error al cargar las Notificaciones");
        setNotificacionId(null);
      }
    } finally {
      setNotificacionLoading(false);
    }
  }



  const listNotificacionesEquipo = async () => {
    try {
      const response = await getNotificaReservasEquipo();
      console.log(response);
      setNotificacionesEquipo(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listNotificacionesEquipoJoin = async () => {
    try {
      const response = await getNotificaReservasEquipoJoin();
      console.log(response);
      setNotificacionesEquipoJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setNotificacionError(error.response?.data?.msg || "Error al cargar las Notificaciones");
        setNotificacionesEquipoJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setNotificacionError(error.response?.data?.msg || "Error al cargar las notificaciones");
        setNotificacionesEquipoJoin(null);
      }
    } finally {
      setNotificacionLoading(false);
    }
  }

  const listNotificacionEquipoId = async (id) => {
    try {
      const response = await getNotificaReservasEquipoId(id);
      console.log(response.data);
      setNotificacionEquipoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listNotificacionEquipoIdJoin = async (id) => {
    try {
      const response = await getNotificaReservasEquipoIdJoin(id);
      console.log(response.data);
      setNotificacionEquipoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createNotificacionEquipo = async (data) => {
    console.log(data);
    try {
      const response = await registerNotificaReservasEquipo(data);
      console.log(response);
      setNotificacionEquipo(response.data);
      await listNotificaciones();
      await listNotificacionesEquipo();
      await listNotificacionesEquipoJoin();
      Swal.fire({ title: 'Registro con exito', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.data.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return { success: false };
    }
  }

  const editNotificacionEquipo = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateNotificaReservasEquipo(id, data);
      console.log(response);
      setNotificacionEquipo(response.data);
      await listNotificaciones();
      await listNotificacionesEquipo();
      await listNotificacionesEquipoJoin();
      Swal.fire({ title: 'Actualizado', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.data.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return { success: false };
    }
  }

  const removeNotificacionEquipo = async (id) => {
    try {
      const response = await deleteNotificaReservasEquipo(id);
      await listNotificaciones();
      await listNotificacionesEquipo();
      await listNotificacionesEquipoJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <NotificacionContext.Provider value={{
      notificacion,
      notificacionId,
      notificacionAmbiente,
      notificacionesAmbiente,
      notificacionesAmbienteJoin,
      notificacionAmbienteId,
      notificacionesEquipo,
      notificacionEquipo,
      notificacionEquipoId,
      notificacionesEquipoJoin,
      notificacionError,
      notificacionLoading,
      listNotificacionesAmbiente,
      listNotificacionesAmbienteJoin,
      listNotificacionAmbienteId,
      listNotificacionAmbienteIdJoin,
      createNotificacionAmbiente,
      editNotificacionAmbiente,
      removeNotificacionAmbiente,
      listNotificaciones,
      listNotificacionesId,
      listNotificacionesEquipo,
      listNotificacionesEquipoJoin,
      listNotificacionEquipoId,
      listNotificacionEquipoIdJoin,
      createNotificacionEquipo,
      editNotificacionEquipo,
      removeNotificacionEquipo,
    }}>
      {children}
    </NotificacionContext.Provider>
  )
}
