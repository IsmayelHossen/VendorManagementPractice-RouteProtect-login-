/**
 * Product Purchase Left Side
 */
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ServiceProviders, SearchDataFromApi } from "../Vendor/ApiCall";
import { GetIndividual_VendorActive_data } from "../Vendor/ApiCall";
import "../../../index.css";
import "../Vendor/vendor.css";
import PNRightPart from "./PNRightPart";
import { API_URL } from "./CommonUrlApi";
import Fade from "react-reveal/Fade";
import axios from "axios";
const PNLeftPart = (props) => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Provider, SetProvider] = useState([]);
  const [error, SetError] = useState(false);
  const [vendorActive, setVendorActive] = useState("");
  const [isDelete, setIsDelete] = useState(true);
  const [vendorStatus_details_open, setVendorStatus_details_open] =
    useState(false);
  const [GetVendorActiveId, setGetVendorActiveId] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [GetSearchData, setGetSearchData] = useState({});
  const [notFoundSearch, setnotFoundSearch] = useState(false);
  const [name, setName] = useState("");
  /**for primarilly get service proveder data */
  useEffect(() => {
    console.log(props.id);
    console.log(props.id4);
    GetServiceProviderData();
  }, []);
  const GetServiceProviderData = async () => {
    SetError(false);
    try {
      const response = await ServiceProviders();
      if (response) {
        SetProvider(response.data);
        // alert(JSON.stringify(response));
        setTimeout(() => {
          setDataLoader(false);
        }, 2000);
      }
    } catch (error) {
      SetError(true);
      console.log(error);
    }
  };
  /**for primarilly get service proveder data end*/
  //pass id to parent component(PurchaseNew)
  // const Vendor_status_Active = (id) => {
  //   setVendorActive(id);
  //   console.log(id);
  //   props.activeStatusDetail(id);
  // };
  const OpenActiveDetails = async (id) => {
    // alert(id);
    setGetVendorActiveId(id);
    setVendorStatus_details_open(true);
    console.log("hello");
  };
  //search functionality
  const InputHandler = async (e) => {
    e.preventDefault();
    setSearchStatus(e.target.value);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${e.target.value}`)
      .then((res) => {
        setGetSearchData(res.data);
        // GetServiceProviderData();
        setnotFoundSearch(false);
      })
      .catch((error) => {
        console.log(error);
        setnotFoundSearch(true);
      });
  };
  // useEffect(() => {
  //   const getUsers = () => {
  //     fetch(`${API_URL}/posts/${searchStatus}`)
  //       .then((res) => {
  //         // You have to send it, as I have done below
  //         if (res.status >= 400) {
  //           throw new Error("Server responds with error!");
  //         }
  //         return res.json();
  //       })
  //       .then(
  //         (vendors) => {
  //           setGetSearchData(vendors);
  //           // GetServiceProviderData();
  //           setnotFoundSearch(false);
  //         },

  //         (err) => {
  //           console.log(err);
  //           setnotFoundSearch(true);
  //         }
  //       );
  //   };
  //   getUsers();
  // }, [searchStatus]);
  //using axios
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => console.log(response.data))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  const onSubmitData = (e) => {
    e.preventDefault();
    console.log(name);
    props.onclickfunction(name);
  };
  return (
    <>
      <div className="row ">
        {DataLoader && (
          <>
            {/* DataLoader */}
            <div className="text-center">
              <p className="text-center mt-5">
                <div class="spinner-grow text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </p>
            </div>
          </>
        )}
        {DataLoader == false && (
          <>
            <div className="col-md-4 mt-2 mb-2 ">
              {/* left side option */}
              <div class="card ">
                <div
                  class="card-header text-center"
                  style={{ background: "#F7F7F7" }}
                >
                  Product Status
                </div>
                <div class="card-body card_body_custom">
                  {/* Search functionality */}
                  <div class="form-group has-search ">
                    <span class="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      class="form-control"
                      value={searchStatus}
                      name="searchStatus"
                      placeholder="Search"
                      onChange={(e) => InputHandler(e)}
                    />
                  </div>
                  <div className="Product_leftSide_fixed_content">
                    {/* onload product services Data */}
                    {notFoundSearch == false &&
                      searchStatus == "" &&
                      Provider.slice(0, 10).map((row, index) => (
                        <a
                          className="Product_status_wrapper"
                          href={`#Select${row.id}`}
                        >
                          <div
                            className="card product_card_left_side"
                            id={
                              row.id == GetVendorActiveId
                                ? "Active_Vendor_Status"
                                : "Vendor_Status"
                            }
                            onClick={() => OpenActiveDetails(row.id)}
                          >
                            <div className="card-body card_body_custom">
                              <h6 class="card-title card_title_custom  d-flex justify-content-between">
                                {" "}
                                Abc Company{" "}
                                <p className="checkmark mx-auto">
                                  <i
                                    class="fa fa-check-circle "
                                    aria-hidden="true"
                                  ></i>
                                </p>
                              </h6>

                              <div class="d-flex justify-content-between align-items-center">
                                <p className="">
                                  <span class="fw-bold">Service Id:</span>{" "}
                                  {row.id}
                                </p>
                                <p class=" color-round text-center">
                                  <span class="fw-bold">Date: </span>03/02/2021
                                </p>
                              </div>
                              <div class="d-flex justify-content-between align-items-center">
                                <p>
                                  <span class="fw-bold">Status:</span>Pending
                                  <br />
                                </p>
                                <p class=" color-round text-center">
                                  <span class="fw-bold">Amount:</span>200000
                                </p>
                              </div>
                            </div>

                            {/* service provide by vendor  end */}
                          </div>
                        </a>
                      ))}
                    {/*  after searching data found */}
                    {notFoundSearch == false && searchStatus !== "" && (
                      <a
                        className="Product_status_wrapper"
                        href={`#Select${GetSearchData.id}`}
                      >
                        <div
                          className="card card product_card_left_side"
                          id={
                            GetSearchData.id == GetVendorActiveId
                              ? "Active_Vendor_Status"
                              : "Vendor_Status"
                          }
                          onClick={() => OpenActiveDetails(GetSearchData.id)}
                        >
                          <div className="card-body card_body_custom">
                            <h6 class="card-title card_title_custom d-flex ">
                              {" "}
                              Abc Company{" "}
                              <p className="checkmark mx-auto">
                                <i
                                  class="fa fa-check-circle "
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </h6>

                            <div class="d-flex justify-content-between align-items-center">
                              <p className="">
                                <span class="fw-bold">Service Id:</span>
                                {GetSearchData.id} <br />
                              </p>
                              <p class=" color-round text-center">
                                <span class="fw-bold">Date: </span>03/02/2021
                              </p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <p>
                                <span class="fw-bold">Status:</span>Pending
                                <br />
                              </p>
                              <p class=" color-round text-center">
                                <span class="fw-bold">Amount: </span>200000
                              </p>
                            </div>
                          </div>
                          {/* service provide by vendor  end */}
                        </div>
                      </a>
                    )}
                    {/* no result found message */}
                    {notFoundSearch && (
                      <div className="Vendor_Status">
                        <div className="Vendor_Status_heading">
                          <h6
                            className="Vendor_Status_heading_h6"
                            style={{
                              paddingBottom: "13px",
                              paddingTop: "10px",
                              color: " #ea0606",
                            }}
                          >
                            No Result Found
                          </h6>
                          <p className="checkmark"></p>
                        </div>

                        {/* service provide by vendor  end */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmitData}>
              <input
                type="text"
                name="abc"
                value="kamal"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <input type="submit" name="btn" value="Submit" />
            </form>
            <div className="col-md-8 mt-2 mb-2">
              {/* right product status */}
              <PNRightPart
                PassVebdor_Active_data={GetVendorActiveId}
                openRighhtSideData={vendorStatus_details_open}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PNLeftPart;
