import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Details from './Details';

function Home() {
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
            <p>Home</p>
            <div>
            <button onClick={clearStorage} className='btn bg-danger text-white'>Logout</button>
            </div>
        </div>
        <Details/>
    </div>
  )
}

export default Home;