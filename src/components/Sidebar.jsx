import { useState } from 'react';
import '../style/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [side,setSide] = useState(true);

    const navigate = useNavigate()

  return (
    <div className='sidebar-cont'>
      <div className={side?"sidebar close":"sidebar"}>
    <div className="logo-details">
        <img src="/logo.svg" alt="" />
      <span className="logo_name">AutoZoomAdmin</span>
    </div>
        <section className="home-section">
        <div className="home-content">
        <i className={side?'bx bx-chevron-right':'bx bx-chevron-left'} onClick={()=>setSide(!side)} ></i>
        </div>
    </section>
    <ul className="nav-links">
      
      <Link to={"/settings"} className='nav-links-item'>
      <img src="/settings.png" alt="" />
        <span>
            Settings
        </span>
      </Link>
      <Link to={"/brands"} className='nav-links-item'>
      <img src="/brands.png" alt="" />
        <span>
            Brands
        </span>
      </Link>
      <Link to={"/models"} className='nav-links-item'>
      <img src="/models.png" alt="" />
        <span>
            Models
        </span>
      </Link>
      <Link to={"/locations"} className='nav-links-item'>
      <img src="/locations.png" alt="" />
        <span>
            Locations
        </span>
      </Link>
      <Link to={"/cities"} className='nav-links-item'>
      <img src="/cities.png" alt="" />
        <span>
            Cities
        </span>
      </Link>
      <Link to={"/cars"} className='nav-links-item'>
      <img src="/cars.png" alt="" />
        <span>
            Cars
        </span>
      </Link>
    </ul>
    <button className='logoutBtn' onClick={()=>{
        sessionStorage.removeItem("token");
        navigate("/login");
    }}>
        {side? <img src="/off.png" alt="" />:"Log out" }
    </button>
  </div>
  
  
    </div>
  )
}

export default Sidebar
