import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./components/initialpage/NotFound";
import Dashboard from "./components/MainPage/Main/Dashboard/Dashboard";
import logo from "./logo.svg";
import Sidebar from "./components/initialpage/Sidebar/sidebar";
import Header from "./components/initialpage/Sidebar/header";
import Create_Vendor from "./components/MainPage/Vendor/Create_Vendor";
import Testcase from "./components/MainPage/Vendor/Testcase";
import ServicePurchase from "./components/MainPage/Vendor/ServicePurchase";
import ProductOrdered from "./components/MainPage/Vendor/ProductOrdered";
import ProductPurchase from "./components/MainPage/Vendor/ProductPurchase";
import ServiceOrdered from "./components/MainPage/Vendor/ServiceOrdered";
import ProductCompletion from "./components/MainPage/Vendor/ProductCompletion";
import NoPage from "./components/MainPage/Vendor/NoPage";
import PrivateRoute from "./components/MainPage/Vendor/PrivateRoute";
import Login from "./components/MainPage/Vendor/Login";
import Testcase2 from "./components/MainPage/Vendor/Testcase2";
import Signup from "./components/MainPage/Vendor/Signup";
import { checkIfAuthenticated } from "./components/MainPage/Vendor/AuthCheck";
import CustomForm from "./components/MainPage/Vendor/CustomForm";
import FileUpload from "./components/MainPage/Vendor/FileUpload";
import SendMail from "./components/MainPage/Vendor/SendMail";
import Vendor_Details from "./components/MainPage/Vendor/Vendor_Details";
import Vendor_Branch from "./components/MainPage/Vendor/Vendor_Branch";
import ViewNoa_details from "./components/MainPage/Vendor/ViewNoa_details";
import ViewFileData from "./components/MainPage/Vendor/ViewFileData";
import FileView from "./components/MainPage/Vendor/FileView";
import { ThemeContext } from "./components/MainPage/Vendor/CommonUrlApi";
function App() {
  const [isLogdIn, setisLodIn] = useState(false);
  const [isAuth, setisAuth] = useState(false);
  const [loggedinData, setloggedinData] = useState({});

  const functioncall = (abc) => {
    // alert(abc.JSON.stringify());

    // setisAuth(abc.data.Success);
    setloggedinData(abc);
    // console.log(abc.data.Success);
    // console.log(isAuth);
    // Navigat(`vendor/add`);
  };
  const data = localStorage.getItem("LoginData")
    ? localStorage.getItem("LoginData")
    : "";
  localStorage.getItem("LoginData");
  const loginData = data ? JSON.parse(data) : "";

  return (
    <div className="App">
      {/* {console.log(isAuth)} */}

      <BrowserRouter>
        <ThemeContext.Provider value={{ count: loginData.email }}>
          <Sidebar />
          <Header />
          <Routes>
            {/* <Route
            exact
            path="/"
            element={
              <>
                <Sidebar />
                <Header />
              </>
            }   
          ></Route> */}
            {/* <Protected path="/" isAuth={isAuth} element={<Dashboard />} /> */}
            {/* index means path is "/" */}

            {/* <Route index element={<Dashboard />} /> */}

            <>
              {/* this the authentication system for routes start */}

              <Route path="/*" element={<PrivateRoute />}>
                <Route path="vendor/add" element={<Create_Vendor />} />
                <Route
                  path="vendor/details/add/:id"
                  element={<Vendor_Details />}
                />
                <Route
                  path="vendor/ViewFileData/:vendor_id/:id/:type"
                  element={<ViewFileData />}
                />
                <Route
                  path="vendor/FileView/:vendor_id/:id/:filename"
                  element={<FileView />}
                />

                <Route
                  path="vendor/view_vendor_noadetails/:id/:vendor_id"
                  element={<ViewNoa_details />}
                />

                <Route path="vendor/branch/add" element={<Vendor_Branch />} />
                <Route
                  path="vendor/product/status"
                  element={<ProductPurchase />}
                />
                <Route
                  path="vendor/product/completion"
                  element={<ProductCompletion />}
                />
              </Route>

              <Route
                path="/vendor/service/status"
                element={<ServicePurchase />}
              />
              <Route
                path="/vendor/service/order"
                element={<ServiceOrdered />}
              />
              <Route
                path="/vendor/service/completion"
                element={<ServiceOrdered />}
              />
              {/* this the authentication system for routes end */}
            </>

            <Route path="/customform" element={<CustomForm />} />
            <Route exact path="/test" element={<Testcase />} />
            <Route exact path="/mail" element={<SendMail />} />
            <Route exact path="/test2" element={<Testcase2 />} />
            <Route
              path="/vendor/login"
              element={<Login name="ismayel" fuctioncall={functioncall} />}
              // element={
              //   checkIfAuthenticated() ? (
              //     <Create_Vendor />
              //   ) : (
              //     <Login name="ismayel" fuctioncall={functioncall} />
              //   )
              // }
            />
            <Route
              path="/vendor/signup"
              element={checkIfAuthenticated() ? <Create_Vendor /> : <Signup />}
            />
            <Route path="/fileupload" element={<FileUpload />} />
            <Route path="/vendor/*" element={<NoPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
