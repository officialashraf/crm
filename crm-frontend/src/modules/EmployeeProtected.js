import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const EmployeeProtected = () => {
    let navigate = useNavigate()
    useEffect(()=>{
            if(!localStorage.getItem("access-token")){
                navigate("/")
            }
    },[])
  return (
    // <div>EmployeeProtected</div>
    <Outlet/>
  )
}

export default EmployeeProtected