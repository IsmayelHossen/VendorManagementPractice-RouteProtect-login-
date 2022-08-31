/**
 * Vendor Add Information component
 */
import React, { lazy, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

/**
 * for paginationn and data table
 */

/**
 * for paginationn and data table end
 */

import swal from "sweetalert";
import "../../../index.css";
import "../Vendor/vendor.css";
import { PUBLIC_URL, API_URL, ThemeContext } from "../Vendor/CommonUrlApi";
import VendorEdit from "./VendorEdit";
import JoditEditor from "jodit-react";
import { Markup } from "interweave";
import {
  GetVendor_individualData_update,
  VendorDetailsData,
  VendorInfoData,
} from "../Vendor/ApiCall";
import { useRef } from "react";
import { Suspense } from "react";
import { useContext } from "react";

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

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const params = useParams();
  const [progress, setProgress] = useState();
  const vendor_id = params.id;
  const [progressbarS, setProgressbarS] = useState(false);
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

  //branch get data

  const VendorBranch = async () => {
    await axios
      .get(`${API_URL}/vendor/branch/get1`, {
        headers: {
          vendor_id: vendor_id,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        //  const result =res.data.data.filter(
        //   (id) => (id.VENDOR_ID <= vendor_id) & (id.ID >= vendor_id)
        // );

        setvendorBranch(res.data.data);
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, [branch]);

  const onSubmit = (data) => {
    console.log(data.contact_file);
    const formdata = new FormData();
    //  const date1=data.date
    //  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //  var today  = new Date();

    //  console.log(today.toLocaleDateString("Asia/Dhaka")); // 9/17/2016
    if (data.contact_file.length > 0) {
      for (let i = 0; i < data.contact_file.length; i++) {
        formdata.append("pdf", data.contact_file[i]);
      }
    }

    if (data.noa_file.length > 0) {
      for (let j = 0; j < data.noa_file.length; j++) {
        formdata.append("img", data.noa_file[j]);
      }
    }

    // formdata.append("img", data.noa_file[0]);
    // formdata.append("pdf", data.contact_file[0]);
    formdata.append("branch", address[0].BRANCH_NAME);
    formdata.append("address", address[0].ADDRESS);
    formdata.append("vendor_id", vendor_id);
    formdata.append("date", data.date);
    formdata.append("dlp", data.dlp);
    formdata.append("memo_no", data.memo_no);
    formdata.append("noa_acceptor", data.noa_acceptor);
    formdata.append("noa_cc", data.noa_cc);
    formdata.append("payment_status", data.payment_status);
    formdata.append("performance_status", data.performance_status);
    formdata.append("product_details", content);
    formdata.append("remark", data.remark);
    formdata.append("tender_date", data.tender_date);
    formdata.append("total_amount", data.total_amount);
    formdata.append("working_typpe", data.working_typpe);

    console.log(data);

    axios
      .post(`${API_URL}/vendor_file/add_vendor/details`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          setProgressbarS(true);
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status == 400) {
          swal({
            title: response.data.message,
            icon: "error",
            button: "Ok!",
          });
        } else {
          Vendordetails();
          console.log(response);
          window.$("#exampleModal").modal("hide");
        }
      });

    console.log(data);
  };

  //edit vendor data

  const EditvendorDetails = async (data) => {
    // setIndividual_data(id);
    // const response = await GetVendor_individualData_update(id);

    console.log(data);

    const result = Details.filter((id) => id.ID == data);

    // setupdateFilteringdata(result[0]);
    console.log(result[0]);
    setUpdateDataFound(result[0]);
    // console.log(response.data[0]);
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
    console.log(id);
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${API_URL}/vendor/vendor_details_delete/${id}`)
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
  // const columns = [
  //   {
  //     title: "Branch",
  //     width: 10,
  //     dataIndex: "BRANCH",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "ADDRESS",
  //   },
  //   {
  //     title: "Works Name",
  //     width: 20,
  //     fixied: "right",
  //     dataIndex: "WORKING_TYPE",
  //   },

  //   {
  //     title: "Memo No",
  //     dataIndex: "MEMO_NO",
  //   },
  //   {
  //     title: "Contract Amount",
  //     dataIndex: "TOTAL_AMOUNT",
  //   },
  //   {
  //     title: "Payment Status",
  //     dataIndex: "PAYMENT_STATUS",
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "DATE1",
  //   },
  //   {
  //     title: "Tender Date",
  //     dataIndex: "TENDER_DATE",
  //   },

  //   {
  //     title: "Contract File",
  //     render: (text, record) => (
  //       <>
  //         <a href={`http://localhost:4328/uploads/${record.CONTACT_FILE}`}>
  //           <span class="fa fa-download"></span>
  //         </a>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "NOA File",
  //     render: (text, record) => (
  //       <>
  //         <a href={`http://localhost:4328/uploads/${record.NOA_FILE}`}>
  //           <span class="fa fa-download"></span>
  //         </a>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "DLP",
  //     dataIndex: "DLP",
  //   },
  //   {
  //     title: "Performance Security",
  //     dataIndex: "PERFORMANCE_SECURITY",
  //   },
  //   {
  //     title: "NOA Acceptor",
  //     dataIndex: "NOA_ACCEPTOR",
  //   },
  //   {
  //     title: "NOA CC",
  //     dataIndex: "NOA_CC",
  //   },
  //   {
  //     title: "Vendor info entry name",
  //     dataIndex: "VENDOR_ENTRY_ID",
  //   },
  //   {
  //     title: "Store Acceptor Name",
  //     dataIndex: "STORE_ACCEPTOR_ID",
  //   },

  //   {
  //     title: "Product Details",
  //     width: 4,
  //     render: (text, record) => (
  //       <div style={{ width: "" }}>
  //         <Markup content={record.PRODUCT_DETAILS} />
  //       </div>
  //     ),
  //   },

  //   {
  //     title: "Remarks",
  //     dataIndex: "REMARKS",
  //   },
  //   {
  //     title: "Status",
  //     render: (text, record) => (
  //       <p>
  //         {record.STATUS == 1 ? (
  //           <strong style={{ color: "green" }}>Sent</strong>
  //         ) : (
  //           <strong style={{ color: "#c84557" }}>Received</strong>
  //         )}
  //       </p>
  //     ),
  //   },

  //   {
  //     title: "Action",
  //     render: (text, record) => (
  //       <div className="dropdown dropdown-action text-right">
  //         <a
  //           href="#"
  //           className="action-icon dropdown-toggle"
  //           data-toggle="dropdown"
  //           aria-expanded="false"
  //         >
  //           <i className="material-icons">more_vert</i>
  //         </a>
  //         <div className="dropdown-menu dropdown-menu-right">
  //           <Link
  //             className="dropdown-item "
  //             to={`/vendor/view_vendor_noadetails/${record.ID}/${vendor_id}`}
  //             //  href="#"
  //             //  data-toggle="modal"
  //             //  data-target="#viewDetails"
  //             //  onClick={() => {
  //             //    View_vendorDetails(record.ID);
  //             //  }}
  //           >
  //             <i className="fa fa-eye m-r-5" /> Details
  //           </Link>
  //           <a
  //             className="dropdown-item "
  //             href="#"
  //             data-toggle="modal"
  //             data-target="#update_vendor_deails"
  //             onClick={() => {
  //               EditvendorDetails(record.ID);
  //             }}
  //           >
  //             <i className="fa fa-pencil m-r-5" /> Edit
  //           </a>
  //           <a
  //             className="dropdown-item"
  //             href="#"
  //             onClick={() => {
  //               DeleteIndividual_vendor(record.ID);
  //             }}
  //           >
  //             <i className="fa fa-trash-o m-r-5" /> Delete
  //           </a>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];
  //contract file view

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
          {!Loadder && (
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="mb-2 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span> Select
                                  Branch
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    class="form-select Vendor-form-control"
                                    {...register("branch", {
                                      onChange: (e) =>
                                        setSelectBranch(e.target.value),
                                      required: true,
                                    })}
                                  >
                                    <option value="">Branch Select</option>
                                    {vendorBranch != null &&
                                      vendorBranch.map((row, index) => (
                                        <option value={row.ID}>
                                          {row.BRANCH_NAME}{" "}
                                        </option>
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
                                  <span style={{ color: "red" }}>*</span>{" "}
                                  Address
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    class="form-select Vendor-form-control"
                                    {...register("address", {
                                      onChange: (e) =>
                                        setAddress1(e.target.value),
                                      required: true,
                                    })}
                                  >
                                    <option value="">Select Address</option>
                                    {address != null &&
                                      address.map((row, index) => (
                                        <option value={row.ADDRESS}>
                                          {row.ADDRESS}{" "}
                                        </option>
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
                                  <span style={{ color: "red" }}>*</span> Works
                                  Name
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control Vendor-form-control"
                                    placeholder="Like Product supply and maintenance..."
                                    id="validationDefault01"
                                    {...register("working_typpe", {
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
                                  <span style={{ color: "red" }}>*</span> Memo
                                  No
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control Vendor-form-control"
                                    placeholder="Memo No"
                                    id="validationDefault01"
                                    {...register("memo_no", {
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
                                  <span style={{ color: "red" }}>*</span> Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="date"
                                    class="form-control Vendor-form-control"
                                    placeholder=""
                                    id="validationDefault01"
                                    {...register("date", {
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
                                  <span style={{ color: "red" }}>*</span> Tender
                                  Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="date"
                                    class="form-control Vendor-form-control"
                                    placeholder=""
                                    id="validationDefault01"
                                    {...register("tender_date", {
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
                                  <span style={{ color: "red" }}>*</span> Total
                                  Amount
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control Vendor-form-control"
                                    placeholder="Total Amount"
                                    id="validationDefault01"
                                    {...register("total_amount", {
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
                                  <span style={{ color: "red" }}>*</span>{" "}
                                  Payment Status
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control Vendor-form-control"
                                    placeholder="Payment Status"
                                    id="validationDefault01"
                                    {...register("payment_status", {
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
                                  <span style={{ color: "red" }}>*</span> Upload
                                  Contact File
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="file"
                                    class="form-control Vendor-form-control"
                                    placeholder="Contact Fiile"
                                    id="validationDefault01"
                                    {...register("contact_file", {
                                      required: true,
                                    })}
                                    multiple
                                  />
                                </div>
                              </div>
                              <div className="mb-2 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span> Upload
                                  NOA File
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="file"
                                    class="form-control Vendor-form-control"
                                    placeholder="NOA File"
                                    id="validationDefault01"
                                    {...register("noa_file", {
                                      required: true,
                                    })}
                                    multiple
                                  />
                                </div>
                              </div>
                              <div className="mb-2 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span> DLP
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control Vendor-form-control"
                                    placeholder="DLP"
                                    id="validationDefault01"
                                    {...register("dlp", {
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
                                  <span style={{ color: "red" }}>*</span>{" "}
                                  Performance Security
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control Vendor-form-control"
                                    placeholder="Performance Security"
                                    id="validationDefault01"
                                    {...register("performance_status", {
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
                                  <span style={{ color: "red" }}>*</span> NOA
                                  Acceptor
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control Vendor-form-control"
                                    placeholder="NOA Acceptor"
                                    id="validationDefault01"
                                    {...register("noa_acceptor", {
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
                                  <span style={{ color: "red" }}>*</span> NOA CC
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control Vendor-form-control"
                                    placeholder="NOA CC"
                                    id="validationDefault01"
                                    {...register("noa_cc", {
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
                                  <span style={{ color: "red" }}>*</span>{" "}
                                  Details(Products/Services)
                                </label>
                                <div className="col-sm-8">
                                  {/* <textarea class="form-control" rows="3"   {...register("product_details", {
                                   required: true,
                                 })}></textarea>
                               */}
                                  <JoditEditor
                                    ref={editor}
                                    value={content}
                                    textIcons={false}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={(newContent) =>
                                      setContent(newContent)
                                    }
                                    // onChange={newContent => {}}
                                  />
                                </div>
                              </div>
                              <div className="mb-2 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span> Remark
                                </label>
                                <div className="col-sm-8">
                                  <textarea
                                    class="form-control"
                                    rows="2"
                                    {...register("remark", {
                                      required: true,
                                    })}
                                  ></textarea>
                                </div>
                              </div>
                              {progressbarS && (
                                <div class="progress mb-2">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${progress}%` }}
                                  >
                                    {progress}%
                                  </div>
                                </div>
                              )}

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
                            <span class="sr-only">Loading.nnnn..</span>
                          </p>
                        </>
                      )}
                      {DataLoader && (
                        <div class="table-responsive">
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th>SI</th>
                                <th>Branch</th>
                                <th>Address</th>
                                <th>Works Name</th>
                                <th>Memo No</th>
                                <th>Contract Amount</th>
                                <th>Payment Status</th>
                                <th>Date</th>
                                <th>Tender Date</th>
                                <th>Contract File</th>
                                <th>NOA File</th>
                                <th>DLP</th>
                                <th>Performance Security</th>
                                <th>NOA Acceptor</th>
                                <th>NOA CC</th>
                                <th>Vendor info entry name</th>
                                <th>Store Acceptor Name</th>
                                <th>Product Details</th>
                                <th>Remarks</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Details.map((row, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{row.BRANCH}</td>
                                  <td>{row.ADDRESS}</td>
                                  <td>{row.WORKING_TYPE}</td>
                                  <td>{row.MEMO_NO}</td>
                                  <td>{row.TOTAL_AMOUNT}</td>
                                  <td>{row.PAYMENT_STATUS}</td>
                                  <td>
                                    {new Date(row.DATE1).getDate() +
                                      "-" +
                                      new Date(row.DATE1).getMonth() +
                                      "-" +
                                      new Date(row.DATE1).getFullYear()}
                                  </td>
                                  <td>
                                    {new Date(row.TENDER_DATE).getDate() +
                                      "-" +
                                      new Date(row.TENDER_DATE).getMonth() +
                                      "-" +
                                      new Date(row.TENDER_DATE).getFullYear()}
                                  </td>
                                  <td>
                                    <Link
                                      to={`/vendor/ViewFileData/${vendor_id}/${row.ID}/contract File`}
                                    >
                                      <span
                                        class=" text-center text-success fa fa-eye"
                                        style={{ fontSize: "25px" }}
                                      ></span>
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/vendor/ViewFileData/${vendor_id}/${row.ID}/Noa File`}
                                    >
                                      <span
                                        class="text-center font-size-20 fa fa-eye"
                                        style={{ fontSize: "25px" }}
                                      ></span>
                                    </Link>
                                  </td>
                                  <td>{row.DLP}</td>
                                  <td>{row.PERFORMANCE_SECURITY}</td>
                                  <td>{row.NOA_ACCEPTOR}</td>
                                  <td>{row.NOA_CC}</td>
                                  <td>{row.VENDOR_ENTRY_ID}</td>
                                  <td>{row.STORE_ACCEPTOR_ID}</td>
                                  <td>
                                    {" "}
                                    <Markup content={row.PRODUCT_DETAILS} />
                                  </td>
                                  <td>{row.REMARKS}</td>
                                  <td>
                                    {" "}
                                    <p>
                                      {row.STATUS == 1 ? (
                                        <strong style={{ color: "green" }}>
                                          Sent
                                        </strong>
                                      ) : (
                                        <strong style={{ color: "#c84557" }}>
                                          Received
                                        </strong>
                                      )}
                                    </p>
                                  </td>
                                  <td>
                                    {" "}
                                    <div className="dropdown dropdown-action text-right">
                                      <a
                                        href="#"
                                        className="action-icon dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">
                                          more_vert
                                        </i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          className="dropdown-item "
                                          to={`/vendor/view_vendor_noadetails/${row.ID}/${vendor_id}`}
                                          //  href="#"
                                          //  data-toggle="modal"
                                          //  data-target="#viewDetails"
                                          //  onClick={() => {
                                          //    View_vendorDetails(record.ID);
                                          //  }}
                                        >
                                          <i className="fa fa-eye m-r-5" />{" "}
                                          Details
                                        </Link>
                                        <a
                                          className="dropdown-item "
                                          href="#"
                                          data-toggle="modal"
                                          data-target="#update_vendor_deails"
                                          onClick={() => {
                                            EditvendorDetails(row.ID);
                                          }}
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          Edit
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => {
                                            DeleteIndividual_vendor(row.ID);
                                          }}
                                        >
                                          <i className="fa fa-trash-o m-r-5" />{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* update vendor modal start */}

                  <div
                    class="modal custom-modal fade "
                    id="update_vendor_deails"
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
                            Details
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
                                  Agreement Type Institution
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    class="form-select Vendor-form-control"
                                    {...register1("agreement_type", {
                                      required: true,
                                    })}
                                  >
                                    <option>Branch </option>
                                    {vendorBranch.map((row, index) => (
                                      <>
                                        {row.BRANCH_NAME ==
                                        UpdateDataFound.BRANCH ? (
                                          <option
                                            defaultValue={
                                              UpdateDataFound.BRANCH
                                            }
                                            selected
                                          >
                                            {UpdateDataFound.BRANCH}{" "}
                                          </option>
                                        ) : (
                                          <option
                                            defaultValue={row.BRANCH_NAME}
                                          >
                                            {row.BRANCH_NAME}
                                          </option>
                                        )}
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
                                        UpdateDataFound.CATEGORY_TYPE ==
                                        "Supplier"
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
                                  <span style={{ color: "red" }}>*</span>
                                  Procurement Type
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
                                        UpdateDataFound.PROCUREMENT_TYPE ==
                                        "DPM"
                                      }
                                      selected
                                    >
                                      DPM
                                    </option>

                                    <option
                                      defaultValue={
                                        UpdateDataFound.PROCUREMENT_TYPE ==
                                        "RFQ"
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
            </>
          )}
        </div>

        {/* /Page Content */}
      </div>
    </>
  );
};

export default Vendor_Details;
