import { Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Chat from './pages/Chat';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      
        <Route path="*" element={<ErrorPage />} /> // Cualquier ruta que no esté registrada en las Route llevará a la página de error
      </Routes>
    </>
  );
}

export default App