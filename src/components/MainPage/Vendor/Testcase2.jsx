import React,{useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Testcase2  = () => {
    const Onsubmit=(e)=>{
        e.preventDefault();
  console.log(inputs);
    //  axios.post("http://localhost:4328/file/file_upload",data,
    //  ).then((response)=>{
    //      console.log(response);
    //  }).catch((error)=>{
    //      console.log(error);
    //  })
    }
    const[inputs,setinputs]=useState({
        name:"",
        email:"",
        age:"",
    })
    const OnchangeInput=(e)=>{
        setinputs({
            ...inputs,[e.target.name]:e.target.value
        })
        console.log(inputs)
    }
    const getData=()=>{
        let age=document.getElementById("age").value;
        if(isNaN(age)){
            document.getElementById("show").innerHTML="not a number";
        }
        else{
            const abc=age>=20?"ok capable to vote":"need grow up";
           document.getElementById("show").innerHTML=abc;
        }
    }
    return ( 
        <>
        <div className="page wrapper">
            <h2 className="mt-5">this the test 2 component</h2>
            <h2 className="mt-5">this the test 2 component</h2>
           
            <form  className="mx-auto" action="http://localhost:4328/file/file_upload" method="post" enctype='multipart/form-data' >
               <input type="file" name="img" multiple/>
               <input type="file" name="pdf" multiple/>
               <input type="text" name="name" placeholder="name.." value={inputs.name} onChange={(e)=>OnchangeInput(e)}/>
               <input type="email" name="email" placeholder="email.." value={inputs.email} onChange={(e)=>OnchangeInput(e)}/>
               <input type="submit" value="submit"/>
           
</form>
        </div>
        <p id="show"></p>
        <input name="age" id="age" value={setinputs.age} placeholder="age"/>
        <button onClick={getData} >Submit</button>
        </>
     );
}
 
export default Testcase2 ;