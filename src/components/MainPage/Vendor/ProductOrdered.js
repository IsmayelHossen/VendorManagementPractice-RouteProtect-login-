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
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
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

              <Editor editorState={editorState} onChange={setEditorState} />
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

                      <h2>Hello</h2>
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
