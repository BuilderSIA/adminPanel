/* eslint-disable react/prop-types */


const Login = ({number,psw,handleUser,setPsw,setNumber}) => {


  return (
    <div className="login">
        <div className="form-structor">
        <div className="center">
          <h2 className="form-title" id="login" >
            AutoZoom Admin
          </h2>
          <div className="form-holder">
            <input type="text" className="input" placeholder="Number" onChange={(e)=>setNumber(e.target.value)} />
            <input type="password" className="input" placeholder="Password" onChange={(e)=>setPsw(e.target.value)} />
          </div>
          <button className="submit-btn" onClick={()=>handleUser(number,psw)} >Log in</button>
        </div>
    </div>
    </div>
  )
}

export default Login
