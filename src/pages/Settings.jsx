/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

const Settings = () => {
  const [models, setModels] = useState([]);
  const [editModelname, setEditModelname] = useState("");
  const [editModelbrand, setEditModelbrand] = useState("");
  const [editPic, setEditPic] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(7);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstitem = indexOfLastItem - itemPerPage;
  const currentItems = models.slice(indexOfFirstitem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  let url = "https://autoapi.dezinfeksiyatashkent.uz/api/categories";

  const formdata = new FormData();
  formdata.append("name_en", editModelname);
  formdata.append("name_ru", editModelbrand);
  formdata.append("images", editPic);

  const token = localStorage.getItem("token");

  function getFunction() {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setModels(data?.data);
      });
  }

  function createCategory(e) {
    e?.preventDefault();
    fetch(url, {
      method: "Post",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
        // "content-type":"multipart/form-data"
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          toast.success(data?.message);
          setEditModelname("");
          setEditModelbrand("");
          getFunction();
        } else {
          toast.error(data?.message);
        }
      });
  }

  const deleteCat = (e) => {
    e?.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${editID}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          toast.success(data?.message);
          getFunction();
        } else {
          toast.error(data?.message);
        }
      });
  };

  const [editID, setEditID] = useState();
  const formData = new FormData();

  formData.append("name_en", editModelname);
  formData.append("name_ru", editModelbrand);
  if (editPic) {
    formData.append("images", editPic);
  }

  const editCat = (e) => {
    e.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${editID}`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          toast.success(data?.message);
          setEditModelbrand("");
          setEditModelname("");
          setEditPic(null);
          getFunction();
        } else {
          toast.error(data?.message);
        }
      });
  };

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <div className="models-cont">
      <h2>Settings</h2>
      <table className="table w-100">
        <thead>
          <tr className="table-secondary">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add category
              </button>

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Modal title
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <label htmlFor="Model">Model name</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={editModelname}
                        onChange={(e) => setEditModelname(e.target.value)}
                      />
                      <label htmlFor="Model">Brand name</label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={editModelbrand}
                        onChange={(e) => setEditModelbrand(e.target.value)}
                      />
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Brand image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          required
                          accept="image/png, image/jpeg"
                          onChange={(e) => setEditPic(e?.target?.files[0])}
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
                        onClick={createCategory}
                        data-bs-toggle="modal"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="models-list">
          {currentItems.map((item, index) => {
            return (
              <tr key={index} className="models-list-item">
                <th scope="row">{index + 1}</th>
                <td>{item.name_en}</td>
                <td>{item.name_ru}</td>
                <td>
                  <img src={`${imgUrl}${item.image_src}`} alt="" />
                </td>
                <td colSpan={2}>
                  <div>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleEditModal"
                      onClick={() => {
                        setEditID(item?.id);
                        setEditModelbrand(item?.name_ru);
                        setEditModelname(item?.name_en);
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
                      id="exampleEditModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleEditModalLabel"
                            >
                              Edit model
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <label htmlFor="Model">Change model name</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={editModelname}
                              onChange={(e) => setEditModelname(e.target.value)}
                            />
                            <label htmlFor="Model">Change brand name</label>
                            <br />
                            <input
                              className="form-control"
                              type="text"
                              id=""
                              value={editModelbrand}
                              onChange={(e) =>
                                setEditModelbrand(e.target.value)
                              }
                            />
                            <div className="mb-3">
                              <label htmlFor="formFile" className="form-label">
                                Edit brand image
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setEditPic(e.target.files[0])}
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
                              onClick={editCat}
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
                      onClick={() => setEditID(item?.id)}
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
                              onClick={deleteCat}
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
        totalItems={models.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Settings;
