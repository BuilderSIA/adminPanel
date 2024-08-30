/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import Locations from "./pages/Locations";
import Cities from "./pages/Cities";
import Cars from "./pages/Cars";
import { toast } from "react-toastify";



function App() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [psw, setPsw] = useState("");
  const [token,setToken] = useState("");

  const handleUser = (number,password) =>{
    setUser({number:number,password:password});
    localStorage.setItem("user",JSON.stringify(user))
  }

  function loginFunc(){
    if(number>'' && psw>''){
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        phone_number:number,
        password: psw,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((data)=>data.json())
    .then((res)=>{
      if(res.success){
        toast.success(res?.message)
        navigate("/");
        sessionStorage.setItem("token",res?.data?.tokens?.accessToken?.token)
        setToken(res?.data?.tokens?.accessToken?.token)
      }else if(sessionStorage.getItem("token")){
        navigate('/')
      }else{
        navigate('/login');
        toast.error(res?.message)
      }
    })
    .catch((error)=>console.log("Hatolik",error))
  }
  }


  useEffect(()=>{
      loginFunc()
  },[user])

  return (
    <>
    {localStorage.getItem("token")?<Sidebar/>:null}
      <div className="main-content">
      <Routes>
        <Route path={"/login"} element={localStorage.getItem("token")?<Settings/>:<Login number={number} psw={psw} loginFunc={loginFunc} handleUser={handleUser} setNumber={setNumber} setPsw={setPsw} />} />
        <Route path={"/"} element={<ProtectedRoute />} />
        <Route path={"/settings"} element={<Settings/>} />
        <Route path={"/brands"} element={<Brands/>} />
        <Route path={"/models"} element={<Models/>} />
        <Route path={"/locations"} element={<Locations/>} />
        <Route path={"/cities"} element={<Cities/>} />
        <Route path={"/cars"} element={<Cars/>} />
      </Routes>
      </div>
    </>
  );
}

export default App;


