import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [msg, setMsg] = useState("");
    let [show, setShow] = useState(false);
    let [btn, setBtn] = useState("Signup");
    let [passShow, setPassShow] = useState(false);
    let [passMsg, setPassMsg] = useState("")

    function handleNameChange(e){
        setName(e.target.value);
        setShow(false);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
        setShow(false);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
        setShow(false);
        setPassShow(false);
    }
    function handleConfirmPasswordChange(e){
        setConfirmPassword(e.target.value);
        setShow(false);
        setPassShow(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(password!==confirmPassword){
            setPassMsg("Password does not match");
            setPassShow(true);
            return;
        }
        let obj = {
            name,
            email,
            password
        };

        createUser(obj);
    }

    async function createUser(obj){
        setBtn("Creating...")
        try {
            let addUser = await fetch("http://localhost:5050/signup", {
                method:"POST",
                body:JSON.stringify(obj),
                headers:{
                    "Content-type":"application/json"
                }
            })
            let response = await addUser.json();
            if(response.resp){

            }
            else{
                setMsg(response.msg);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally{
            setBtn("Signup");
        }
    }
  return (
    <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='form'>
                <p className='fw-bolder text-danger fs-5 forgot mb-3'>Signup here</p>
                    {/* <p className='title fs-5'>Signup here !</p> */}
                    <div className='d-flex flex-column justify-content-start align-items-start form-div'>
                        <div className='d-flex flex-column justify-content-start align-items-start '>
                            <label>Enter your name</label>
                            <input type='text' placeholder='your name'
                            value={name}
                            required
                            onChange={handleNameChange}/>
                        </div>
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
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <label>Confirm your password</label>
                            <input type='password' placeholder='confirm password'
                            value={confirmPassword}
                            required
                            onChange={handleConfirmPasswordChange}/>
                        </div>
                        {passShow && <p className='error'>{passMsg}</p>}
                    </div>
                    {show &&<p className='error mt-2'>{msg}</p>}
                    <div className='btn-div mt-3'>
                        <button className='sign'>{btn}</button>
                    </div>
                    <div className='mt-2'>
                    <Link to="/login">Already have an account ?</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup