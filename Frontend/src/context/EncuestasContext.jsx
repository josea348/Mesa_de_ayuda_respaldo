import { createContext, useContext, useState } from 'react'
import { deleteEncuesta, getEncuestaId, getEncuestaIdJoin, getEncuestas, getEncuestasJoin, registerEncuesta, updateEncuesta } from '../apis/encuestas';
import Swal from 'sweetalert2';

const EncuestasContext = createContext();

export const useEncuestas = () => {
  const context = useContext(EncuestasContext);
  if (!context) {
    throw new Error("useEncuestas must be used within an EncuestasProvider.");
  }
  return context;
}

export const EncuestasProvider = ({ children }) => {
  const [encuesta, setEncuesta] = useState(null);
  const [encuestas, setEncuestas] = useState(null);
  const [encuestasJoin, setEncuestasJoin] = useState(null);
  const [encuestaId, setEncuestaId] = useState(null);
  const [encuestasError, setEncuestasError] = useState(null);
  const [encuestasLoading, setEncuestasLoading] = useState(true);
  
  const listEncuestas = async () => {
    try {
      const response = await getEncuestas();
      console.log(response);
      setEncuestas(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listEncuestasJoin = async () => {
    try {
      const response = await getEncuestasJoin();
      console.log(response);
      setEncuestasJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setEncuestasError(error.response?.data?.msg || "Error al cargar las encuestas de satisfacción.");
        setEncuestasJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setEncuestasError(error.response?.data?.msg || "Error al cargar las encuestas de satisfacción.");
        setEncuestasJoin(null);
      }
    } finally {
      setEncuestasLoading(false);
    }
  }

  const listEncuestaId = async (id) => {
    try {
      const response = await getEncuestaId(id);
      console.log(response.data);
      setEncuestaId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listEncuestaIdJoin = async (id) => {
    try {
      const response = await getEncuestaIdJoin(id);
      console.log(response.data);
      setEncuestaId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createEncuesta = async (data) => {
    console.log(data);
    try {
      const response = await registerEncuesta(data);
      console.log(response);
      setEncuesta(response.data);
      await listEncuestas();
      await listEncuestasJoin();
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

  const editEncuesta = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateEncuesta(id, data);
      console.log(response);
      setEncuesta(response.data);
      await listEncuestas();
      await listEncuestasJoin();
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

  const removeEncuesta = async (id) => {
    try {
      const response = await deleteEncuesta(id);
      await listEncuestas();
      await listEncuestasJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <EncuestasContext.Provider value={{
      encuesta,
      encuestas,
      encuestasJoin,
      encuestaId,
      encuestasError,
      encuestasLoading,
      listEncuestas,
      listEncuestasJoin,
      listEncuestaId,
      listEncuestaIdJoin,
      createEncuesta,
      editEncuesta,
      removeEncuesta,
    }}>
      {children}
    </EncuestasContext.Provider>
  )
}
