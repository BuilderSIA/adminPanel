/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
const navigate = useNavigate()




if(sessionStorage.getItem("token")){
  return navigate("/settings")
}else{
  return navigate("/login")
}}

export default ProtectedRoute
