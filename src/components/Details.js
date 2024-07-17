import React, { useState } from 'react'

function Details() {
    let [age, setAge] = useState(0);
    let [gender, setGender] = useState("");
    let [dob, setDob] = useState("");
    let [mobile, setMobile] = useState("");
    let [show, setShow] = useState(false);
    let [btn, setBtn] = useState("Update")

    function handleAgeChange(e) {
        setAge(e.target.value);
    }
    function handleDob(e) {
        setDob(e.target.value);
    }
    function handleMobile(e) {
        setMobile(e.target.value);
    }
    function handleGenderChange(e) {
        setGender(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault()
        if(!gender){
            alert("select your gender");
            return;
        }
        let userId = localStorage.getItem("userId");
        let obj = {
            age,
            dob,
            mobile,
            gender,
            userId
        }
        updateDetails(obj);
    }
    async function updateDetails(obj){
        setBtn("Updating...")
        try {
            let addUser = await fetch("http://localhost:5050/update-details", {
                method:"POST",
                body:JSON.stringify(obj),
                headers:{
                    "Content-type":"application/json"
                }
            })
            let response = await addUser.json();
            console.log(response)
            if(response.resp){
                alert("Your details updated");
            }
            
            
        } catch (error) {
            console.log("error", error);
        }
        finally{
            setBtn("Update");
        }
    }
    return (
        <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div className='form'>
                        <p className='fw-bolder text-secondary fs-5 forgot mb-3'>Update yor details</p>
                        <div className='d-flex flex-column justify-content-start align-items-start form-div'>
                            <div className='d-flex flex-column justify-content-start align-items-start '>
                                <label>Enter your age</label>
                                <input type='number' placeholder='your name'
                                    value={age}
                                    required
                                    onChange={handleAgeChange} />
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-start'>
                                <label>Select DOB</label>
                                <input type='date' placeholder='dob'
                                    value={dob}
                                    required
                                    onChange={handleDob} />
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-start'>
                                <label>Enter your mobile number</label>
                                <input type='text' placeholder='Mobile number'
                                    value={mobile}
                                    required
                                    onChange={handleMobile} />
                            </div>
                            <div>
                                <select value={gender} onChange={handleGenderChange} required>
                                    <option value="" disabled>Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                        </div>
                        <div className='btn-div mt-3'>
                            <button className='text-danger sign border-rounded'>{btn}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Details