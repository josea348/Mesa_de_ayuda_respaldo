import { createContext, useContext, useState } from 'react'
import { deleteComentario, getComentarioId, getComentarioIdJoin, getComentarios, getComentariosJoin, registerComentario, updateComentario, getComentarioIdByTickets } from '../apis/comentarios';
import Swal from 'sweetalert2';

const ComentariosContext = createContext();

export const useComentarios = () => {
  const context = useContext(ComentariosContext);
  if (!context) {
    throw new Error("useComentarios must be used within an ComentariosProvider.");
  }
  return context;
}

export const ComentariosProvider = ({ children }) => {
  const [comentario, setComentario] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [comentariosJoin, setComentariosJoin] = useState(null);
  const [comentarioId, setComentarioId] = useState(null);
  const [comentarioIdByTickets, setComentarioIdByTickets] = useState(null);
  const [comentariosError, setComentariosError] = useState(null);
  const [comentariosLoading, setComentariosLoading] = useState(true);
  
  const listComentarios = async () => {
    try {
      const response = await getComentarios();
      console.log(response);
      setComentarios(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listComentariosJoin = async () => {
    try {
      const response = await getComentariosJoin();
      console.log(response);
      setComentariosJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setComentariosError(error.response?.data?.msg || "Error al cargar comentarios");
        setComentariosJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setComentariosError(error.response?.data?.msg || "Error al cargar comentarios");
        setComentariosJoin(null);
      }
    } finally {
      setComentariosLoading(false);
    }
  }

  const listComentarioId = async (id) => {
    try {
      const response = await getComentarioId(id);
      console.log(response.data);
      setComentarioId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listComentarioIdJoin = async (id) => {
    try {
      const response = await getComentarioIdJoin(id);
      console.log(response.data);
      setComentarioId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createComentario = async (data) => {
    console.log(data);
    try {
      const response = await registerComentario(data);
      console.log(response);
      setComentario(response.data);
      await listComentarios();
      await listComentariosJoin();
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

  const editComentario = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateComentario(id, data);
      console.log(response);
      setComentario(response.data);
      await listComentarios();
      await listComentariosJoin();
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

  const removeComentario = async (id) => {
    try {
      const response = await deleteComentario(id);
      await listComentarios();
      await listComentariosJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  const listComentarioByTickets = async (id) => {
    try {
      const response = await getComentarioIdByTickets(id);
      console.log(response.data);
      setComentarioIdByTickets(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setComentariosError(error.response?.data?.msg || "Error al cargar comentarios");
        setComentariosJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        setComentariosError(error.response?.data?.msg || "Error al cargar comentarios");
        setComentariosJoin(null);
      }
    }
  }

  return (
    <ComentariosContext.Provider value={{
      comentario,
      comentarios,
      comentariosJoin,
      comentarioId,
      comentarioIdByTickets,
      comentariosError,
      comentariosLoading,
      listComentarios,
      listComentariosJoin,
      listComentarioId,
      listComentarioIdJoin,
      createComentario,
      editComentario,
      removeComentario,
      listComentarioByTickets,
    }}>
      {children}
    </ComentariosContext.Provider>
  )
}
