import { useContext } from 'react';
import "./styles.scss"  
import Register from './Register'
import Login from './Login';
import Home from "./Home"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to = "/login" />
    }

    return children;
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}
   
export default App;
