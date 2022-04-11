/**
 * Product add information add and status page
 * two components PNLeftPart AND PNRightPart
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GetIndividual_VendorActive_data } from "./ApiCall";
import swal from "sweetalert";
import "../../../index.css";
import "../Vendor/vendor.css";
import PNLeftPart from "./PNLeftPart";
import PNRightPart from "./PNRightPart";
import { API_URL } from "./CommonUrlApi";
import BBALOGO from "../../assets/img/BBA-logo.png";
import Fade from "react-reveal/Fade";
const ProductPurchase = () => {
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
  const { register: register1, handleSubmit: handleSubmit1 } = useForm();
  const [SelectVendor_Submit_button, setSelectVendor_Submit_button] =
    useState(true);
  console.log(watch());
  // watch(setSelectVendor(Vendor_select));
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
  const DemoDataDelete = (index) => {
    console.log(Vendor_data);

    // alert(index);
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const arrarydata = Vendor_data;
        var Values = arrarydata.indexOf(index);

        arrarydata.splice(index, 1);

        SetVendorData([...arrarydata]);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const FinalSubmit = (data) => {
    //alert("i m from submit data");
    setSelectVendor("");
    SetVendorData([]);
    console.log(Vendor_data);
    swal("Successfully Product Added!", "success");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - BBA STORE</title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* card start */}
          <div class="">
            <div class="card-header1">
              {/* header */}
              <div className="d-flex justify-content-between Page_header_title_search">
                <h6
                  className="mt-3 text-uppercase"
                  style={{ fontSize: "13px" }}
                >
                  Vendor Product Status
                </h6>

                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Product</span>
                </button>
              </div>
            </div>
            <div class="card-body1">
              {/* left child PNLeftPart Included */}
              <PNLeftPart />
            </div>
          </div>
          {/* card end */}

          {/* Purchase New product modal */}
          <div
            class="modal custom-modal fade  "
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl " role="document">
              <div class="modal-content">
                <div class=" modal-header">
                  <div className=" modal-title d-flex justify-content-between align-items-center">
                    <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                      <i class="fa fa-plus"></i> Add New Product
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
                  <div className="Product_add">
                    <div className="row  ">
                      <div className="col-md-4">
                        {/* vendor add product form */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div class="  ">
                            <label for="condition">
                              <span style={{ color: "red" }}>*</span>
                              <small>Company/Person</small>
                            </label>
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
                                class=" form-control Vendor-form-control"
                                value={SelectVendor}
                                {...register("Vendor_select", {
                                  onChange: (e) =>
                                    setSelectVendor(e.target.value),
                                })}
                              >
                                <>
                                  <option value="Abc Company">
                                    Abc Company
                                  </option>
                                  <option value="CDF Company">
                                    CDF Company
                                  </option>
                                  <option value="GHI Company">
                                    GHI Company
                                  </option>
                                  <option value="Monir">Monir</option>
                                </>
                              </select>
                            )}
                          </div>
                          <div class="  ">
                            <label for="condition">
                              <span style={{ color: "red" }}>*</span>
                              Category
                            </label>
                            <select
                              class="form-control Vendor-form-control"
                              id="select"
                              {...register("Product_Category", {
                                required: true,
                              })}
                            >
                              <option value="">Select Category</option>
                              <option value="Electronics">Electronics</option>

                              <option value="Motor Bike">Motor Bike</option>
                              <option value="Monir">Furniture</option>
                            </select>
                          </div>
                          <div class=" ">
                            <label for="condition">
                              <span style={{ color: "red" }}>*</span>
                              Product Name
                            </label>
                            <input
                              type="text"
                              class="form-control Vendor-form-control"
                              placeholder="Product name"
                              id="Product Name"
                              {...register("Product_name", {
                                required: true,
                              })}
                            />
                          </div>
                          <div class="  ">
                            <label for="condition">
                              <span style={{ color: "red" }}>*</span>
                              Brand Name
                            </label>
                            <input
                              type="text"
                              class="form-control Vendor-form-control"
                              placeholder=" Brand Name"
                              id="brand"
                              {...register("Product_brand")}
                            />
                          </div>
                          <div class=" ">
                            <label for="condition">
                              <span style={{ color: "red" }}>*</span>
                              Model Name
                            </label>
                            <input
                              type="text"
                              class="form-control Vendor-form-control"
                              placeholder="Model Name"
                              id="model"
                              {...register("Product_model", {
                                required: true,
                              })}
                            />
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div class=" ">
                                <label for="condition">Color</label>
                                <input
                                  type="text"
                                  class="form-control Vendor-form-control"
                                  placeholder="Product Color"
                                  id="color"
                                  {...register("Product_color")}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class="">
                                <label for="condition">Discount</label>
                                <input
                                  type="number"
                                  class="form-control Vendor-form-control"
                                  placeholder="Product Discount"
                                  id="dicount"
                                  {...register("Product_discount")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label for="condition">
                                <span style={{ color: "red" }}>*</span>
                                Quantity Required
                              </label>
                              <div class=" ">
                                <input
                                  type="number"
                                  class="form-control Vendor-form-control"
                                  id="Quantity"
                                  placeholder=" Quantity"
                                  {...register("Product_quantity", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class=" ">
                                <label for="condition">
                                  Receiving Quantity
                                </label>
                                <input
                                  type="number"
                                  class="form-control Vendor-form-control"
                                  id="Received"
                                  placeholder=" Price"
                                  {...register("Product_received", {})}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div class=" ">
                                <label for="condition">
                                  <span style={{ color: "red" }}>*</span>
                                  Total cost
                                </label>
                                <input
                                  class="form-control Vendor-form-control"
                                  id="Product_amount"
                                  type="number"
                                  placeholder="Total Cost"
                                  {...register("Product_amount", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class=" ">
                                <label for="condition">Paid Amount</label>
                                <input
                                  class="form-control Vendor-form-control"
                                  id="Paid_amount"
                                  type="number"
                                  placeholder="Paid Amount"
                                  {...register("Paid_amount", {})}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div class="  ">
                                <label for="condition">
                                  <span style={{ color: "red" }}>*</span>
                                  Condition
                                </label>
                                <select
                                  class="form-control Vendor-form-control"
                                  id="condition"
                                  {...register("Product_condition", {
                                    required: true,
                                  })}
                                >
                                  <option value="">Select condition</option>
                                  <option value="New">New</option>

                                  <option value="Used">Used</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class="  ">
                                <label for="Purchasingdate">
                                  <span style={{ color: "red" }}>*</span>
                                  Date Required
                                </label>
                                <input
                                  class="form-control Vendor-form-control"
                                  id="Purchasingdate"
                                  type="date"
                                  {...register("Product_date", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="  ">
                            <label for="Product_details">Product Details</label>
                            <textarea
                              class="form-control Vendor-form-control"
                              placeholder="Product Details"
                              {...register("details")}
                              id="Product_details"
                              style={{ height: "70px" }}
                            ></textarea>
                          </div>

                          <div class="form-control mt-2 ">
                            <input
                              type="file"
                              class=" Vendor-form-control"
                              id="file"
                              placeholder="Upload"
                              {...register("file")}
                            />
                          </div>

                          <div class="   mt-2 mb-2">
                            <button
                              type="submit"
                              class="Button_success btn-block "
                            >
                              Add
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-8 mt-sm-2">
                        <div className="table-responsive">
                          {SelectVendor && (
                            <h5>Product Purchasing From {SelectVendor}</h5>
                          )}
                          {/* table start */}
                          <table class="table">
                            <thead>
                              {Vendor_data != null && (
                                <tr>
                                  <th>Company</th>
                                  <th>Product Category</th>
                                  <th>Product Name</th>
                                  <th>Brand Name</th>
                                  <th>Model</th>
                                  <th>Color</th>
                                  <th>Product Discount</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Condition</th>
                                  <th>Date</th>
                                  <th>Details</th>
                                  <th>Action</th>
                                </tr>
                              )}
                            </thead>
                            <tbody>
                              {Vendor_data.length != 0 &&
                                Vendor_data.map((row, index) => (
                                  <>
                                    <tr>
                                      <td>{row.Vendor_select}</td>

                                      <td key={index}>
                                        {row.Product_Category}
                                      </td>
                                      <td>{row.Product_name}</td>
                                      <td>{row.Product_brand}</td>
                                      <td>{row.Product_model}</td>
                                      <td>{row.Product_color}</td>
                                      <td>{row.Product_discount}</td>

                                      <td>{row.Product_price}</td>
                                      <td>{row.Product_quantity}</td>
                                      <td>{row.Product_condition}</td>
                                      <td>{row.Product_date}</td>
                                      <td>{row.Product_details}</td>

                                      <td>
                                        {row.file}
                                        {row.file && (
                                          <img
                                            src={`${BBALOGO}`}
                                            style={{ maxWidth: "30px" }}
                                          />
                                        )}
                                        {row.file == null && <p>.....</p>}
                                      </td>
                                      <td onClick={() => DemoDataDelete(index)}>
                                        <i
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                          className="fa fa-trash-o m-r-5"
                                        />{" "}
                                      </td>
                                    </tr>
                                  </>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        {Vendor_data.length != 0 && (
                          <form onSubmit={handleSubmit1(FinalSubmit)}>
                            <div className="text-center">
                              <button type="submit" class="Button_primary mt-5">
                                Final Submit
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default ProductPurchase;
