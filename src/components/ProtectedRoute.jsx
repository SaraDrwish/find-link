import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function ProtectedRoute({ children }) {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/login" />;
}