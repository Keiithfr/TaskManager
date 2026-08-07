import './styles/variables.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './protectedroute/ProtectedRoute';


function App() {

  return (
    <>

      <Navbar />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />

        </Route>




      </Routes>





    </>
  )
}

export default App
