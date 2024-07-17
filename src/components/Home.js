import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Details from './Details';

function Home({children}) {
    let navigate = useNavigate();
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    let [post, setPost] = useState([]);
    function isValidUser(){
    if(!token || !userId){
        alert("Your are not a valid user");
        navigate("/login");
    }
}
    useEffect(()=>{
        async function getData(){
            let data = await fetch("https://jsonplaceholder.typicode.com/users", {
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            let posts = await data.json();
            setPost(posts);

        }
        getData()
        isValidUser()
    }, [])

    function clearStorage(){
        localStorage.clear();
        navigate("/login")
    }
  return (
    <div className='home-div'>
        <div className='main'>
            <div>
            <Link to="/home" className='text-white text-decoration-underline me-2 rounded'>Home</Link>
            <Link to="/update" className='text-white text-decoration-underline'>edit</Link>
            </div>
            <div>
            <button onClick={clearStorage} className='btn bg-danger text-white'>Logout</button>
            </div>
        </div>
        <div>
            {children}
        </div>

    </div>
  )
}

export default Home;