/**
 * Product Ordered component
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../../index.css";
import "../Vendor/vendor.css";
import PUBLIC_URL, { API_URL } from "../Vendor/CommonUrlApi";
import VendorEdit from "./VendorEdit";
import {
  GetVendor_individualData_update,
  OrderedData,
} from "../Vendor/ApiCall";
import { array } from "prop-types";
const ProductOrdered = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Edit_delete, SetEditDelete] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Action_button, setActionButton] = useState(false);
  const [EditModal, setEditModa] = useState(false);
  const [ProductOrderedData, setProductOrderedData] = useState([]);
  const [Individual_data, setIndividual_data] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [searchStatus, setSearchStatus] = useState("");
  const [GetSearchData, setGetSearchData] = useState([]);
  const [notFoundSearch, setnotFoundSearch] = useState(true);
  //let getLoginData = JSON.parse(localStorage.getItem("VendorData"));
  //let getLoginData = [];
  useEffect(() => {
    setTimeout(() => {
      setDataLoader(false);
    }, 1000);
  }, []);
  useEffect(() => {
    GetProductOrderData();
  }, []);
  const GetProductOrderData = async () => {
    // SetError(false);
    try {
      const response = await OrderedData();
      if (response) {
        setProductOrderedData(response.data);
        setTimeout(() => {
          setDataLoader(false);
        }, 2000);
      }
    } catch (error) {
      //   SetError(true);
      console.log(error);
    }
  };
  const {
    register,

    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: register1,

    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  // submit vendor create data info
  const onSubmit = (data) => {
    SetVendorData([...Vendor_data, data]);
    reset();
    console.log(data);

    // localStorage.setItem("VendorData", JSON.stringify(Vendor_data));
  };
  const onSubmit1 = (data) => {
    if (data) {
      swal({
        title: "Updated Successfully!",

        icon: "success",
        button: "Ok!",
      });
    }

    console.log(data);
  };
  //Action edit,delete
  const Action_bar = (name) => {
    console.log(name);
    setActionButton(true);
  };

  //edit vendor data
  const EditIndividual_vendor = async (id) => {
    if (id) {
      setIndividual_data(id);
      const response = await GetVendor_individualData_update(id);
      if (response) {
        setUpdateDataFound(response.data);
        console.log(response.data);

        console.log(UpdateDataFound);
      }
    }
  };
  const DeleteIndividual_vendor = (id) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const arrarydata = Vendor_data;
        var Values = arrarydata.indexOf(id);

        arrarydata.splice(Values, 1);

        SetVendorData([...arrarydata]);
      } else {
        swal("Record is not delete!");
      }
    });
  };
  //table
  const UpdateSubmit = (data) => {
    console.log("ok");
  };

  //search functionality
  useEffect(() => {
    const SearchProductOrderedData = () => {
      fetch(`${API_URL}posts/${searchStatus}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (FoundSearchProductData) => {
            console.log(ProductOrderedData);
            if (FoundSearchProductData) {
              setGetSearchData([...GetSearchData, FoundSearchProductData]);
              // setSearchStatus(FoundSearchProductData);
            }

            // setProductOrderedData(FoundSearchProductData);
            // [...ProductOrderedData, FoundSearchProductData];
            // setnotFoundSearch(true);
          },

          (err) => {
            console.log(err);
            //  setnotFoundSearch(false);
          }
        );
    };
    if (searchStatus) {
      SearchProductOrderedData();
    }
  }, [searchStatus]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
    },

    {
      title: "Details",
      dataIndex: "body",
    },
    {
      title: "Status",
      dataIndex: "",
    },

    {
      title: "Action",
      render: (text, record) => (
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
              data-target="#vendor_update"
              onClick={() => {
                EditIndividual_vendor(record.id);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                DeleteIndividual_vendor(record.id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
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
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                <div>
                  <h5 className="mr-2 text-center text-uppercase">
                    Product Ordered Status
                  </h5>
                </div>
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    value={searchStatus}
                    name="searchStatus"
                    placeholder="Search"
                    onChange={(e) => setSearchStatus(e.target.value)}
                  />
                </div>
              </div>
              {/* header */}
            </div>
            <div class="card-body1">
              {/* /Page Header */}

              {/* table start */}
              {DataLoader && (
                <>
                  {/* DataLoader */}
                  <p className="text-center mt-5">
                    {" "}
                    <i
                      class="fa fa-spinner fa-spin fa-3x fa-fw"
                      style={{ color: "green", fontSiz: "20px" }}
                    ></i>
                    <span class="sr-only">Loading...</span>
                  </p>
                </>
              )}
              {DataLoader != true && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <Table
                        className="table table-striped"
                        pagination={{
                          total: ProductOrderedData.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered

                        dataSource={
                          searchStatus == ""
                            ? ProductOrderedData
                            : GetSearchData
                        }
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-lg custom_modal_size"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{ fontWeight: "600", color: "#5265ac" }}
                      >
                        <i class="fa fa-plus"></i> Update Vendor
                        {UpdateDataFound.id}
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    {/* vendor update form */}
                    <div class="modal-body">
                      {/* vendor form */}
                      {Individual_data}

                      <form
                        onSubmit={handleSubmit1(onSubmit1)}
                        className=" g-3 needs-validation"
                        novalidate
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div class="form-group custom_group">
                              <span class="title_vendor">
                                <span style={{ color: "red" }}>*</span>Name
                              </span>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Write name"
                                defaultValue={UpdateDataFound.id}
                                {...register1("Firstname", {})}
                              />
                            </div>

                            {errors2.Firstname && (
                              <span className="errorsMsg">
                                Name field is required
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <div class="form-group custom_group">
                              <span class="title_vendor">
                                {" "}
                                <span style={{ color: "red" }}>*</span>Email
                              </span>
                              <input
                                type="email"
                                class="form-control"
                                id="validationDefault02"
                                placeholder="Enter email"
                                {...register1("Email", {
                                  pattern: /@/,
                                  required: true,
                                })}
                              />
                            </div>
                            {errors2.Email && (
                              <span className="errorsMsg">
                                Please enter valid email
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div class="form-group custom_group">
                              <span class="title_vendor">
                                {" "}
                                <span style={{ color: "red" }}>*</span>Mobile
                              </span>
                              <input
                                type="number"
                                class="form-control"
                                id="validationDefault03"
                                placeholder="Enter Mobile number"
                                {...register1("Mobile", {
                                  // required: true,
                                  // pattern: /^01[35-9]\d{8}/,
                                  // maxLength: 11,
                                })}
                              />
                            </div>
                            {errors2.Mobile && (
                              <span className="errorsMsg">
                                Please enter valid number
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <div class="form-group custom_group">
                              <span class="title_vendor">
                                {" "}
                                <span style={{ color: "red" }}>*</span>Service
                                Type
                              </span>
                              <select
                                class="form-control"
                                id="validationDefault04"
                                {...register1("Vendor_Service", {
                                  // required: true,
                                })}
                              >
                                <option value="">Select</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Exports">Exports</option>
                                <option value="Motor Bike">Motor Bike</option>
                                <option value="Monir">Monir</option>
                              </select>
                            </div>
                            {errors2.Vendor_Service && (
                              <span className="errorsMsg">Select Service</span>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div class="form-group custom_group">
                              <span class="title_vendor">
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Pre-Request
                              </span>
                              <textarea
                                class="form-control"
                                placeholder="Pre Request"
                                id="validationDefault05"
                                defaultValue={UpdateDataFound.title}
                                {...register1("Vendor_PreRequest", {
                                  // required: true,
                                  // minLength: 20,
                                })}
                                rows="3"
                              ></textarea>
                            </div>
                            {errors2.Vendor_PreRequest && (
                              <span className="errorsMsg">
                                Minimum 20 characters required
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <div class="form-group custom_group">
                              <span class="title_vendor">Details</span>
                              <textarea
                                class="form-control"
                                placeholder="Pre Request"
                                id="validationDefault06"
                                defaultValue={UpdateDataFound.body}
                                {...register1("Vendor_details")}
                                id="inputAddress"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div class="form-group custom_group">
                            <span class="title_vendor">
                              <span style={{ color: "red" }}>*</span>Id
                            </span>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Write Id"
                              id="validationDefault07"
                              defaultValue={UpdateDataFound.id}
                              {...register1("id", {
                                // required: true,
                              })}
                            />
                          </div>
                          {errors2.id && (
                            <span className="errorsMsg">id is required</span>
                          )}
                        </div>
                        <div className="SubmitFooter">
                          <button type="submit" class="Button_success">
                            Submit
                          </button>
                          <button
                            type="button"
                            class="Button_Danger1"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default ProductOrdered;
