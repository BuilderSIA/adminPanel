import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Locations = () => {
  const [location,setLocation] = useState([]);
  const [cityName,setCityName] = useState('');
  const [cityPic,setCityPic] = useState(null);
  const [cityText,setCityText] = useState('');
  
  
  let imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  const token = localStorage.getItem("token");



  const formData = new FormData();
  formData.append("name",cityName)
  formData.append("text",cityText)
  if(cityPic){
    formData.append("images",cityPic)
  }


  function getFunction(){
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
    .then((res)=>res.json())
    .then((data)=>setLocation(data?.data))
  }

  function addLocation(e){
    e?.preventDefault()
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`,{
      method:"Post",
      headers:{
        "Authorization":`Bearer ${token}`
      },
      body:formData
    }).then((res)=>res.json())
    .then((data)=>{
      if(data?.success == true){
        toast.success(data?.message);
        setCityName('')
        setCityPic(null)
        setCityText('')
        getFunction()
      }else{
        toast.error(data?.message)
      }
    })
  }


  
  
  

  const [delID,setDelID] = useState();

  function deleteLocation(e){
    e?.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${delID}`,{
      method:"Delete",
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }).then((res)=>res.json())
    .then((data)=>{
      if(data?.success == true){
        toast.success(data?.message)
        getFunction()
      }else{
        toast.error(data?.message)
      }
    })
  }


  const [editID,setEditID] = useState();

  function editLocation(e){
    e?.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${editID}`,{
      method:"Delete",
      headers:{
        "Authorization":`Bearer ${token}`
      },
      body:formData
    }).then((res)=>res.json())
    .then((data)=>{
      if(data?.success == true){
        toast.success(data?.message)
        getFunction()
      }else{
        toast.error(data?.message)
      }
    })
  }

  

  useEffect(()=>{
    getFunction()
  },[])

  return (
    <div className="cities-cont">
      <table className="table w-100">
  <thead>
    <tr className="table-secondary">
      <th scope="col">#</th>
      <th scope="col">Location</th>
      <th scope="col">City name</th>
      <th scope="col">Image</th>
      <th scope="col">Actions</th>
      <th scope="col">
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add location
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add city</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <label htmlFor="Model">
                          Location
                        </label>
                        <br />
                        <input className="form-control" type="text" id=""  value={cityName} onChange={(e)=>setCityName(e.target.value)}/>
                        <label htmlFor="Model">
                          City Name
                        </label>
                        <br />
                        <textarea className="form-control" type="text" id=""  value={cityText} onChange={(e)=>setCityText(e.target.value)}/>
                        <div className="mb-3">
                          <label htmlFor="formFile" className="form-label">Set image</label>
                          <input className="form-control" type="file" id="formFile" onChange={(e)=>setCityPic(e?.target?.files[0])}/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={addLocation} >Save</button>
                      </div>
                    </div>
                  </div>
                </div>
      </th>
    </tr>
  </thead>
  <tbody className="cities-list">
  {location.map((item,index)=>{
      return(
          <tr key={item.id} className="cities-list-item">
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.text}</td>
            <td><img src={`${imgUrl}${item.image_src}`} alt="" /></td>
            <td colSpan={2}>
              <div>
                
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleEditModal" onClick={()=>{
                  setCityName(item.name);
                  setEditID(item.id);
                }}>
                <i className='bx bxs-edit-alt' style={{color:"#ffffff"}}></i>
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleEditModal" tabIndex="-1" aria-labelledby="exampleEditModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleEditModalLabel">Edit brand</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <label htmlFor="Model">
                          Change Location name
                        </label>
                        <br />
                        <input className="form-control" type="text" id=""  value={cityName} onChange={(e)=>setCityName(e.target.value)}/>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={editLocation}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleDeleteModal" onClick={()=>setDelID(item?.id)}>
                <i className='bx bxs-trash' style={{color:"#ffffff"}} ></i>
                </button>

                 {/* <!-- Modal --> */}

                 <div className="modal fade" id="exampleDeleteModal" tabIndex="-1" aria-labelledby="exampleDeleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleDeleteModalLabel">Do you want to delete this?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                          Cancel
                        </button>
                        <button className="btn btn-danger" onClick={deleteLocation}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
      )
      })}
  </tbody>
</table>
      
    </div>
  )
}

export default Locations
