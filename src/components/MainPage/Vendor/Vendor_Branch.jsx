/**
 * Vendor Add Information component
 */
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";

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
import { ThemeContext } from "../Vendor/CommonUrlApi";

const Vendor_Branch = () => {
  const [Loadder, setLoadder] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [search_vendor_data, setsearch_vendor_data] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [getFileupload, setgetFileupload] = useState([]);
  const [vendorBranch, setvendorBranch] = useState([]);
  useEffect(() => {
    document.title = "Vendor Add form";
    // document.getElementById("hddd").innerHTML = "";
    VendorInfo();
    VendorBranch();
    // getfromLaravel();
  }, []);

  const VendorBranch = async () => {
    await axios
      .get(`${API_URL}/vendor/branch/get`)
      .then((res) => {
        setvendorBranch(res.data.data);
        setLoadder(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    const data1 = JSON.stringify(data);
    console.log(data1);
    axios
      .post(`${API_URL}/vendor/branch/add`, data1, {
        headers: {
          "Content-Type": "application/json",
          name: "ismayel56777",
          Email: "ismayelhossen123@gmail.com",
        },
      })
      .then((response) => {
        if (response.data.success) {
          VendorBranch();
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

  const EditBranch_data = async (data) => {
    // setIndividual_data(id);
    // const response = await GetVendor_individualData_update(id);

    console.log(data);

    const result = vendorBranch.filter((id) => id.ID == data);
    // setupdateFilteringdata(result[0]);
    console.log(result[0]);
    setUpdateDataFound(result[0]);
    // console.log(response.data[0]);

    console.log(UpdateDataFound);
  };
  const onSubmitUpdate = async (data) => {
    console.log(data);
    if (data.branch_name == "") {
      data.branch_name = UpdateDataFound.BRANCH_NAME;
    }

    if (data.address == "") {
      data.address = UpdateDataFound.ADDRESS;
    }

    console.log(data);
    if (data) {
      let id = UpdateDataFound.ID;
      const updateResult = await axios
        .put(`${API_URL}/vendor/branch/update/${id}`, data)
        .then((response) => {
          if (response.data.success) {
            VendorBranch();
            swal({
              title: "Updated Successfully!",
              icon: "success",
              button: "Ok!",
            });
            reset1();
            window.$("#vendor_update_branch").modal("hide");
          }
        })

        .catch((error) => {
          console.log(error);
          console.log(data);
        });
    }

    // console.log(UpdateDataFound);
  };

  const Delete_vendor_branch = (id) => {
    console.log(id);
    setvendorDeleteId(id);

    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${API_URL}/vendor/branch_vendor_delete/${id}`)
          .then((response) => {
            if (response.data.success) {
              VendorBranch();
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
      VendorBranch();
    } else {
      const WithOutSpaciallChar = search_vendor_data
        .toLowerCase()
        // .replace(/\//g, "")
        // .replace(/ /g, "")
        // .replace(/[^\w\s]/gi, "");
        .replace(/[^\w]/gi, "");
      if (WithOutSpaciallChar != "") {
        axios
          .get(`${API_URL}/vendor/Vendor_branch_search/${WithOutSpaciallChar}`)
          .then((response) => {
            console.log(response);
            setvendorBranch(response.data);
            //  setVendorInfo(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [search_vendor_data]);

  //table
  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "VENDOR_NAME",
    },
    {
      title: "Branch Name",
      dataIndex: "BRANCH_NAME",
    },

    {
      title: "Address",
      dataIndex: "ADDRESS",
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
              data-target="#vendor_update_branch"
              onClick={() => {
                EditBranch_data(record.ID);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                Delete_vendor_branch(record.ID);
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
  const { count } = useContext(ThemeContext);

  return (
    <>
      {console.log("render 1st")}
      {/* <ThemeContext.Consumer> */}
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
                  Add Vendor Branch
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
                  <i class="fa fa-plus"></i> <span>Add Vendor Branch</span>
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
                        <i class="fa fa-plus"></i> Add Vendor Branch{" "}
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
                              <span style={{ color: "red" }}>*</span> Select
                              Vendor
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select Vendor-form-control"
                                {...register("vendor_id", {
                                  required: true,
                                })}
                              >
                                <option value="">Vendor Select</option>
                                {Vendor_Info.map((row, index) => (
                                  <>
                                    <option value={row.ID}>
                                      {row.VENDOR_NAME}
                                    </option>
                                  </>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Branch
                              Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control Vendor-form-control"
                                placeholder="Branch Name"
                                id="validationDefault01"
                                {...register("branch_name", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Address
                            </label>
                            <div className="col-sm-8">
                              <textarea
                                rows="3"
                                placeholder="Address"
                                class="form-control Vendor-form-control"
                                {...register("address", {
                                  required: true,
                                })}
                              ></textarea>
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
                  {Loadder && (
                    <>
                      <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4" style={{ marginTop: "8em" }}>
                          <div
                            class="spinner-border text-warning"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                        <div class="col-md-4"></div>
                      </div>
                    </>
                  )}
                  {!Loadder && (
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: vendorBranch.length,
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
                          vendorBranch.length > 0 ? vendorBranch : null
                        }
                        rowKey={(record) => record.id}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update_branch"
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
                        Branch
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
                              <span style={{ color: "red" }}>*</span> Branch
                              Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control Vendor-form-control"
                                placeholder="Branch Name"
                                defaultValue={UpdateDataFound.BRANCH_NAME}
                                {...register1("branch_name")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Address
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control Vendor-form-control"
                                placeholder="Branch Name"
                                defaultValue={UpdateDataFound.ADDRESS}
                                {...register1("address")}
                              />
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
      {/* </ThemeContext.Consumer> */}
    </>
  );
};

export default Vendor_Branch;
