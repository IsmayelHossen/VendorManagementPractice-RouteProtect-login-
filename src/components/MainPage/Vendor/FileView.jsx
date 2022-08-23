import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { VendorDetailsData, VendorInfoData } from "./ApiCall";
import { API_URL } from "./CommonUrlApi";

export default function FileView() {
  const param = useParams();
  const [fileData, setfileData] = useState([]);
  const navigate = useNavigate();
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [Details, setDetails] = useState([]);
  const vendor_id = param.vendor_id;
  const Id = param.id;

  //secific vendor info data
  useEffect(() => {
    document.title = "Vendor Add form";
    VendorInfo();
    Vendordetails();
  }, []);
  const VendorInfo = async () => {
    try {
      const reponse = await VendorInfoData();
      if (reponse) {
        setVendorInfo(reponse.data);

        console.log(reponse.data);
      }

      // console.log(Vendor_Info);
    } catch (error) {
      console.log(error);
    }
  };
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
  return (
    <div>
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
                  {param.filename}
                  <button
                    class="btn btn-success float-right"
                    onClick={() => navigate(-1)}
                  >
                    {" "}
                    back
                  </button>
                </h4>
                {Vendor_Info.filter((data) => data.ID == vendor_id).map(
                  (row) => (
                    <>
                      <p>
                        {row.VENDOR_NAME}({row.CATEGORY_TYPE})
                      </p>
                    </>
                  )
                )}

                {/* from details table */}
                {Details.filter((data) => data.ID == Id).map((row) => (
                  <>
                    <p>
                      Date:
                      {row.DATE1}
                      <br></br>
                      Memo:
                      {row.MEMO_NO}
                    </p>
                  </>
                ))}
              </div>
              {/* header */}
            </div>
            <div class="card-body1">
              {/* /Page Header */}

              {/* table start */}
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive mt-2">
                    <iframe
                      src={`http://localhost:4328/uploads/${param.filename}`}
                      className="iframe-pdf"
                    >
                      {" "}
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* /Page Content */}
      </div>
    </div>
  );
}
