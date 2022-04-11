import { faClock } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useRef, useState } from "react";
const Testcase = () => {
  const [userData, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchReslt, setSearchReslt] = useState([]);
  const [date1, setdate1] = useState(0);
  const [name, setName] = useState("");
  const [time1, settime1] = useState(true);
  const inputElement = useRef();
  useEffect(() => {
    getData();
    const intervel = setInterval(() => {
      let d = new Date();
      let text = d.toLocaleTimeString();
      setdate1(text);
    }, 1000);

    return () => {
      console.log("hide");
      clearInterval(intervel);
    };
  }, []);
  const clock = () => {
    let d = new Date();
    let text = d.toLocaleTimeString();
    setdate1(text);
    // console.log(date.toLocaleString());
  };

  const handlefilter = (e) => {
    //alert(search);
    // setSearch(e.target.value);
    inputElement.current.focus();
    const search1 = e.target.value;
    const searchResult = userData.filter((itme) => {
      const serachTitle = itme.title + " " + itme.body;
      const search = search1.trim().toLowerCase();
      return serachTitle.trim().toLowerCase().includes(search);
    });

    // const search1 = array.filter((item) => {
    //   const itemData = item.name + " " + item.title + " " + item.mobile;
    //   //  console.log(itemData);
    //   const textData = "    he".trim().toLowerCase();

    //   return itemData.trim().toLowerCase().includes(textData);
    // });

    if (search1 == "") {
      /// setSearchReslt([]);
      getData();
    } else {
      setData(searchResult);
    }
  };
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        // You have to send it, as I have done below
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (vendors) => {
          setData(vendors);
          console.log(vendors);
        },

        (err) => {
          console.log(err);
          // setnotFoundSearch(false);
        }
      );
  };
  const hidetime = () => {
    settime1(!time1);
  };
  let abc = "hello";
  return (
    <>
      {abc && console.log(abc + Math.random())}
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <button onClick={() => hidetime()}>
            {time1 ? "Stop time" : "show time"}
          </button>
          {time1 && date1}

          <form>
            <input
              ref={inputElement}
              type="text"
              onChange={(e) => handlefilter(e)}
            />
          </form>
          {userData.length != 0 &&
            userData.map((row, index) => (
              <>
                <p>{row.title}</p>-- <p>{row.body}</p>
              </>
            ))}
        </div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {}
    </>
  );
};
export default Testcase;
