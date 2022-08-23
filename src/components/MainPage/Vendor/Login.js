import React from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
const Login = ({ name, fuctioncall }) => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const Navigat = useNavigate();
  const cookies = new Cookies();

  const onsubmit = (data) => {
    axios
      .post("http://localhost:4328/loginSignup/login", data)
      .then((res) => {
        if (res.data.Success) {
          swal({
            title: "Logged in Successfully",
            icon: "success",
            button: "Ok!",
          });
          cookies.set("name", "Ismaye90", {
            path: "/",
            expires: new Date(Date.now() + 7000 * 1000),
            sameSite: "strict",
          });

          reset();

          //    fuctioncall(res);
          localStorage.setItem("LoginData", JSON.stringify(res.data));

          //Navigat(`/vendor/add`);
          window.location.href = "/vendor/add";
        } else if (res.data.Success1) {
          swal({
            title: "Email Or Password Wrong",
            icon: "error",
            button: "Ok!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const id = params.id;

  const location = useLocation();
  let pathname = location.pathname;
  let cdf = 5;
  const hello = () => {
    Navigat(`/vendor/add/${cdf}`);
  };
  return (
    <>
      <div className="page-wrapper">
        <div
          className="mt-5 mb-2 mx-auto  border p-3"
          style={{ maxWidth: "350px" }}
        >
          <form onSubmit={handleSubmit(onsubmit)}>
            <h2>Login Page {name}</h2>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                {...register("email", {
                  required: true,
                })}
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            <Link className="btn btn-success ml-4" to="/vendor/signup">
              Signup
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
