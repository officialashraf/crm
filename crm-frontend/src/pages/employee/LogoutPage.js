import React from 'react'
import { Power } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addData } from '../../redux/slice/EmployeSlice/EmployeeDataSlice';
import { setProfileData } from '../../redux/slice/EmployeSlice/ProfileSlice';

const LogoutPage = () => {
   let navigate =  useNavigate()
   const dispatch = useDispatch()

    const handleLogout = ()=>{
        localStorage.removeItem("access-token");
        localStorage.removeItem("employee");
        localStorage.removeItem("leads");
        dispatch(setProfileData({}))
        dispatch(addData([]))
        navigate("/")
    }

  return (
    <>
    <div onClick={handleLogout}>
    <Power size={30}  style={{cursor:"pointer"}}/>
    </div>
    </>
  )
}

export default LogoutPage