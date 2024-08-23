
import { useEffect, useState } from "react"


const Brands = () => {
  const [brands,setBrands] = useState([]);

  const [brandName,setBrandName] = useState('');





  let imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  useEffect(()=>{
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((res)=>res.json())
    .then((data)=>{
      setBrands(data?.data)
    })
  })



  return (
    <div className="brands-cont">
      <table className="table w-100">
  <thead>
    <tr className="table-secondary">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
      <th scope="col">
        <button className="btn btn-primary">
          Add brand
        </button>
      </th>
    </tr>
  </thead>
  <tbody className="brand-list">
  {brands.map((item,index)=>{
      return(
          <tr key={item.id} className="brand-list-item">
            <th scope="row">{index+1}</th>
            <td>{item.title}</td>
            <td><img src={`${imgUrl}${item.image_src}`} alt="" /></td>
            <td colSpan={2}>
              <div>
                
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setBrandName(item.title)}>
                <i className='bx bxs-edit-alt' style={{color:"#ffffff"}}></i>
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit brand</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <label htmlFor="Model">
                          Change brand name
                        </label>
                        <br />
                        <input className="form-control" type="text" id=""  value={brandName} onChange={(e)=>setBrandName(e.target.value)}/>
                        <div className="mb-3">
                          <label htmlFor="formFile" className="form-label">Edit brand image</label>
                          <input className="form-control" type="file" id="formFile"/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-danger">
                <i className='bx bxs-trash' style={{color:"#ffffff"}} ></i>
                </button>
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

export default Brands
