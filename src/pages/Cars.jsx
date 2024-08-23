import { useEffect, useState } from "react";


const Cars = () => {
  const [cars,setCars] = useState([]);

  const [carBrand,setCarBrand] = useState('');
  const [carModel,setCarModel] = useState('');
  const [carColor,setCarColor] = useState('');
  const [carCity,setCarCity] = useState('');





  // let imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  useEffect(()=>{
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
    .then((res)=>res.json())
    .then((data)=>{
      setCars(data?.data)
    })
  })

console.log(cars);


  return (
    <div className="brands-cont">
      <table className="table w-100">
  <thead>
    <tr className="table-secondary">
      <th scope="col">#</th>
      <th scope="col">Brand</th>
      <th scope="col">Model</th>
      <th scope="col">Color</th>
      <th scope="col">City</th>
      <th scope="col">Action</th>
      <th scope="col">
        <button className="btn btn-primary">
          Add brand
        </button>
      </th>
    </tr>
  </thead>
  <tbody className="brand-list">
  {cars.map((item,index)=>{
      return(
          <tr key={item.id} className="brand-list-item">
            <th scope="row">{index+1}</th>
            <td>{item.brand.title}</td>
            <td>{item.model.name}</td>
            <td>{item.color}</td>
            <td>{item.city.name}</td>
            <td colSpan={2}>
              <div>
                
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                  setCarBrand(item.brand.title);
                  setCarModel(item.model.name);
                  setCarColor(item.color);
                  setCarCity(item.city.name);
                }}>
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
                        <input className="form-control" type="text" id=""  value={carBrand} onChange={(e)=>setCarBrand(e.target.value)}/>
                        <label htmlFor="Model">
                          Change model name
                        </label>
                        <br />
                        <input className="form-control" type="text" id=""  value={carModel} onChange={(e)=>setCarModel(e.target.value)}/>
                        <label htmlFor="Model">
                          Change color code
                        </label>
                        <br />
                        <input className="form-control" type="text" id=""  value={carColor} onChange={(e)=>setCarColor(e.target.value)}/>
                        <label htmlFor="Model">
                          Change city name
                        </label>
                        <br />
                        <input className="form-control" type="text" id=""  value={carCity} onChange={(e)=>setCarCity(e.target.value)}/>
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

export default Cars
