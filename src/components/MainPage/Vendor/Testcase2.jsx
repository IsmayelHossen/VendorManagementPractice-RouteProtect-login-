import React, { useMemo, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Testcase2 = () => {
  const Onsubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    //  axios.post("http://localhost:4328/file/file_upload",data,
    //  ).then((response)=>{
    //      console.log(response);
    //  }).catch((error)=>{
    //      console.log(error);
    //  })
  };
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const OnchangeInput = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };
  const getData = () => {
    let age = document.getElementById("age").value;
    if (isNaN(age)) {
      document.getElementById("show").innerHTML = "not a number";
    } else {
      const abc = age >= 20 ? "ok capable to vote" : "need grow up";
      document.getElementById("show").innerHTML = abc;
    }
  };
  const Button1 = () => {
    setCount1((pre) => pre + 1);
  };
  const Button2 = () => {
    setCount2((pre) => pre + 1);
  };
  const evenOdd = useMemo(() => {
    console.log("call");
    let i = 0;
    while (i < 1000000000) i += 1;
    return count1 % 2 == 0;
  }, [count1]);
  return (
    <>
      {console.log("render")}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <span>{evenOdd ? "even" : "odd"}</span>
              <button onClick={Button1}>click</button>
              {count1}
              <br></br>
              <button onClick={Button2}>click2</button>
              {count2}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testcase2;
