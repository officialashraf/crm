import React from 'react'
import Navbar from '../../components/vendorComponent/Header/Navbar'
import SideNavbar from '../../components/vendorComponent/Header/SideNavbar'
import Content from '../../components/vendorComponent/Dashboard/Content'
import ManageLeads from '../../components/vendorComponent/Leads/ManageLeads'


const Lead = () => {
  return (
  
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav" style={{display:"flex", height:"100vh", overflow:"hidden"}}>
    <SideNavbar/>
        <div id="layoutSidenav_content" style={{flex:"1", overflow:"hidden", display:"flex", flexDirection:"column"}}>
          <main style={{flex:"1", overflow:"auto",marginTop:"10px", marginBottom:"50px"}}>

            <ManageLeads/>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Lead