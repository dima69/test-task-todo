import { Button } from '@mui/material';
import App from '../App';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'end',
          gap: 5,
        }}
      >
        <div>logged as {authData.username}</div>
        <Button variant="outlined" onClick={handleLogout}>
          logout
        </Button>
      </div>
      <App />
    </>
  );
}
