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
        console.log(response.data);
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
                        {fileData.map((row, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{row.FILENAME}</td>
                            <td>
                              {row.FILESIZE / 1024 > 1024
                                ? (row.FILESIZE / 1024 / 1024).toPrecision(4) +
                                  " Mb"
                                : (row.FILESIZE / 1024).toPrecision(4) + " Kb"}
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
                              <button class="btn btn-primary mr-2 mb-1">
                                <span class="fa fa-pencil"></span>
                              </button>
                              <button
                                class="btn btn-danger "
                                onClick={() => DeleteFile(row.ID, row.FILENAME)}
                              >
                                <span class="fa fa-trash"></span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
