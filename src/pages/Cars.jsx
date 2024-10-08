/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

const Cars = () => {
  const [cars, setCars] = useState([]);

  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carCity, setCarCity] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carSeconds, setCarSeconds] = useState();
  const [carCategory, setCarCategory] = useState();
  const [maxSpeed, setMaxSpeed] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [transmission, setTransmission] = useState();
  const [motor, setMotor] = useState();
  const [driveSide, setDriveSide] = useState();
  const [petrol, setPetrol] = useState();
  const [limitPerDay, setLimitPerDay] = useState();
  const [deposit, setDeposit] = useState();
  const [premiumProtection, setPremiumProtection] = useState();
  const [priceInAed, setPriceInAed] = useState();
  const [priceInUsd, setPriceInUsd] = useState();
  const [priceInAedSale, setPriceInAedSale] = useState();
  const [priceInUsdSale, setPriceInUsdSale] = useState();
  const [locationId, setLocationId] = useState();
  const [inclusive, setInclusive] = useState(false);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [coverImg, setCoverImg] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(7);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstitem = indexOfLastItem - itemPerPage;
  const currentItems = cars.slice(indexOfFirstitem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const token = localStorage.getItem("token");

  function getFunction() {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == true) {
          setCars(data?.data);
        } else if (data?.message.length > 50) {
          console.log(data?.message);
          toast.error("Problems on server, please try later!!!");
        } else {
          toast.error(data?.message);
        }
      });
  }

  const formData = new FormData();
  formData.append("brand_id", carBrand);
  formData.append("model_id", carModel);
  formData.append("city_id", carCity);
  formData.append("color", carColor);
  formData.append("year", carYear);
  formData.append("seconds", carSeconds);
  formData.append("category_id", carCategory);
  formData.append("max_speed", maxSpeed);
  formData.append("max_people", maxPeople);
  formData.append("transmission", transmission);
  formData.append("motor", motor);
  formData.append("drive_side", driveSide);
  formData.append("petrol", petrol);
  formData.append("limitperday", limitPerDay);
  formData.append("deposit", deposit);
  formData.append("premium_protection", premiumProtection);
  formData.append("price_in_aed", priceInAed);
  formData.append("price_in_usd", priceInUsd);
  formData.append("price_in_aed_sale", priceInAedSale);
  formData.append("price_in_usd_sale", priceInUsdSale);
  formData.append("location_id", locationId);
  formData.append("inclusive", inclusive);
  if (imageOne && imageTwo && coverImg) {
    formData.append("images", imageOne);
    formData.append("images", imageTwo);
    formData.append("cover", coverImg);
  }

  function createCars() {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars", {
      method: "Post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
        getFunction();
      });
  }

  function editCars(e) {
    e?.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${carBrand}`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        toast.error(data?.message);
        getFunction();
      });
  }


  const [delID,setDelID] = useState();

  function deleteCar(e) {
    e?.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${delID}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == true) {
          toast.success(data?.message);
          getFunction();
        } else {
          toast.error(data?.message);
        }
      });
  }

  console.log(cars);
  


  useEffect(() => {
    getFunction()
  }, []);

  return (
    <div className="cars-cont">
      <h2>Cars</h2>
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
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add brand
              </button>

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add brand
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <label htmlFor="Model">Set brand name</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carBrand}
                        onChange={(e) => setCarBrand(e.target.value)}
                      />
                      <label htmlFor="Model">Set model name</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                      />
                      <label htmlFor="Model">Set color code</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carColor}
                        onChange={(e) => setCarColor(e.target.value)}
                      />
                      <label htmlFor="Model">Set city</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carCity}
                        onChange={(e) => setCarCity(e.target.value)}
                      />
                      <label htmlFor="Model">Set year name</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carYear}
                        onChange={(e) => setCarYear(e.target.value)}
                      />
                      <label htmlFor="Model">
                        Set seconds to 100kmps speed
                      </label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carSeconds}
                        onChange={(e) => setCarSeconds(e.target.value)}
                      />
                      <label htmlFor="Model">Set category</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={carCategory}
                        onChange={(e) => setCarCategory(e.target.value)}
                      />
                      <label htmlFor="Model">Set max speed</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={maxSpeed}
                        onChange={(e) => setMaxSpeed(e.target.value)}
                      />
                      <label htmlFor="Model">Set max people places</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={maxPeople}
                        onChange={(e) => setMaxPeople(e.target.value)}
                      />
                      <label htmlFor="Model">Set transmission size</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                      />
                      <label htmlFor="Model">Set motor litres</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={motor}
                        onChange={(e) => setMotor(e.target.value)}
                      />
                      <label htmlFor="Model">Set drive side</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={driveSide}
                        onChange={(e) => setDriveSide(e.target.value)}
                      />
                      <label htmlFor="Model">Set petrol type</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={petrol}
                        onChange={(e) => setPetrol(e.target.value)}
                      />
                      <label htmlFor="Model">Set limit per day</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={limitPerDay}
                        onChange={(e) => setLimitPerDay(e.target.value)}
                      />
                      <label htmlFor="Model">Set deposit summary</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                      />
                      <br />
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={()=>setInclusive(!inclusive)}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Inclusive</label>
                      </div>
                      <br />
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Upload brand image one
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => setImageOne(e?.target?.files[0])}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Upload brand image two
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => setImageTwo(e?.target?.files[0])}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Upload cover images
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => setCoverImg(e?.target?.files[0])}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={createCars}
                        data-bs-toggle="modal"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="cars-list">
          {currentItems.map((item, index) => {
            return (
              <tr key={item.id} className="brand-list-item">
                <th scope="row">{index + 1}</th>
                <td>{item.brand.title}</td>
                <td>{item.model.name}</td>
                <td>{item.color}</td>
                <td>{item.city.name}</td>
                <td colSpan={2}>
                  <div>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setCarBrand(item.brand_id);
                        setCarModel(item.model_id);
                        setCarColor(item.color);
                        setCarCity(item.city_id);
                        setCarYear(item.year);
                        setCarSeconds(item.seconds);
                        setCarCategory(item.category_id);
                        setMaxSpeed(item.max_speed);
                        setMaxPeople(item.max_people);
                        setTransmission(item.transmission);
                        setMotor(item.motor);
                        setDriveSide(item.drive_side);
                        setPetrol(item.petrol);
                        setLimitPerDay(item.limitperday);
                        setDeposit(item.deposit);
                        setPremiumProtection(item.premium_protection);
                        setPriceInAed(item.price_in_aed);
                        setPriceInUsd(item.price_in_usd);
                        setPriceInAedSale(item.price_in_aed_sale);
                        setPriceInUsdSale(item.price_in_usd_sale);
                        setLocationId(item.location_id);
                        setInclusive(item.inclusive);
                      }}
                    >
                      <i
                        className="bx bxs-edit-alt"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </button>

                    {/* <!-- Modal --> */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Edit brand
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <label htmlFor="Model">Change brand name</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carBrand}
                              onChange={(e) => setCarBrand(e.target.value)}
                            />
                            <label htmlFor="Model">Change model name</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carModel}
                              onChange={(e) => setCarModel(e.target.value)}
                            />
                            <label htmlFor="Model">Change color code</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carColor}
                              onChange={(e) => setCarColor(e.target.value)}
                            />
                            <label htmlFor="Model">Change city</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setCarCity(e.target.value)}
                            />
                            <label htmlFor="Model">Change year name</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setCarYear(e.target.value)}
                            />
                            <label htmlFor="Model">
                              Change seconds to 100kmps speed
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setCarSeconds(e.target.value)}
                            />
                            <label htmlFor="Model">Change category</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setCarCategory(e.target.value)}
                            />
                            <label htmlFor="Model">Change max speed</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setMaxSpeed(e.target.value)}
                            />
                            <label htmlFor="Model">
                              Change max people places
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setMaxPeople(e.target.value)}
                            />
                            <label htmlFor="Model">
                              Change transmission size
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setTransmission(e.target.value)}
                            />
                            <label htmlFor="Model">Change motor litres</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setMotor(e.target.value)}
                            />
                            <label htmlFor="Model">Change drive side</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setDriveSide(e.target.value)}
                            />
                            <label htmlFor="Model">Change petrol type</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setPetrol(e.target.value)}
                            />
                            <label htmlFor="Model">Change limit per day</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setLimitPerDay(e.target.value)}
                            />
                            <label htmlFor="Model">
                              Change deposit summary
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={carCity}
                              onChange={(e) => setDeposit(e.target.value)}
                            />
                            <div className="mb-3">
                              <label htmlFor="formFile" className="form-label">
                                Edit brand image one
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) =>
                                  setImageOne(e?.target?.files[0])
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="formFile" className="form-label">
                                Edit brand image two
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) =>
                                  setImageTwo(e?.target?.files[0])
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="formFile" className="form-label">
                                Edit cover images
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) =>
                                  setCoverImg(e?.target?.files[0])
                                }
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={editCars}
                              data-bs-toggle="modal"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleDeleteModal"
                      onClick={()=>setDelID(item?.id)}
                    >
                      <i
                        className="bx bxs-trash"
                        style={{ color: "#ffffff" }}

                      ></i>
                    </button>

                    {/* <!-- Modal --> */}

                    <div
                      className="modal fade"
                      id="exampleDeleteModal"
                      tabIndex="-1"
                      aria-labelledby="exampleDeleteModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleDeleteModalLabel"
                            >
                              Do you want to delete this?
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <button
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={deleteCar}
                              data-bs-toggle="modal"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        itemPerPage={itemPerPage}
        totalItems={cars.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Cars;
