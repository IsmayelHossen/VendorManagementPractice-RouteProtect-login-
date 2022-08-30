/**
 * Vendor Add Information component
 */
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

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
import { Markup } from "interweave";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import {
  GetVendor_individualData_update,
  VendorDetailsData,
  VendorInfoData,
} from "../Vendor/ApiCall";

const ViewNoa_details = () => {
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
  const [viewDetails, setviewDetails] = useState({});
  const params = useParams();
  const vendor_id = params.vendor_id;
  const id12 = params.id;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
    console.log(id12);
    try {
      const reponse = await VendorDetailsData(vendor_id);
      console.log(reponse.data.data);
      const view_noa = reponse.data.data.filter((id) => id.ID == id12);
      console.log(view_noa[0]);
      setDetails(reponse.data.data);
      setviewDetails(view_noa[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //branch get data

  //  useEffect(()=>{
  //     console.log(Details);
  //     console.log(id);
  //     const view_noa =Details.filter(
  //         (id) => (id.ID <=id) & (id.ID >=id)

  //       );
  //       console.log(view_noa);
  //     //  setviewDetails(view_noa[0]);
  //  },[])

  return (
    <>
      <Helmet>
        <title>Dashboard - BBA STORE</title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div>
          <div className="content container-fluid" ref={componentRef}>
            {/* Page Header */}

            <div class="viewNoa_details_head">
              <div class="mt-2">
                <div class="row">
                  <div class="col-md-9">
                    <h4>Government of the People's Republic of Bangladesh</h4>
                    <h5>Ministry of Road Transport & Bridges</h5>
                    <h6>Bangladesh Bridge Authority</h6>
                    <h6>Setu Bhaban,New Airport Road,Banani,Dhaka</h6>
                    <h6>
                      <a href="http://bba.gov.bd/" target="_blank">
                        www.bba.gov.bd
                      </a>
                    </h6>
                  </div>
                  <div class="col-md-3">
                    <button
                      onClick={handlePrint}
                      id="noprint_btn"
                      class="btn btn-primary float-right clearfix mb-3"
                    >
                      Print this out!
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="table-responsive1">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td style={{ width: "24%" }}>
                      Vendor Name:{" "}
                      {SpecificVendor == undefined
                        ? vendor_id
                        : SpecificVendor.VENDOR_NAME}
                    </td>
                    <td style={{ width: "24%" }}>
                      Category:
                      {SpecificVendor == undefined
                        ? ""
                        : SpecificVendor.CATEGORY_TYPE}
                    </td>
                    <td style={{ width: "24%" }}>
                      {" "}
                      Branch: {viewDetails.BRANCH}{" "}
                    </td>
                    <td style={{ width: "24%" }}>
                      {" "}
                      Address: {viewDetails.ADDRESS}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <p>Date: {viewDetails.DATE1}</p>
                      <p>Tender Date: {viewDetails.TENDER_DATE}</p>
                      <p>Memo NO:{viewDetails.MEMO_NO}</p>
                      <p>Contract Amount:{viewDetails.TOTAL_AMOUNT}</p>
                      <p>
                        Product Details{" "}
                        <Markup content={viewDetails.PRODUCT_DETAILS} />{" "}
                      </p>
                      <p>DLP: {viewDetails.DLP}</p>
                    </td>
                    <td colSpan={2}>
                      <p>Financial Year: {viewDetails.FINANCIAL_YEAR}</p>
                      <p>Payment Status: {viewDetails.PAYMENT_STATUS} </p>

                      <p>
                        Performance Security: {viewDetails.PERFORMANCE_SECURITY}
                      </p>
                      <p>Remark: {viewDetails.REMARKS} </p>

                      <p>Working Type: {viewDetails.WORKING_TYPE}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <p> NOA Acceptor: {viewDetails.NOA_ACCEPTOR}</p>
                      <p>NOA CC:{viewDetails.NOA_CC}</p>
                      <p>Store Acceptor:{viewDetails.STORE_ACCEPTOR_ID}</p>
                      <p>
                        Vendor Entry Designation:{" "}
                        {viewDetails.VENDOR_ENTRY_DESIGNATION}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* /Page Content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNoa_details;
