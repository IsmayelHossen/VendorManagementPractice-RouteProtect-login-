import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const NoPage = () => {
  const [loader, setLoadder] = useState(false);
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      console.log(res);
    });
  });
  return (
    <>
      <div className="page-wrapper">
        <h3>404</h3>
      </div>
    </>
  );
};

export default NoPage;
