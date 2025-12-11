import { createContext, useContext, useState } from 'react'
import { deleteArea, getAreaId, getAreas, registerArea, updateArea } from '../apis/areas';
import Swal from 'sweetalert2';

const AreasContext = createContext();

export const useAreas = () => {
  const context = useContext(AreasContext);
  if (!context) {
    throw new Error("useAreas must be used within an AreasProvider.");
  }
  return context;
}

export const AreasProvider = ({ children }) => {
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState(null);
  const [areaId, setAreaId] = useState(null);

  const listAreas = async () => {
    try {
      const response = await getAreas();
      console.log(response);
      setAreas(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listAreaId = async (id) => {
    try {
      const response = await getAreaId(id);
      console.log(response.data);
      setAreaId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createArea = async (data) => {
    console.log(data);
    try {
      const response = await registerArea(data);
      console.log(response);
      setArea(response.data);
      await listAreas();
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

  const editArea = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateArea(id, data);
      console.log(response);
      setArea(response.data);
      await listAreas();
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

  const removeArea = async (id) => {
    try {
      const response = await deleteArea(id);
      listAreas(); // Actualizar lista después de eliminar
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <AreasContext.Provider value={{
      area,
      areas,
      areaId,
      listAreas,
      listAreaId,
      createArea,
      editArea,
      removeArea,
    }}>
      {children}
    </AreasContext.Provider>
  )
}
