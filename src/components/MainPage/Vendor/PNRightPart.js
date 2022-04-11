/**
 * Product Purchase Right side
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ServiceProviders } from "../Vendor/ApiCall";
import { GetDeleiveryProduct } from "../Vendor/ApiCall";
import "../../../index.css";
import "../Vendor/vendor.css";
import Fade from "react-reveal/Fade";
const PNRightPart = (props) => {
  // from product purchase component
  const [Edit_delete, SetEditDelete] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [isDelete, setIsDelete] = useState(true);
  const [SelectVendor, setSelectVendor] = useState("");
  const [vendorStatus_details_open, setVendorStatus_details_open] =
    useState(false);
  const [GetVendorActiveData, setGetVendorActiveData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const onSubmit = (data) => {
    if (data.file.length != 0) {
      data.file = data.file[0].name;
    }
    SetVendorData([...Vendor_data, data]);
    console.log(SelectVendor);
    console.log(data);
    reset();

    //  alert();
  };
  // from product purchase component end

  const [Provider, SetProvider] = useState([]);
  const [Active_individual_data, setActive_individual_data] = useState({});
  const [GetDeliveryProduct, setGetDeliveyProduct] = useState({});
  const [error, SetError] = useState(false);
  useEffect(() => {
    const getUsers = () => {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${props.PassVebdor_Active_data}`
      )
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setActive_individual_data(users);
          },

          (err) => {}
        );
    };
    getUsers();
  }, [props.PassVebdor_Active_data]);
  const Deleivery_Product_update = async (id) => {
    const response = await GetDeleiveryProduct(id);
    if (response) {
      setGetDeliveyProduct(response.data);
      console.log(response.data);
    }
  };
  return (
    <>
      {/* service provide by vendor start */}
      {props.openRighhtSideData && (
        <section>
          <Fade right>
            <div className="Vendor_Status_right_side">
              <div className="Vendor_Status_right_side_header">
                <div class="d-flex justify-content-between align-items-center">
                  <p className="mx-auto pt-2 pb-2">
                    <strong>Service Id:</strong> {Active_individual_data.id}
                  </p>
                  <p className="mx-auto pt-2 pb-2">
                    <strong>Date:</strong>01/2/2010
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <p className="mx-auto pt-2 pb-2">
                    <strong>Status:</strong>pending
                  </p>
                  <p className="mx-auto pt-2 pb-2">
                    <strong>Amount:</strong>1000Tk
                  </p>
                </div>
              </div>
              {/* service provide by vendor  end */}
              <div className="details_vendor_status_data">
                {/* table status */}
                <div class="table-responsive ">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Company Name</th>

                        <th>Service Id</th>
                        <th>Total Amount</th>
                        <th>Total paid</th>
                        <th>Due Amount</th>
                        <th>Ordered Date</th>
                        <th>Total Quantity</th>
                        <th>Recevied Quantity</th>
                        <th>Due Quntity</th>
                        <th>Status</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Active_individual_data && (
                        <>
                          <tr>
                            <td>{Active_individual_data.id}</td>
                            <td>{Active_individual_data.title}</td>
                            <td>234</td>
                            <td>23400</td>
                            <td>233</td>
                            <td>3400</td>
                            <td>23/05/2021</td>
                            <td>10</td>

                            <td>7</td>
                            <td>3</td>
                            <td>Incomplete</td>

                            <td>
                              <div className="dropdown dropdown-action text-right">
                                <a
                                  href="#"
                                  className="action-icon dropdown-toggle"
                                  data-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="material-icons">more_vert</i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a
                                    className="dropdown-item "
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#Product_Details"
                                    onClick={() =>
                                      Deleivery_Product_update(
                                        Active_individual_data.id
                                      )
                                    }
                                  >
                                    <i className="fa fa-eye m-r-5" /> Details
                                  </a>
                                  <a
                                    className="dropdown-item "
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#Product_update"
                                    onClick={() =>
                                      Deleivery_Product_update(
                                        Active_individual_data.id
                                      )
                                    }
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    <i className="fa fa-trash-o m-r-5" /> Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Fade>
        </section>
      )}
      {/* Deleivery Product Update */}

      <div
        class="modal custom-modal fade  "
        id="Product_update"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md " role="document">
          <div class="modal-content">
            <div class=" modal-header">
              <div className=" modal-title d-flex justify-content-between align-items-center">
                <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                  Product Info Update
                </h5>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body ">
              <div className="row Product_add ">
                <div className="col-md-12">
                  {/* vendor Update product form */}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-floating mt-2 ">
                      {SelectVendor != 0 && (
                        <>
                          <input
                            className="form-control"
                            defaultValue={SelectVendor}
                            {...register("Vendor_select")}
                            readOnly
                          />
                        </>
                      )}
                      {SelectVendor == 0 && (
                        <select
                          class=" form-select Vendor-form-control"
                          defaultValue={SelectVendor}
                          {...register("Vendor_select", {
                            onChange: (e) => setSelectVendor(e.target.value),
                          })}
                        >
                          <>
                            <option value="Abc Company">Abc Company</option>
                            <option value="CDF Company">CDF Company</option>
                            <option value="GHI Company">GHI Company</option>
                            <option value="Monir">Monir</option>
                          </>
                        </select>
                      )}
                    </div>
                    <div class="form-floating mt-2 ">
                      <select
                        class="form-select Vendor-form-control"
                        id="select"
                        {...register("Product_Category", {
                          required: true,
                        })}
                      >
                        <option value="Electronics" readOnly>
                          Electronics
                        </option>
                      </select>
                    </div>
                    <div class="form-floating mt-2">
                      <input
                        type="text"
                        class="form-control Vendor-form-control"
                        placeholder="Write name"
                        id="Product Name"
                        {...register("Product_name", {})}
                        readOnly
                        defaultValue={"ABC"}
                      />
                    </div>
                    <div class="form-floating mt-2 ">
                      <input
                        type="text"
                        class="form-control Vendor-form-control"
                        placeholder="Write Brand Name"
                        defaultValue={"HP"}
                        id="brand"
                        {...register("Product_brand")}
                        readOnly
                      />
                      <label for="model">Write Brand Name</label>
                    </div>
                    <div class="form-floating mt-2 ">
                      <input
                        type="text"
                        class="form-control Vendor-form-control"
                        placeholder="Enter Product Brand"
                        id="model"
                        {...register("Product_model", {
                          required: true,
                        })}
                        defaultValue={"o2e"}
                        readOnly
                      />
                      <label for="model">Model</label>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-floating mt-2 ">
                          <input
                            type="number"
                            class="form-control Vendor-form-control"
                            id="Price"
                            defaultValue={"5768686"}
                            placeholder="Enter Price"
                            readOnly
                            {...register("Product_price", {
                              required: true,
                            })}
                          />
                          <label for="model">Total Amount</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-floating mt-2 ">
                          <input
                            type="number"
                            class="form-control Vendor-form-control"
                            id="Quantity"
                            defaultValue={"24440"}
                            placeholder="Enter Quantity"
                            {...register("Product_quantity", {
                              required: true,
                            })}
                            readOnly
                          />
                          <label for="model">Total Paid</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-floating mt-2 ">
                          <input
                            type="number"
                            class="form-control Vendor-form-control"
                            id="Price"
                            defaultValue={"34"}
                            placeholder="Enter Price"
                            readOnly
                            {...register("Product_qty", {
                              required: true,
                            })}
                          />
                          <label for="model">Total Quantity</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-floating mt-2 ">
                          <input
                            type="number"
                            class="form-control Vendor-form-control"
                            id="Quantity"
                            defaultValue={"20"}
                            placeholder="Enter Quantity"
                            {...register("Recevied_qty", {
                              required: true,
                            })}
                            readOnly
                          />
                          <label for="model">Total Received Quantity</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-floating mt-2 ">
                          <input
                            type="number"
                            class="form-control Vendor-form-control"
                            id="Price"
                            placeholder="Enter due amount to paid "
                            {...register("due_amount", {
                              required: true,
                            })}
                          />
                          <label for="model">Due Amount Paid</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-floating mt-2 ">
                          <input
                            type="number"
                            class="form-control Vendor-form-control"
                            id="Quantity"
                            placeholder="Enter Quantity"
                            {...register("due_quantity", {
                              required: true,
                            })}
                          />
                          <label for="model">Due Quntity Received</label>
                        </div>
                      </div>
                    </div>

                    <div class="form-floating mt-2 ">
                      <input
                        class="form-control Vendor-form-control"
                        id="Purchasingdate"
                        type="date"
                        {...register("Product_date", {
                          required: true,
                        })}
                      />
                      {errors.Product_date && (
                        <label for="Purchasingdate">Date Required</label>
                      )}
                      {errors.Product_date == null && (
                        <label for="Purchasingdate">
                          <span style={{ color: "red" }}>*</span> Date
                        </label>
                      )}
                    </div>

                    <div class="form-floating mt-2 ">
                      <textarea
                        class="form-control Vendor-form-control"
                        placeholder="Product Details"
                        {...register("details")}
                        id="Product_details"
                        style={{ height: "70px" }}
                      ></textarea>
                      <label for="Product_details">
                        Add Product Receiving History
                      </label>
                    </div>

                    <div class="form-floating d-grid  mt-2 mb-2">
                      <button type="submit" class="Button_success ">
                        Add
                      </button>
                    </div>
                  </form>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    class="Button_Danger1 float-right "
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div
        class="modal custom-modal fade  "
        id="Product_Details"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl " role="document">
          <div class="modal-content">
            <div class=" modal-header">
              <div className=" modal-title d-flex justify-content-between align-items-center">
                <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}></h5>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body ">
              <div className="row Product_add ">
                <div className="col-md-12">
                  <h4 className="text-center mt-2">Products Details History</h4>
                  {/* card start */}
                  <div class="card">
                    <div class="card-body">
                      <div className="row justify-content-between ">
                        <div className="col-md-6 col-sm-6">
                          <table className=" product_history_details">
                            <tr>
                              <th> Compnay Name:</th>
                              <td>ABC</td>
                            </tr>
                            <tr>
                              <th>Ordered Date :</th>
                              <td>03/02/2021</td>
                            </tr>
                            <tr>
                              <th> Total Amount:</th>
                              <td>666666666</td>
                            </tr>
                            <tr>
                              <th> Total Paid :</th>
                              <td>56565</td>
                            </tr>
                            <tr>
                              <th> Amount Due :</th>
                              <td>5666</td>
                            </tr>
                          </table>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <table className=" product_history_details">
                            <tr>
                              <th> Product Name:</th>
                              <td>DEF</td>
                            </tr>
                            <tr>
                              <th> Product Quntity:</th>
                              <td>5</td>
                            </tr>
                            <tr>
                              <th> Product Received:</th>
                              <td>2</td>
                            </tr>
                            <tr>
                              <th> Product Due:</th>
                              <td>3</td>
                            </tr>
                            <tr>
                              <th> Product Status:</th>
                              <td>Incomplete</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <h6 class="card-title mt-3">Product Receiving History</h6>
                      <div className="table-responsive">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Product Received</th>
                              <th scope="col">Taka Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>03/02/2020</td>
                              <td>5</td>
                              <td>456</td>
                            </tr>
                            <tr>
                              <td>03/02/2022</td>
                              <td>6</td>
                              <td>45699</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* card end */}
                </div>

                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    class="Button_Danger1 float-right "
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PNRightPart;
