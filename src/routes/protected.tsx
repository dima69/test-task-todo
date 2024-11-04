import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function RequireAuth({
  children,
  redirectTo,
}: { children: JSX.Element; redirectTo: string }) {
  const authData = useAppSelector((state) => state.auth);

  if (authData.username !== 'admin' && authData.password !== 'admin') {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
