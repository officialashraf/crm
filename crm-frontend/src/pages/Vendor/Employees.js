import React from 'react'
import Navbar from '../../components/vendorComponent/Header/Navbar'
import SideNavbar from '../../components/vendorComponent/Header/SideNavbar'
import ManageEmployee from '../../components/vendorComponent/Employee/ManageEmployee'

const Employees = () => {
  return (
   
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav" style={{display:"flex", height:"100vh", overflow:"hidden"}}>
    <SideNavbar/>
        <div id="layoutSidenav_content" style={{flex:"1", overflow:"hidden", display:"flex", flexDirection:"column"}}>
          <main style={{flex:"1", overflow:"auto",padding:"10px"}}>
          
<ManageEmployee/>
            {/* <Content/> */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Employees