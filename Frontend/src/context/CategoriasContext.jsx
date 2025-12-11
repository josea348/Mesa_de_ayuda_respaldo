import { createContext, useContext, useState } from 'react'
import { deleteCategoria, getCategoriaId, getCategorias, registerCategoria, updateCategoria } from '../apis/Categorias';
import Swal from 'sweetalert2';

const CategoriasContext = createContext();

export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error("useCategorias must be used within an CategoriasProvider.");
  }
  return context;
}

export const CategoriasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState(null);
  const [categoriaId, setCategoriaId] = useState(null);

  const listCategorias = async () => {
    try {
      const response = await getCategorias();
      console.log(response);
      setCategorias(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listCategoriaId = async (id) => {
    try {
      const response = await getCategoriaId(id);
      console.log(response.data);
      setCategoriaId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createCategoria = async (data) => {
    console.log(data);
    try {
      const response = await registerCategoria(data);
      console.log(response);
      setCategoria(response.data);
      await listCategorias();
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

  const editCategoria = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateCategoria(id, data);
      console.log(response);
      setCategoria(response.data);
      await listCategorias();
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

  const removeCategoria = async (id) => {
    try {
      const response = await deleteCategoria(id);
      listCategorias(); // Actualizar lista después de eliminar
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <CategoriasContext.Provider value={{
      categoria,
      categorias,
      categoriaId,
      listCategorias,
      listCategoriaId,
      createCategoria,
      editCategoria,
      removeCategoria,
    }}>
      {children}
    </CategoriasContext.Provider>
  )
}
