import React, { useState } from "react";
const CustomForm = () => {
  const [inputs, setinputs] = useState({
    name: "kamal",
    email: "ismayelhossen123@gmail.com",
    password: "456",
  });
  const [inputsArray, setinputsArray] = useState([]);
  const InputHandler = (e) => {
    const name1 = e.target.name;
    console.log(inputs);
    setinputs({ ...inputs, [e.target.name]: e.target.value });

    // console.log({ ...inputs });
    // console.log([e.target.name] + e.target.value);
  };
  const Onsubmit = (e) => {
    e.preventDefault();
    //  console.log(inputs);
    // const arraydata = { ...inputs, id: Math.floor(Math.random() * 100) };
    // setinputsArray([...inputsArray, arraydata]);
    console.log(inputs);
    setinputs({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="page-wrapper" style={{ marginTop: "200px" }}>
        <form onSubmit={Onsubmit}>
          <input
            type="text"
            name="name"
            defaultValue={inputs.name}
            placeholder="Name.."
            onChange={(e) => InputHandler(e)}
          />
          <input
            type="email"
            name="email"
            defaultValue={inputs.email}
            placeholder="Email.."
            onChange={(e) => InputHandler(e)}
          />
          <input
            type="password"
            name="password"
            defaultValue={inputs.password}
            placeholder="Password.."
            onChange={(e) => InputHandler(e)}
          />
          <input type="submit" value="submit" />
        </form>
        {/* {inputsArray.length != 0 &&
          inputsArray.map((row, index) => (
            <h2 style={{ textAlign: "center" }}>
              {row.name}
              {row.email}
              {row.password}
            </h2>
          ))}
        {console.log(inputsArray)} */}
      </div>
    </>
  );
};

export default CustomForm;
