/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';

const ProtectedRoute = () => {
const navigate = useNavigate()




if(localStorage.getItem("token")=="undefined"){
  return (
    <>
    <Home/>
    </>
  )
}else{
  return navigate("/login")
}

}

export default ProtectedRoute
