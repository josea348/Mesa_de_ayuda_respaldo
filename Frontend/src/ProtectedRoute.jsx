import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Swal from 'sweetalert2';

export default function ProtectedRoute() {
  const { loading, isAuthenticated, isLogoutManual } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) {
    if (!isLogoutManual) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión para acceder a esta página.',
        showConfirmButton: false,
        timer: 3000
      });
    }

    return <Navigate to="/" replace />
  }

  return <Outlet />
}
