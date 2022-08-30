/**
 * Vendor Add Information component
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import { PUBLIC_URL, API_URL } from "../Vendor/CommonUrlApi";
import VendorEdit from "./VendorEdit";

import {
  GetVendor_individualData_update,
  VendorInfoData,
} from "../Vendor/ApiCall";

const Create_Vendor = (props) => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [search_vendor_data, setsearch_vendor_data] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [getFileupload, setgetFileupload] = useState([]);

  useEffect(() => {
    document.title = "Vendor Add form";
    // document.getElementById("hddd").innerHTML = "";
    console.log(props);
    VendorInfo();

    // getfromLaravel();
  }, []);

  const VendorInfo = async () => {
    try {
      const reponse = await VendorInfoData();
      console.log("hi" + reponse);
      setVendorInfo(reponse.data);
      // console.log(Vendor_Info);
    } catch (error) {
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
    reset: reset1,
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  // submit for store vendor  data info
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${API_URL}/vendor/add_vendor`, data, {
        headers: {
          "Content-Type": "application/json",
          name: "ismayel56777",
          Email: "ismayelhossen123@gmail.com",
        },
      })
      .then((response) => {
        if (response.data.success) {
          VendorInfo();
          window.$("#exampleModal").modal("hide");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // SetVendorData([...Vendor_data, data]);
    //  reset();
    console.log(data);

    // localStorage.setItem("VendorData", JSON.stringify(Vendor_data));
  };

  //edit vendor data

  const EditIndividual_vendor = async (data) => {
    // setIndividual_data(id);
    // const response = await GetVendor_individualData_update(id);

    console.log(data);

    const result = Vendor_Info.filter(
      (id) => (id.ID <= data) & (id.ID >= data)
    );
    // setupdateFilteringdata(result[0]);
    console.log(result[0]);
    setUpdateDataFound(result[0]);
    // console.log(response.data[0]);

    console.log(UpdateDataFound);
  };
  const onSubmitUpdate = async (data) => {
    console.log(data);
    if (data.vendor_name == "") {
      data.vendor_name = UpdateDataFound.VENDOR_NAME;
    }

    if (data.category_type == "") {
      data.category_type = UpdateDataFound.CATEGORY_TYPE;
    }
    if (data.agreement_type == "") {
      data.agreement_type = UpdateDataFound.AGREEMENT_TYPE;
    }
    if (data.procurement_type == "") {
      data.procurement_type = UpdateDataFound.PROCUREMENT_TYPE;
    }
    console.log(data);
    if (data) {
      let id = UpdateDataFound.ID;
      const updateResult = await axios
        .put(`${API_URL}/vendor/vendor/update/${id}`, data)
        .then((response) => {
          if (response.data.success) {
            VendorInfo();
            swal({
              title: "Updated Successfully!",
              icon: "success",
              button: "Ok!",
            });
            reset1();
            window.$("#vendor_update").modal("hide");
          }
        })

        .catch((error) => {
          console.log(error);
          console.log(data);
        });
    }

    // console.log(UpdateDataFound);
  };

  const DeleteIndividual_vendor = (id) => {
    setvendorDeleteId(id);

    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${API_URL}/vendor/delete_vendor/${id}`)
          .then((response) => {
            if (response.data.success) {
              VendorInfo();
            } else {
              console.log(response);
              swal({
                title:
                  "You have no ppermision to delete it,please inform it your nearest officer to delete the relevant data first",
                icon: "warning",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Record is not delete!");
      }
    });
  };

  //search vendor
  useEffect(() => {
    if (search_vendor_data == "") {
      VendorInfo();
    } else {
      const WithOutSpaciallChar = search_vendor_data
        .toLowerCase()
        // .replace(/\//g, "")
        // .replace(/ /g, "")
        // .replace(/[^\w\s]/gi, "");
        .replace(/[^\w\@]/gi, "");
      if (WithOutSpaciallChar != "") {
        axios
          .get(`${API_URL}/vendor/Vendor_search/${WithOutSpaciallChar}`)
          .then((response) => {
            console.log(response.data);
            setVendorInfo(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [search_vendor_data]);

  //table
  let year = 4;
  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "VENDOR_NAME",
    },
    {
      title: "Agreement Institution",
      dataIndex: "AGREEMENT_TYPE",
    },

    {
      title: "Vendor Category",
      dataIndex: "CATEGORY_TYPE",
    },

    {
      title: " Procurement Type",
      dataIndex: "PROCUREMENT_TYPE",
    },

    {
      title: "Financial Year",
      render: (text, record) => (
        <>
          <p>{year++}</p>
        </>
      ),
    },

    {
      title: "View Details",
      render: (text, record) => (
        <Link
          class="btn btn-primary btn-small"
          to={`/vendor/details/add/${record.ID}`}
        >
          <span class="fa fa-eye"></span>
        </Link>
      ),
    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action">
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
                EditIndividual_vendor(record.ID);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                DeleteIndividual_vendor(record.ID);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  const windowOpen = () => {
    // window.moveTo();
    window.close();
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
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  Welcome To Vendor{props.value12 } {console.log(props.value12)}
                </h4>
              </div>
              {/* header */}
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    value={search_vendor_data}
                    name="searchStatus"
                    placeholder="Search"
                    onChange={(e) => setsearch_vendor_data(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Vendor</span>
                </button>
              </div>
            </div>
            <div class="card-body1">
              {/* /Page Header */}
              <div
                class="modal custom-modal fade "
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                        <i class="fa fa-plus"></i> Add Vendor{" "}
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
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Agreement
                              Type Institution
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register("agreement_type", {
                                  required: true,
                                })}
                              >
                                <option value="">
                                  Agreement Type Institution
                                </option>
                                <option value="Govt.">Govt.</option>
                                <option value="Private">Private</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>
                              Vendor Category
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register("category_type", {
                                  required: true,
                                })}
                              >
                                <option value="">Select Vendor</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Contractor">Contractor</option>
                                <option value="Contractor">Consultant</option>
                              </select>
                            </div>
                          </div>

                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Procurement
                              Type
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register("procurement_type", {
                                  required: true,
                                })}
                              >
                                <option value="">
                                  Select procurement_type
                                </option>
                                <option value="DPM">DPM</option>
                                <option value="RFQ">RFQM</option>
                                <option value="LTM">LTM</option>
                                <option value="OTM">OTM</option>
                                <option value="OSTM">OSTM</option>
                                <option value="OSTETM">OSTETM</option>
                                <option value="TSTM">TSTM</option>
                                <option value="QCBS">QCBS</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>{" "}
                              Company/Person Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control Vendor-form-control"
                                placeholder="    Company/Person Name"
                                id="validationDefault01"
                                {...register("vendor_name", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>

                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Submit</span>
                            </button>
                            <button
                              type="button"
                              class="Button_Danger1"
                              data-dismiss="modal"
                            >
                              <span> Close</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* table start */}
              <div className="row">
                <div className="col-md-12">
                  {!DataLoader && (
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
                  {DataLoader && (
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: Vendor_Info.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={Vendor_Info.length > 0 ? Vendor_Info : null}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{ fontWeight: "600", color: "#5265ac" }}
                      >
                        <i className="fa fa-pencil m-r-5" /> Update Vendor
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
                    {/* handleSubmit1(onSubmit1) */}
                    {/* vendor update form */}
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}
                        <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>{" "}
                              Company/Person Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control Vendor-form-control"
                                placeholder=" Company/Person Name"
                                defaultValue={UpdateDataFound.VENDOR_NAME}
                                {...register1("vendor_name")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Agreement
                              Type Institution
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register1("agreement_type", {
                                  required: true,
                                })}
                              >
                                <option>Agreement Type Institution</option>
                                <option
                                  defaultValue={
                                    UpdateDataFound.AGREEMENT_TYPE == "Govt."
                                  }
                                  selected
                                >
                                  Govt.
                                </option>
                                <option
                                  defaultValue={
                                    UpdateDataFound.AGREEMENT_TYPE == "Private"
                                  }
                                  selected
                                >
                                  Private
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>
                              Vendor Category
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register1("category_type", {
                                  required: true,
                                })}
                              >
                                <option>Select Vendor</option>

                                <option
                                  defaultValue={
                                    UpdateDataFound.CATEGORY_TYPE == "Supplier"
                                  }
                                  selected
                                >
                                  Supplier
                                </option>
                                <option
                                  defaultValue={
                                    UpdateDataFound.CATEGORY_TYPE ==
                                    "Contractor"
                                  }
                                  selected
                                >
                                  Contractor
                                </option>
                                <option
                                  defaultValue={
                                    UpdateDataFound.CATEGORY_TYPE ==
                                    "Consultant"
                                  }
                                  selected
                                >
                                  Consultant
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Procurement
                              Type
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register1("procurement_type", {
                                  required: true,
                                })}
                              >
                                <option>Select procurement_type</option>

                                <option
                                  defaultValue={
                                    UpdateDataFound.PROCUREMENT_TYPE == "DPM"
                                  }
                                  selected
                                >
                                  DPM
                                </option>

                                <option
                                  defaultValue={
                                    UpdateDataFound.PROCUREMENT_TYPE == "RFQ"
                                  }
                                  selected
                                >
                                  RFQ
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Update</span>
                            </button>
                            <button
                              type="button"
                              class="Button_Danger1"
                              data-dismiss="modal"
                            >
                              <span> Close</span>
                            </button>
                          </div>
                        </form>
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

export default Create_Vendor;
