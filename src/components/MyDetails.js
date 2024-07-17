import React, { useEffect, useState } from 'react'
import Home from './Home'
import { useNavigate } from 'react-router-dom';

function MyDetails() {
    let [data, setData] = useState([]);
    let [userId, setUserId] = useState("");
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("userId");
    let navigate = useNavigate();
    let [show, setshow] = useState(false);

    function isValidUser(){
        
        if(!token || !id){
            alert("Your are not a valid user");
            navigate("/login");
        }
        else{
            setUserId(userId)
        }
    }
    useEffect(()=>{
        async function getData(){

            try {
                let myData = await fetch(`http://localhost:5050/get-details/${id}`, {
                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                let response = await myData.json();
                // console.log(response);
                if(response.resp){
                    setData(response.msg)
                    setshow(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
        isValidUser();
        getData()
    }, [])
  return (
    <Home>
    <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
           
           {show ? <div>
            <div>
                <p>Age: {data.age}</p>
                <p>Gender: {data.gender}</p>
                <p>DOB: {data.dob}</p>
                <p>Mobile: {data.mobile}</p>
                </div>
            </div>
            : <p>No data to display</p>}
           
           
    </div>
    </Home>
  )
}

export default MyDetails