/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";



const Models = () => {
  const [models,setModels] = useState([]);
  const [brands,setBrands] = useState([]);
  const [modelName,setModelName] = useState('')
  const [modelBrandID,setModelBrandID] = useState('');
  // let imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"


  const token = localStorage.getItem("token");

  
  function getBrand(){
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((res)=>res.json())
    .then((data)=>{
      setBrands(data?.data)
    })
  }
  function getFunction(){
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
    .then((res)=>res.json())
    .then((data)=>{
      getBrand();
      setModels(data?.data);
    })
  }



  const formdata = new FormData();
  formdata.append("name",modelName)
  formdata.append("brand_id",modelBrandID)

  
  function createModel(e){
    e?.preventDefault()
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models",{
      method:"Post",
      body: formdata,
      headers:{
        "Authorization":`Bearer ${token}`
        // "content-type":"multipart/form-data"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data?.success===true){
        toast.success(data?.message);
        setModelName('')
        setModelBrandID('')
        getFunction()
      }else{
        toast.error(data?.message);
      }
    })
  }


  const deleteModel = (id) =>{
    
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,{
      method:"Delete",
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }).then((res)=>res.json())
    .then((data)=>{
      if(data?.success===true){
        toast.success(data?.message);
        getFunction()
      }else{
        toast.error(data?.message);
      }
    })
  }

  const [editID,setEditID] = useState();

  function editModel(e){
    e?.preventDefault()
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${editID}`,{
      method:"Put",
      body: formdata,
      headers:{
        "Authorization":`Bearer ${token}`
        // "content-type":"multipart/form-data"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data?.success===true){
        toast.success(data?.message);
        setModelName('')
        setModelBrandID('')
        getFunction()
      }else{
        toast.error(data?.message);
      }
    })
  }





  useEffect(()=>{
    getFunction()
    
      
  },[])

  

  return (
    <div className="models-cont">
      <table className="table w-100">
  <thead>
    <tr className="table-secondary">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
      <th scope="col">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add category
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                        <label htmlFor="Model">
                          Model name
                        </label>
                        <br />
                        <input className="form-control" type="text" id="" value={modelName} onChange={(e)=>setModelName(e?.target?.value)} />
                        <label htmlFor="Model">
                          Brand name
                        </label>
                        <br />
                        <select className="form-select" aria-label="Default select example" onChange={(e)=>setModelBrandID(e?.target?.value)}>
                          {brands.map((item,index)=>(
                            <option key={index} value={item.id}>{item.title}</option>
                          ))}
                        </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={createModel} >Add</button>
            </div>
          </div>
        </div>
      </div>
      </th>
    </tr>
  </thead>
  <tbody className="models-list">
      {models.map((item,index)=>{
        return(
          <tr key={item.id} className="models-list-item">
            <th scope="row">{index+1}</th>
            <td>{item.brand_title}</td>
            <td>{item.name}</td>
            <td><img src={``} alt="" /></td>
            <td colSpan={2}>
              <div>
                
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleEditModal" onClick={()=>{
                  setModelName(item.name);
                  setEditID(item.id)
                }}>
                <i className='bx bxs-edit-alt' style={{color:"#ffffff"}}></i>
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleEditModal" tabIndex="-1" aria-labelledby="exampleEditModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleEditModalLabel">Edit model</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <label htmlFor="Model">
                          Change model name
                        </label>
                        <br />
                        <input className="form-control" type="text" id="" value={modelName} onChange={(e)=>setModelName(e.target.value)} />
                        <label htmlFor="Model">
                          Change brand name
                        </label>
                        <br />
                        <select className="form-select" aria-label="Default select example" onChange={(e)=>setModelBrandID(e?.target?.value)} >
                          
                          {brands.map((item,index)=>(
                            <option key={index} value={item.id}>{item.title}</option>
                          ))}
                          
                          
                        </select>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={editModel}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleDeleteModal">
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
                        <button className="btn btn-danger" onClick={()=>deleteModel(item?.id)}>
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
      })
      

      }
      </tbody>
      </table>
    </div>
 )
}

export default Models
