import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let [name, setName] = useState("");
    let [age, setAge] = useState(0);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [msg, setMsg] = useState("");
    let [show, setShow] = useState(false);
    let [btn, setBtn] = useState("Login");
    let navigate = useNavigate();

    function handleEmailChange(e){
        setEmail(e.target.value);
        setShow(false);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
        setShow(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        let obj = {
            email,
            password
        };

        createUser(obj);
    }

    async function createUser(obj){
        setBtn("Verifying...")
        try {
            let addUser = await fetch("http://localhost:5050/login", {
                method:"POST",
                body:JSON.stringify(obj),
                headers:{
                    "Content-type":"application/json"
                }
            })
            let response = await addUser.json();
            console.log(response)
            if(response.resp){
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.id)
                navigate("/home");
            }
            else{
                setMsg(response.msg);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally{
            setBtn("Login");
        }
    }
  return (
    <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='form'>
                <p className='fw-bolder text-danger fs-5 forgot mb-4'>Welcome again, Login</p>
                    {/* <p className='title fs-5'>Signup here !</p> */}
                    <div className='d-flex flex-column justify-content-start align-items-start form-div'>
                        
                        
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <label>Enter your email</label>
                            <input type='text' placeholder='your email'
                            value={email}
                            required
                            onChange={handleEmailChange}/>
                        </div>
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <label>Enter your password</label>
                            <input type='password' placeholder='your password'
                            value={password}
                            required
                            onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    {show &&<p className='error mt-2'>{msg}</p>}
                    <div className='btn-div mt-3'>
                        <button className='sign-login'>{btn}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;