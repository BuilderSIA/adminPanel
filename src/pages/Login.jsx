/* eslint-disable react/prop-types */


const Login = ({number,psw,setPsw,setNumber}) => {


  return (
    <form className="container w-50 mt-5 mx-5">
      <h2>
        AutoZoom Admin
      </h2>
      <div className="row mb-3">
        <div className="col-sm-10">
          <input type="text" className="form-control" id="" placeholder="Number" value={number}  onChange={(e)=>setNumber(e.target.value)}/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10">
          <input type="text" className="form-control" id="" placeholder="Password" value={psw} onChange={(e)=>setPsw(e.target.value)}/>
        </div>
      </div>
    </form>


    // <div className="login">
    //     <div className="container">
    //     <div className="center">
    //       <h2 className="form-title" id="login" >
    //         AutoZoom Admin
    //       </h2>
    //       <div className="form-holder">
    //         <input type="text" className="input" placeholder="Number" onChange={(e)=>setNumber(e.target.value)} />
    //         <input type="password" className="input" placeholder="Password" onChange={(e)=>setPsw(e.target.value)} />
    //       </div>
    //       <button className="submit-btn" onClick={()=>handleUser(number,psw)} >Log in</button>
    //     </div>
    // </div>
    // </div>
  )
}

export default Login
