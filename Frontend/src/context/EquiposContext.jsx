import { createContext, useContext, useState } from 'react'
import { deleteEquipo, getEquipoId, getEquipoIdJoin, getEquipos, getEquiposJoin, registerEquipo, updateEquipo } from '../apis/equipos';
import Swal from 'sweetalert2';

const EquiposContext = createContext();

export const useEquipos = () => {
  const context = useContext(EquiposContext);
  if (!context) {
    throw new Error("useEquipos must be used within an EquiposProvider.");
  }
  return context;
}

export const EquiposProvider = ({ children }) => {
  const [equipo, setEquipo] = useState(null);
  const [equipos, setEquipos] = useState(null);
  const [equiposJoin, setEquiposJoin] = useState(null);
  const [equipoId, setEquipoId] = useState(null);
  const [equiposError, setEquiposError] = useState(null);
  const [equiposLoading, setEquiposLoading] = useState(true);
  
  const listEquipos = async () => {
    try {
      const response = await getEquipos();
      console.log(response);
      setEquipos(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listEquiposJoin = async () => {
    try {
      const response = await getEquiposJoin();
      console.log(response);
      setEquiposJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setEquiposError(error.response?.data?.msg || "Error al cargar equipos");
        setEquiposJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setEquiposError(error.response?.data?.msg || "Error al cargar equipos");
        setEquiposJoin(null);
      }
    } finally {
      setEquiposLoading(false);
    }
  }

  const listEquipoId = async (id) => {
    try {
      const response = await getEquipoId(id);
      console.log(response.data);
      setEquipoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listEquipoIdJoin = async (id) => {
    try {
      const response = await getEquipoIdJoin(id);
      console.log(response.data);
      setEquipoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createEquipo = async (data) => {
    console.log(data);
    try {
      const response = await registerEquipo(data);
      console.log(response);
      setEquipo(response.data);
      await listEquipos();
      await listEquiposJoin();
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

  const editEquipo = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateEquipo(id, data);
      console.log(response);
      setEquipo(response.data);
      await listEquipos();
      await listEquiposJoin();
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

  const removeEquipo = async (id) => {
    try {
      const response = await deleteEquipo(id);
      await listEquipos();
      await listEquiposJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <EquiposContext.Provider value={{
      equipo,
      equipos,
      equiposJoin,
      equipoId,
      equiposError,
      equiposLoading,
      listEquipos,
      listEquiposJoin,
      listEquipoId,
      listEquipoIdJoin,
      createEquipo,
      editEquipo,
      removeEquipo,
    }}>
      {children}
    </EquiposContext.Provider>
  )
}
