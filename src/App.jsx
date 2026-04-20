import { Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ErrorPage from './pages/ErrorPage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        
        <Route path="*" element={<ErrorPage />} /> // Cualquier ruta que no esté registrada en las Route llevaraá a la página de error
      </Routes>
    </>
  );
}

export default App
