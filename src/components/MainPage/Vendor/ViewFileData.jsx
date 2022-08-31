import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { VendorDetailsData, VendorInfoData } from "./ApiCall";
import { API_URL } from "./CommonUrlApi";

export default function ViewFileData() {
  const [fileData, setfileData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [Details, setDetails] = useState([]);
  const [Loadder, setLoadder] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  const vendor_id = param.vendor_id;
  const Id = param.id;
  useEffect(() => {
    getFileData();
  }, []);

  const getFileData = async () => {
    axios
      .get(`${API_URL}/vendor/viewfileData/${param.id}/${param.type}`)
      .then((response) => {
        setfileData(response.data.data);
        setLoadder(false);
      });
  };

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
  const DeleteFile = (id, filename) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${API_URL}/vendor/file_delete/${id}/${filename}`)
          .then((response) => {
            if (response.data.success) {
              getFileData();
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
                  {param.type}
                  {/* <button
                    class="btn btn-success float-right"
                    onClick={() => navigate(-1)}
                  >
                    {" "}
                    back
                  </button> */}
                </h4>
                <div class="d-flex justify-content-between">
                  <div>
                    {Vendor_Info.filter((data) => data.ID == vendor_id).map(
                      (row) => (
                        <>
                          <p style={{ marginBottom: "0px" }}>
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
                          {new Date(row.DATE1).getDate() +
                            "-" +
                            new Date(row.DATE1).getMonth() +
                            "-" +
                            new Date(row.DATE1).getFullYear()}
                          <br></br>
                          Memo:
                          {row.MEMO_NO}
                        </p>
                      </>
                    ))}
                  </div>
                  <div>
                    <button class="btn btn-primary">Add more File</button>
                  </div>
                </div>
              </div>
              {/* header */}
            </div>
            <div class="card-body1">
              {/* /Page Header */}

              {/* table start */}
              {Loadder && (
                <>
                  <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4 ">
                      <div class="d-flex justify-content-center">
                        <div
                          class="spinner-border mt-5 text-warning"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4"></div>
                  </div>
                </>
              )}
              <div className="row">
                <div className="col-md-12">
                  {!Loadder && (
                    <div className="table-responsive ">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>SI</th>
                            <th>File Name</th>
                            <th>Size</th>
                            <th>Download</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {fileData.map((row, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{row.FILENAME}</td>
                                <td>
                                  {row.FILESIZE / 1024 > 1024
                                    ? (row.FILESIZE / 1024 / 1024).toPrecision(
                                        4
                                      ) + " Mb"
                                    : (row.FILESIZE / 1024).toPrecision(4) +
                                      " Kb"}
                                </td>
                                <td>
                                  <Link
                                    class="btn btn-success"
                                    to={`/vendor/FileView/${vendor_id}/${Id}/${row.FILENAME}`}
                                  >
                                    <span class="fa fa-download"></span>
                                  </Link>
                                </td>
                                <td>
                                  <button
                                    class="btn btn-danger "
                                    onClick={() =>
                                      DeleteFile(row.ID, row.FILENAME)
                                    }
                                  >
                                    <span class="fa fa-trash"></span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        </tbody>
                      </table>
                    </div>
                  )}
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
