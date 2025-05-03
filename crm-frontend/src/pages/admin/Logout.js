import React from 'react'
import { Power } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    
    let navigate =  useNavigate()
 
     const handleLogout = ()=>{
         localStorage.removeItem("access-token");
         navigate("/")
     }

  return (
    <div onClick={handleLogout}>
        <Power size={30}  style={{cursor:"pointer"}}/>
        </div>
  )
}

export default Logout