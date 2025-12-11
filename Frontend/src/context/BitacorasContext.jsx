import { createContext, useContext, useState } from 'react'
import { deleteBitacora, getBitacoraId, getBitacoraIdJoin, getBitacoras, getBitacorasJoin, registerBitacora, updateBitacora } from '../apis/bitacoras';
import Swal from 'sweetalert2';

const BitacorasContext = createContext();

export const useBitacoras = () => {
  const context = useContext(BitacorasContext);
  if (!context) {
    throw new Error("useBitacoras must be used within an BitacorasProvider.");
  }
  return context;
}

export const BitacorasProvider = ({ children }) => {
  const [bitacora, setBitacora] = useState(null);
  const [bitacoras, setBitacoras] = useState(null);
  const [bitacorasJoin, setBitacorasJoin] = useState(null);
  const [bitacoraId, setBitacoraId] = useState(null);
  const [bitacorasError, setBitacorasError] = useState(null);
  const [bitacorasLoading, setBitacorasLoading] = useState(true);
  
  const listBitacoras = async () => {
    try {
      const response = await getBitacoras();
      console.log(response);
      setBitacoras(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listBitacorasJoin = async () => {
    try {
      const response = await getBitacorasJoin();
      console.log(response);
      setBitacorasJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setBitacorasError(error.response?.data?.msg || "Error al cargar bitacoras");
        setBitacorasJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setBitacorasError(error.response?.data?.msg || "Error al cargar bitacoras");
        setBitacorasJoin(null);
      }
    } finally {
      setBitacorasLoading(false);
    }
  }

  const listBitacoraId = async (id) => {
    try {
      const response = await getBitacoraId(id);
      console.log(response.data);
      setBitacoraId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listBitacoraIdJoin = async (id) => {
    try {
      const response = await getBitacoraIdJoin(id);
      console.log(response.data);
      setBitacoraId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createBitacora = async (data) => {
    console.log(data);
    try {
      const response = await registerBitacora(data);
      console.log(response);
      setBitacora(response.data);
      await listBitacoras();
      await listBitacorasJoin();
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

  const editBitacora = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateBitacora(id, data);
      console.log(response);
      setBitacora(response.data);
      await listBitacoras();
      await listBitacorasJoin();
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

  const removeBitacora = async (id) => {
    try {
      const response = await deleteBitacora(id);
      await listBitacoras();
      await listBitacorasJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <BitacorasContext.Provider value={{
      bitacora,
      bitacoras,
      bitacorasJoin,
      bitacoraId,
      bitacorasError,
      bitacorasLoading,
      listBitacoras,
      listBitacorasJoin,
      listBitacoraId,
      listBitacoraIdJoin,
      createBitacora,
      editBitacora,
      removeBitacora,
    }}>
      {children}
    </BitacorasContext.Provider>
  )
}
