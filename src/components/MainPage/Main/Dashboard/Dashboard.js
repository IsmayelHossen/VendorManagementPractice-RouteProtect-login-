/**
 * Signin Firebase
 */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  User,
  Avatar_19,
  Avatar_07,
  Avatar_06,
  Avatar_14,
} from "../../../Entryfile/imagepath.js";

import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../../index.css";

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const barchartdata = [
  { y: "2006", "Total Income": 100, "Total Outcome": 90 },
  { y: "2007", "Total Income": 75, "Total Outcome": 65 },
  { y: "2008", "Total Income": 50, "Total Outcome": 40 },
  { y: "2009", "Total Income": 75, "Total Outcome": 65 },
  { y: "2010", "Total Income": 50, "Total Outcome": 40 },
  { y: "2011", "Total Income": 75, "Total Outcome": 65 },
  { y: "2012", "Total Income": 100, "Total Outcome": 90 },
];
const linechartdata = [
  { y: "2006", "Total Sales": 50, "Total Revenue": 90 },
  { y: "2007", "Total Sales": 75, "Total Revenue": 65 },
  { y: "2008", "Total Sales": 50, "Total Revenue": 40 },
  { y: "2009", "Total Sales": 75, "Total Revenue": 65 },
  { y: "2010", "Total Sales": 50, "Total Revenue": 40 },
  { y: "2011", "Total Sales": 75, "Total Revenue": 65 },
  { y: "2012", "Total Sales": 100, "Total Revenue": 50 },
];
const Dashboard = (props) => {
  const reloadCount = Number(sessionStorage.getItem("reloadCount")) || 0;
  console.log(props);
  useEffect(() => {
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }, []);

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
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title text-start">
                  Welcome To Store!{props.name}
                </h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon">
                    <i className="fa fa-cubes" />
                  </span>
                  <div className="dash-widget-info">
                    <h3>112</h3>
                    <span>Projects</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon">
                    <i className="fa fa-usd" />
                  </span>
                  <div className="dash-widget-info">
                    <h3>44</h3>
                    <span>Clients</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon">
                    <i className="fa fa-diamond" />
                  </span>
                  <div className="dash-widget-info">
                    <h3>37</h3>
                    <span>Tasks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon">
                    <i className="fa fa-user" />
                  </span>
                  <div className="dash-widget-info">
                    <h3>218</h3>
                    <span>Employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Total Revenue</h3>
                      {/* <div id="bar-charts" /> */}
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={barchartdata}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid />
                          <XAxis dataKey="y" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Total Income" fill="#667eea" />
                          <Bar dataKey="Total Outcome" fill="#764ba2" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Sales Overview</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                          data={linechartdata}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid />
                          <XAxis dataKey="y" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="Total Sales"
                            stroke="#667eea"
                            fill="#667eea"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 7 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Total Revenue"
                            stroke="#764ba2"
                            fill="#764ba2"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 7 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>

                      {/* <div id="line-charts" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default Dashboard;
