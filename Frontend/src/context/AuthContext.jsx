import { createContext, useContext, useEffect, useState } from 'react'
import { authUsers, getUserId, getUsers, registerUser, updateUser, updateDataUser, updatePasswordUser, deleteUser } from '../apis/users';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider.");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState(false);
  const [isLogoutManual, setIsLogoutManual] = useState(false);

  const signin = async (data) => {
    console.log(data);
    try {
      const response = await authUsers(data);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.user[0].identificacion);
      setUser(response.data.user[0]);
      setIsAuthenticated(true);
      Swal.fire({ title: 'Inicio con exito', text: response.data.message, icon: 'success' });
    } catch (error) {
      console.log('Error: '+error);
      console.log('Error: '+error.message);
      console.log(error);
      if (error.response.status === 404) {
        Swal.fire({title: 'Error!', text: error.response.data.msg, icon: 'error'});
      } else if (error.response.status === 500) {
        Swal.fire({title: 'Error!', text: error.response.data.msg, icon: 'error'})
      }
    }
  }

  const listUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  const listUserId = async (id) => {
    try {
      const response = await getUserId(id);
      console.log(response.data);
      setUserId(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  const createUser = async (data) => {
    console.log(data);
    try {
      const response = await registerUser(data);
      console.log(response);
      setUser(response.data);
      await listUsers();
      Swal.fire({ title: 'Registro con exito', text: response.data.msg, icon: 'success' });
      return {success: true};
    } catch (error) {
      console.log('Error: '+error.message);
      console.log(error);
      if (error.response.data.status===400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status===404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status===500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return {success: false};
    }
  }

  const editUser = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateUser(id, data);
      console.log(response);
      setUser(response.data);
      await listUsers();
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

  const editDataUser = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateDataUser(id, data);
      console.log(response);
      setUser(response.data);
      await listUsers();
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

  const editPasswordUser = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updatePasswordUser(id, data);
      console.log(response);
      setUser(response.data);
      await listUsers();
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

  const removeUser = async (id) => {
    try {
      const response = await deleteUser(id);
      listUsers(); // Actualizar lista después de eliminar
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  const logout = () => {
    Swal.fire({
      text: "¿Estás seguro de cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLogoutManual(true);

        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        Swal.fire({ title: 'Cierre de sesión con exito', text: 'Has cerrado sesión correctamente.', icon: 'success',  timer: 3000 });
      }
    })
  }

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      if (token && id) {
        setIsAuthenticated(true);
        setUser({ identificacion: id, token: token });
      } else {
        setIsAuthenticated(false);
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("id");
      }
      setLoading(false);

      setIsLogoutManual(false);
      setLoading(false);
    }

    checkLogin();
  }, []);
  
  return (
    <AuthContext.Provider value={{
      user,
      users,
      userId,
      isAuthenticated,
      loading,
      active,
      setActive,
      signin,
      listUsers,
      listUserId,
      createUser,
      editUser,
      editDataUser,
      editPasswordUser,
      removeUser,
      logout,
      isLogoutManual
    }}>
      {children}
    </AuthContext.Provider>
  )
}
