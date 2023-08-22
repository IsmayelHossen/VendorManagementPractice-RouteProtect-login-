import React from "react";

function Testcase() {
  return (
    <div>
      <div className="container">
        <div className="TopTitle  text-center">
          <h4 className="w-600">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</h4>
          <h4>বাংলাদেশ সেতু কতৃপক্ষ</h4>
          <h4>প্রশাসন শাখা</h4>
          <p>সেতু ভবন,বনানী,ঢাকা-১২১২ </p>
          <a href="www.bba.gov.bd" className="text-black">
            www.bba.gov.bd
          </a>
        </div>
        <div className="Main pt-4">
          <h4 className="text-center">
            <u>পূর্ণবেতন প্রাপ্য অর্জিত ছুটির হিসাব</u>
          </h4>
          <div className="SubMain">
            <p className="d-inline">
              জনাব/বেগম .....................................................
            </p>{" "}
            <p className="d-inline">
              পদবী...............................................................
            </p>
            <p>এর অর্জিত ছুটির হিসাব। </p>
            <h5>মোট কার্যদিবস: </h5>
            <h5>মোট ছুটি:</h5>
          </div>
        </div>
        <div className="bottomSection d-flex justify-content-between pt-4">
          <h5>প্রস্তুতকারীর স্বাক্ষর</h5>
          <h5>সহকারী পরিচালক (প্রশাসন)</h5>
        </div>
      </div>
    </div>
  );
}

export default Testcase;
