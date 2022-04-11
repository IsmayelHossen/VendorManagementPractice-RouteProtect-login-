import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function FileUpload() {
  const [userInfo, setuserInfo] = useState({
    file: [],
    file2: [],
    filepreview: null,
    filepreview2: null,
    name: "",
    email: "",
  });

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
  const submit = async () => {
    console.log(userInfo);
    const formdata = new FormData();
    formdata.append("img", userInfo.file);
    formdata.append("pdf", userInfo.file2);
    formdata.append("name", userInfo.name);
    formdata.append("email", userInfo.email);

    axios
      .post("http://localhost:4328/file/file_upload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
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

  return (
    <div className="page-wrapper container mr-60">
      <h3 className="mt-5 ">File upload</h3>

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
            onClick={() => submit()}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>

      {userInfo.filepreview !== null ? (
        <img
          className={`${userInfo.filepreview}`}
          src={userInfo.filepreview}
          width="100px"
          alt="UploadImage"
        />
      ) : null}
      {userInfo.filepreview2 !== null ? (
        <img
          className={`${userInfo.filepreview2}`}
          src={userInfo.filepreview2}
          width="100px"
          alt="UploadImage"
        />
      ) : null}
    </div>
  );
}

export default FileUpload;
