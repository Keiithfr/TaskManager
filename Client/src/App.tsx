import './styles/variables.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './protectedroute/ProtectedRoute';
import GuestRoute from './protectedroute/GuestRoute';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/RestPassword/ResetPassword';


function App() {

  return (
    <>

      <Navbar />


      <Routes>
        <Route element={<GuestRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />

        </Route>



        <Route path="/reset-password/:token" element={<ResetPassword />} />




      </Routes>





    </>
  )
}

export default App
