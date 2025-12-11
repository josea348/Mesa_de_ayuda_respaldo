import { createContext, useContext, useState } from 'react'
import { getFiles, getFilesJoin, registerFiles, getFileId, deleteFile, updateFiles } from '../apis/arcchivos';
import Swal from 'sweetalert2';

const ArchivoAdjuntoContext = createContext();

export const useArchivoAdjunto = () => {
  const context = useContext(ArchivoAdjuntoContext);
  if (!context) {
    throw new Error("useArchivoAdjunto must be used within an ArchivosAdjuntosProvider.");
  }
  return context;
}

export const ArchivosAdjuntosProvider = ({children}) => {
  const [archivo, setArchivo] = useState(null);
  const [archivos, setArchivos] = useState(null);
  const [archivosJoin, setArchivosJoin] = useState(null);
  const [archivoId, setArchivoId] = useState(null);
  const [archivosError, setArchivosError] = useState(null);
  const [archivosLoading, setArchivosLoading] = useState(true);

  const listArchivos = async () => {
    try {
      const response = await getFiles();
      console.log(response);
      setArchivos(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listArchivosJoin = async () => {
      try {
        const response = await getFilesJoin();
        console.log(response);
        setArchivosJoin(response.data);
      } catch (error) {
        console.log(error);
        if (error.response.data.status === 404) {
          Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
          setArchivosError(error.response?.data?.msg || "Error al cargar comentarios");
          setArchivosJoin(null);
        } else if (error.response.data.status === 500) {
          Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
          setArchivosError(error.response?.data?.msg || "Error al cargar comentarios");
          setArchivosJoin(null);
        }
      } finally {
        setArchivosLoading(false);
      }
    }

  const listArchivoId = async (id) => {
    try {
      const response = await getFileId(id);
      console.log(response.data);
      setArchivoId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createArchivo = async (data) => {
    console.log(data);
    try {
      const response = await registerFiles(data);
      console.log(response);
      setArchivo(response.data);
      await listArchivos();
      await listArchivosJoin();
      Swal.fire({ title: 'Registro con exito', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.status === 400) {
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

  const editArchivo = async (id, data) => {
      console.log(id);
      console.log(data);
      try {
        const response = await updateFiles(id, data);
        console.log(response);
        setArchivo(response.data);
        await listArchivos();
        await listArchivosJoin();
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

  const removeArchivos = async (id) => {
      try {
        const response = await deleteFile(id);
        await listArchivos();
        await listArchivosJoin();
        Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
      } catch (error) {
        console.log([error.response.data.message]);
        Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
      }
    };

  return (
    <ArchivoAdjuntoContext.Provider value={{
      archivo,
      archivos,
      archivosJoin,
      archivoId,
      archivosError,
      archivosLoading,
      listArchivos,
      listArchivosJoin,
      listArchivoId,
      createArchivo,
      editArchivo,
      removeArchivos
    }}>
      {children}
    </ArchivoAdjuntoContext.Provider>
  )
}
