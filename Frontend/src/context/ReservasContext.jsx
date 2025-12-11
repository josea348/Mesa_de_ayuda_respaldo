import { createContext, useContext, useState } from 'react'
import { getReservasAmbiente, getReservasAmbienteJoin, getReservasAmbienteId, getReservasAmbienteIdJoin, registerReservasAmbiente, updateReservasAmbiente, deleteReservasAmbiente, getReservasJoin, getReservasJoinId, getReservasEquipo, getReservasEquipoJoin, getReservasEquipoId, getReservasEquipoIdJoin, registerReservasEquipo, updateReservasEquipo, deleteReservasEquipo } from '../apis/reservas';
import Swal from 'sweetalert2';

const ReservasContext = createContext();

export const useReservas = () => {
  const context = useContext(ReservasContext);
  if (!context) {
    throw new Error("useReservas must be used within an ReservasProvider.");
  }
  return context;
}

export const ReservasProvider = ({ children }) => {
  const [reservas, setReservas] = useState(null);
  const [reservasId, setReservasId] = useState(null);
  const [reservaAmbiente, setReservaAmbiente] = useState(null);
  const [reservasAmbiente, setReservasAmbiente] = useState(null);
  const [reservasAmbienteJoin, setReservasAmbienteJoin] = useState(null);
  const [reservaAmbienteId, setReservaAmbienteId] = useState(null);
  const [reservaEquipo, setReservaEquipo] = useState(null);
  const [reservasEquipo, setReservasEquipo] = useState(null);
  const [reservasEquipoJoin, setReservasEquipoJoin] = useState(null);
  const [reservaEquipoId, setReservaEquipoId] = useState(null);
  const [reservasError, setReservasError] = useState(null);
  const [reservasLoading, setReservasLoading] = useState(true);
  
  const listReservasAmbiente = async () => {
    try {
      const response = await getReservasAmbiente();
      console.log(response);
      setReservasAmbiente(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listReservasAmbienteJoin = async () => {
    try {
      const response = await getReservasAmbienteJoin();
      console.log(response);
      setReservasAmbienteJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservasAmbienteJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservasAmbienteJoin(null);
      }
    } finally {
      setReservasLoading(false);
    }
  }

  const listReservaAmbienteId = async (id) => {
    try {
      const response = await getReservasAmbienteId(id);
      console.log(response.data);
      setReservaAmbienteId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listReservaAmbienteIdJoin = async (id) => {
    try {
      const response = await getReservasAmbienteIdJoin(id);
      console.log(response.data);
      setReservaAmbienteId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createReservaAmbiente = async (data) => {
    console.log(data);
    try {
      const response = await registerReservasAmbiente(data);
      console.log(response);
      setReservaAmbiente(response.data);
      await listReservas();
      await listReservasAmbiente();
      await listReservasAmbienteJoin();
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

  const editReservaAmbiente = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateReservasAmbiente(id, data);
      console.log(response);
      setReservaAmbiente(response.data);
      await listReservas();
      await listReservasAmbiente();
      await listReservasAmbienteJoin();
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

  const removeReservaAmbiente = async (id) => {
    try {
      const response = await deleteReservasAmbiente(id);
      await listReservas();
      await listReservasAmbiente();
      await listReservasAmbienteJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };



  const listReservas = async () => {
    try {
      const response = await getReservasJoin();
      console.log(response);
      setReservas(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservas(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservas(null);
      }
    } finally {
      setReservasLoading(false);
    }
  }

  const listReservasId = async (id) => {
    try {
      const response = await getReservasJoinId(id);
      console.log(response);
      setReservasId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservasId(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservasId(null);
      }
    } finally {
      setReservasLoading(false);
    }
  }



  const listReservasEquipo = async () => {
    try {
      const response = await getReservasEquipo();
      console.log(response);
      setReservasEquipo(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listReservasEquipoJoin = async () => {
    try {
      const response = await getReservasEquipoJoin();
      console.log(response);
      setReservasEquipoJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservasEquipoJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setReservasError(error.response?.data?.msg || "Error al cargar reservas");
        setReservasEquipoJoin(null);
      }
    } finally {
      setReservasLoading(false);
    }
  }

  const listReservaEquipoId = async (id) => {
    try {
      const response = await getReservasEquipoId(id);
      console.log(response.data);
      setReservaEquipoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listReservaEquipoIdJoin = async (id) => {
    try {
      const response = await getReservasEquipoIdJoin(id);
      console.log(response.data);
      setReservaEquipoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createReservaEquipo = async (data) => {
    console.log(data);
    try {
      const response = await registerReservasEquipo(data);
      console.log(response);
      setReservaEquipo(response.data);
      await listReservas();
      await listReservasEquipo();
      await listReservasEquipoJoin();
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

  const editReservaEquipo = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateReservasEquipo(id, data);
      console.log(response);
      setReservaEquipo(response.data);
      await listReservas();
      await listReservasEquipo();
      await listReservasEquipoJoin();
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

  const removeReservaEquipo = async (id) => {
    try {
      const response = await deleteReservasEquipo(id);
      await listReservas();
      await listReservasEquipo();
      await listReservasEquipoJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <ReservasContext.Provider value={{
      reservas,
      reservasId,
      reservaAmbiente,
      reservasAmbiente,
      reservasAmbienteJoin,
      reservaAmbienteId,
      reservasEquipo,
      reservaEquipo,
      reservaEquipoId,
      reservasEquipoJoin,
      reservasError,
      reservasLoading,
      listReservasAmbiente,
      listReservasAmbienteJoin,
      listReservaAmbienteId,
      listReservaAmbienteIdJoin,
      createReservaAmbiente,
      editReservaAmbiente,
      removeReservaAmbiente,
      listReservas,
      listReservasId,
      listReservasEquipo,
      listReservasEquipoJoin,
      listReservaEquipoId,
      listReservaEquipoIdJoin,
      createReservaEquipo,
      editReservaEquipo,
      removeReservaEquipo,
    }}>
      {children}
    </ReservasContext.Provider>
  )
}
