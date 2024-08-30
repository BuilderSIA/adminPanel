/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Settings from '../pages/Settings';

const ProtectedRoute = () => {
const navigate = useNavigate()




if(localStorage.getItem("token")=="undefined" || localStorage.getItem("token")){
  return <Settings/>
}else{
  return navigate("/login")
}}

export default ProtectedRoute
