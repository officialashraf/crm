import React from 'react'
import { Outlet } from 'react-router-dom'

const EmployeeLogin = () => {
  return (
    <div className='text-center'>
        {/* <h2>Employee Page </h2> */}
        <Outlet/>


    </div>
  )
}

export default EmployeeLogin