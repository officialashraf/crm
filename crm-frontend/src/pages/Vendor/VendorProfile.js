import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminshow, setAdminProfile } from "../../redux/slice/VendorSlice/AddEmployeeSlice";
import { Modal } from "react-bootstrap";
import axios from "axios";
const VendorProfile = () => {

    let dispatch = useDispatch()
    const profile = JSON.parse(localStorage.getItem('admin'));
    let {adminshow,adminprofile} = useSelector((state)=>state.addEmp);
    const [refreshInterval, setRefreshInterval] = useState(1000);

    

useEffect(()=>{
    const loadProfileData = async()=>{
        const token = localStorage.getItem('access-token');
        if(token){

            try{
                const response = await axios.get(`http://localhost:5000/login/profile`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                localStorage.setItem("admin", JSON.stringify(response.data.user));
                console.log(response.data)
                dispatch(setAdminProfile(response.data.user))
                // setProfileData(response.data.user);
            }catch(error){
                  console.error("Error fetching profile data:", error);
            }
        }
    }
    loadProfileData()
const intervalId  = setInterval(loadProfileData, refreshInterval)
return ()=>clearInterval(intervalId)

},[refreshInterval]);



    const handleClose = ()=>{
        dispatch(setAdminshow(false))
    }
  return (
    <>
      <Modal show={adminshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Admin Profile</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="col-md-3 d-inline text-center">
                <h4> Full Name :{adminprofile.fullname}</h4>
                <h4>Mobile Number : {adminprofile.number}</h4>
                <h4>Email : {adminprofile.email}</h4>
                <h4>Company : {adminprofile.company}</h4>
                
            </div>


        </Modal.Body>
      </Modal>
    </>
  );
};

export default VendorProfile;
