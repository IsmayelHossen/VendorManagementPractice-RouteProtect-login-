/**
 * Vendor Add Information component
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
  VendorDetailsData,
  VendorInfoData,
} from "../Vendor/ApiCall";

const Vendor_Details = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [search_vendor_data, setsearch_vendor_data] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [getFileupload, setgetFileupload] = useState([]);
  const [SpecificVendor, setSpecificVendor] = useState({});
  const [vendorBranch, setvendorBranch] = useState([]);
  const [Details, setDetails] = useState([]);
  const [branch, setSelectBranch] = useState("");
  const [address, setAddress] = useState([]);
  const [address1, setAddress1] = useState("");
  const [Loadder, setLoadder] = useState(false);
  const [viewDetails, setviewDetails] = useState([]);
  const params = useParams();
  const vendor_id = params.id;
  const [userInfo, setuserInfo] = useState({
    file: [],
    file2: [],
    filepreview: null,
    filepreview2: null,
    name: "",
    email: "",
  });

  useEffect(() => {
    document.title = "Vendor Add form";
    // document.getElementById("hddd").innerHTML = "";

    VendorInfo();
    VendorBranch();
    Vendordetails();
    // getfromLaravel();
    // url wise specific vendor
  }, []);
  const VendorInfo = async () => {
    try {
      const reponse = await VendorInfoData();
      if (reponse) {
        setLoadder(true);
        setVendorInfo(reponse.data);

        console.log("hi" + reponse);
      }

      // console.log(Vendor_Info);
    } catch (error) {
      console.log(error);
    }
  };
  //specific vendor info
  useEffect(() => {
    const specific_vendor = Vendor_Info.filter(
      (id) => (id.ID <= vendor_id) & (id.ID >= vendor_id)
    );
    console.log(specific_vendor[0]);
    setSpecificVendor(specific_vendor[0]);
  }, [Vendor_Info]);
  const Vendordetails = async () => {
    try {
      const reponse = await VendorDetailsData(vendor_id);
      console.log(reponse.data.data);
      setDetails(reponse.data.data);
      // console.log(Vendor_Info);
    } catch (error) {
      console.log(error);
    }
  };

  // submit for store vendor  data info
  // set branch && get branch address
  useEffect(() => {
    console.log(branch);
    if (branch) {
      const result = vendorBranch.filter(
        (id) => (id.ID <= branch) & (id.ID >= branch)
      );

      setAddress(result);
      console.log(result);
    }

    // if(result){
    //   setSelectBranch(result[0].BRANCH_NAME);
    // }
  }, [branch]);
  //on submit send data
  //  const submit = async(e) => {
  //  e.preventDefault();
  //   //  data.contact_file=data.contact_file[0];
  //   //  data.noa_file=data.noa_file[0];
  //   //  data.vendor_id=vendor_id;

  // const vendor_id=23;
  //   const formdata = new FormData();
  //   formdata.append("img",vendor_id);

  //    axios
  //      .post(`${API_URL}/vendor/add_vendor/details`, formdata, {
  //       headers: { "Content-Type": "multipart/form-data" },

  //     })
  //      .then((response) => {
  //        if (response.data.success) {
  //         Vendordetails();
  //          window.$("#exampleModal").modal("hide");
  //        }
  //      })
  //      .catch((error) => {
  //        console.log(error);
  //      });

  //  };

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],

      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleInputChange3 = (event) => {
    setuserInfo({
      ...userInfo,
      file2: event.target.files[0],

      filepreview2: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleInputChange1 = (event) => {
    setuserInfo({
      ...userInfo,
      name: event.target.value,
    });
  };
  const handleInputChange2 = (event) => {
    setuserInfo({
      ...userInfo,
      email: event.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    const formdata = new FormData();

    formdata.append("pdf", userInfo.file2);
    formdata.append("name", userInfo.name);
    formdata.append("email", userInfo.email);

    axios
      .post("http://localhost:4328/vendor_file/add_vendor/details", formdata, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          // setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((res) => {
        // then print response status
        console.log(res.data);
        if (res.data.error) {
          swal({
            title: `${res.data.error}`,
            icon: "error",
            button: "Ok!",
          });
        } else {
          console.log(res.data);
          swal({
            title: `${res.data.message}`,
            icon: "success",
            button: "Ok!",
          });
        }
      });
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
  //view vendor individual noa data
  const View_vendorDetails = (id) => {
    console.log(id);

    const result = Details.filter((data) => (data.ID <= id) & (data.ID >= id));

    result[0].VENDOR_NAME = SpecificVendor.VENDOR_NAME;
    result[0].CATEGORY_TYPE = SpecificVendor.CATEGORY_TYPE;

    console.log(result[0]);
    setviewDetails(result[0]);
  };

  //branch get data

  const VendorBranch = async () => {
    await axios
      .get(`${API_URL}/vendor/branch/get`)
      .then((res) => {
        console.log(res.data.data);
        const result = res.data.data.filter(
          (id) => (id.VENDOR_ID <= vendor_id) & (id.ID >= vendor_id)
        );
        setvendorBranch(result);
      })
      .catch((error) => {
        console.log(error);
      });
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
            Vendordetails();
            swal({
              title: "Updated Successfully!",
              icon: "success",
              button: "Ok!",
            });
            //  reset1();
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
              Vendordetails();
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
      Vendordetails();
    } else {
      const WithOutSpaciallChar = search_vendor_data
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
  const columns = [
    {
      title: "Branch",
      dataIndex: "BRANCH",
    },
    {
      title: "Address",
      dataIndex: "ADDRESS",
    },
    {
      title: "Working Type",
      dataIndex: "WORKING_TYPE",
    },

    {
      title: "Memo No",
      dataIndex: "MEMO_NO",
    },
    {
      title: "Contract Amount",
      dataIndex: "TOTAL_AMOUNT",
    },
    {
      title: "Payment Status",
      dataIndex: "PAYMENT_STATUS",
    },
    {
      title: "Date",
      dataIndex: "DATE1",
    },
    {
      title: "Tender Date",
      dataIndex: "TENDER_DATE",
    },

    {
      title: "Contact File",
      dataIndex: "CONTACT_FILE",
    },
    {
      title: "NOA File",
      dataIndex: "NOA_FILE",
    },
    {
      title: "DLP",
      dataIndex: "DLP",
    },
    {
      title: "Performance Security",
      dataIndex: "PERFORMANCE_SECURITY",
    },
    {
      title: "NOA Acceptor",
      dataIndex: "NOA_ACCEPTOR",
    },
    {
      title: "NOA CC",
      dataIndex: "NOA_CC",
    },
    {
      title: "Vendor info entry name",
      dataIndex: "VENDOR_ENTRY_ID",
    },
    {
      title: "Store Acceptor Name",
      dataIndex: "STORE_ACCEPTOR_ID",
    },

    {
      title: "Product Details",
      dataIndex: "PRODUCT_DETAILS",
    },

    {
      title: "Remarks",
      dataIndex: "REMARKS",
    },
    {
      title: "Status",
      render: (text, record) => (
        <p>
          {record.STATUS == 1 ? (
            <strong style={{ color: "green" }}>Sent</strong>
          ) : (
            <strong style={{ color: "#c84557" }}>Received</strong>
          )}
        </p>
      ),
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
              data-target="#viewDetails"
              onClick={() => {
                View_vendorDetails(record.ID);
              }}
            >
              <i className="fa fa-eye m-r-5" /> Details
            </a>
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
          {!Loadder && <>Data Loadding....</>}
          {Loadder && (
            <>
              <div class="">
                <div class="card-header1">
                  <div className="">
                    <h4
                      className="text-center mx-auto mb-3 text-uppercase fddd"
                      id="hddd"
                    >
                      Vendor Details
                    </h4>
                  </div>
                  {/* header */}

                  <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                    <div
                      class="form-group has-search"
                      style={{ marginBottom: "0px" }}
                    >
                      {/* <span class="fa fa-search form-control-feedback"></span> */}
                      {/* <input
                     type="text"
                     class="form-control"
                     value={search_vendor_data}
                     name="searchStatus"
                     placeholder="Search"
                     onChange={(e) => setsearch_vendor_data(e.target.value)}
                   /> */}
                      <h4>
                        Vendor Name:
                        {SpecificVendor == undefined
                          ? vendor_id
                          : SpecificVendor.VENDOR_NAME}
                      </h4>
                      <h5>
                        Vendor Category:
                        {SpecificVendor == undefined
                          ? ""
                          : SpecificVendor.CATEGORY_TYPE}
                      </h5>
                    </div>
                    <button
                      type="button"
                      class="Button_success float-right"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <i class="fa fa-plus"></i>{" "}
                      <span> Add Vendor Details</span>
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
                            <i class="fa fa-plus"></i> Add Vendor Details{" "}
                            {/* {
                           // document.getElementById("demo").innerHTML = host;
                           window.location.host
                         } */}
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
                            <form onSubmit={submit}>
                              <div className="formdesign">
                                <div className="form-row">
                                  <label className="">Image</label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    name="upload_file"
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="form-row">
                                  <label className="">Pdf File Upload</label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    name="upload_file2"
                                    onChange={handleInputChange3}
                                  />
                                </div>
                                <div className="form-row">
                                  <label className="">Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleInputChange1}
                                  />
                                </div>
                                <div className="form-row">
                                  <label className="">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange2}
                                  />
                                </div>

                                <div className="form-row">
                                  <button
                                    type="submit"
                                    className="btn btn-dark"
                                  >
                                    {" "}
                                    Save{" "}
                                  </button>
                                </div>
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
                              total: Details.length,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              showSizeChanger: true,
                              onShowSizeChange: onShowSizeChange,
                              itemRender: itemRender,
                            }}
                            style={{ overflowX: "auto" }}
                            columns={columns}
                            // bordered
                            dataSource={Details.length > 0 ? Details : null}
                            rowKey={(record) => record.id}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* update vendor modal start */}

                  {/* view details modal */}
                  <div
                    class="modal custom-modal fade "
                    id="viewDetails"
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
                            <i className="fa fa-eye m-r-5" /> View Details
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
                            <table class="table table-bordered">
                              <tbody>
                                <tr>
                                  <td>
                                    Vendor Name: {viewDetails.VENDOR_NAME}
                                  </td>
                                  <td>Category:{viewDetails.CATEGORY_TYPE}</td>
                                  <td> {viewDetails.BRANCH} </td>
                                  <td> {viewDetails.ADDRESS}</td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>
                                    <p>Date: {viewDetails.DATE1}</p>
                                    <p>
                                      Tender Date: {viewDetails.TENDER_DATE}
                                    </p>
                                    <p>Memo NO:{viewDetails.MEMO_NO}</p>
                                    <p>
                                      Contract Amount:{viewDetails.TOTAL_AMOUNT}
                                    </p>
                                    <p>
                                      Product Details{" "}
                                      {viewDetails.PRODUCT_DETAILS}
                                    </p>
                                    <p>DLP: {viewDetails.DLP}</p>
                                  </td>
                                  <td colSpan={2}>
                                    <p>
                                      Financial Year:{" "}
                                      {viewDetails.FINANCIAL_YEAR}
                                    </p>
                                    <p>
                                      Payment Status:{" "}
                                      {viewDetails.PAYMENT_STATUS}{" "}
                                    </p>

                                    <p>
                                      Performance Security:{" "}
                                      {viewDetails.PERFORMANCE_SECURITY}
                                    </p>
                                    <p>Remark: {viewDetails.REMARKS} </p>

                                    <p>Status: {viewDetails.STATUS}</p>
                                    <p>
                                      Working Type: {viewDetails.WORKING_TYPE}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={4}>
                                    <p>
                                      {" "}
                                      NOA Acceptor: {viewDetails.NOA_ACCEPTOR}
                                    </p>
                                    <p>NOA CC:{viewDetails.NOA_CC}</p>
                                    <p>
                                      Store Acceptor:
                                      {viewDetails.STORE_ACCEPTOR_ID}
                                    </p>
                                    <p>
                                      Vendor Entry Designation:{" "}
                                      {viewDetails.VENDOR_ENTRY_DESIGNATION}
                                    </p>
                                    <p>
                                      {" "}
                                      Contract File:{viewDetails.CONTACT_FILE}
                                    </p>
                                    <p>NOA File: {viewDetails.NOA_FILE}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* /Page Content */}
      </div>
    </>
  );
};

export default Vendor_Details;
