import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store.ts';
import Login from './components/Login.tsx';
import Root from './routes/root.tsx';
import RequireAuth from './routes/protected.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth redirectTo="/login">
                <Root />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>,
);
