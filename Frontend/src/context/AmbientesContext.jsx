import { createContext, useContext, useState } from 'react'
import { deleteAmbiente, getAmbienteId, getAmbienteIdJoin, getAmbientes, getAmbientesJoin, registerAmbiente, updateAmbiente } from '../apis/ambientes';
import Swal from 'sweetalert2';

const AmbienteContext = createContext();

export const useAmbientes = () => {
  const context = useContext(AmbienteContext);
  if (!context) {
    throw new Error("useAmbientes must be used within an AmbientesProvider.");
  }
  return context;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

export const AmbientesProvider = ({ children }) => {
  const [ambiente, setAmbiente] = useState(null);
  const [ambientes, setAmbientes] = useState(null);
  const [ambientesJoin, setAmbientesJoin] = useState(null);
  const [ambienteId, setAmbienteId] = useState(null);
  const [ambienteIdJoin, setAmbienteIdJoin] = useState(null);

  const listAmbientes = async () => {
    try {
      const response = await getAmbientes();
      console.log(response);
      setAmbientes(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listAmbientesJoin = async () => {
    try {
      const response = await getAmbientesJoin();
      console.log(response);
      setAmbientesJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listAmbienteId = async (id) => {
    try {
      const response = await getAmbienteId(id);
      console.log(response.data);
      setAmbienteId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listAmbienteIdJoin = async (id) => {
    try {
      const response = await getAmbienteIdJoin(id);
      console.log(response.data);
      setAmbienteIdJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createAmbiente = async (data) => {
    console.log(data);
    try {
      const response = await registerAmbiente(data);
      console.log(response);
      setAmbiente(response.data);
      await listAmbientes();
      await listAmbientesJoin();
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

  const editAmbiente = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateAmbiente(id, data);
      console.log(response);
      setAmbiente(response.data);
      await listAmbientes();
      await listAmbientesJoin();
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

  const removeAmbiente = async (id) => {
    try {
      const response = await deleteAmbiente(id);
      listAmbientes();
      listAmbientesJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <AmbienteContext.Provider value={{
      ambiente,
      ambientes,
      ambientesJoin,
      ambienteId,
      ambienteIdJoin,
      listAmbientes,
      listAmbientesJoin,
      listAmbienteId,
      listAmbienteIdJoin,
      createAmbiente,
      editAmbiente,
      removeAmbiente,
    }}>
      {children}
    </AmbienteContext.Provider>
  )
}
