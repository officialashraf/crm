import React from 'react'
import Navbar from '../../components/adminComponant/Navbar'
import ManageLeads from '../../components/adminComponant/ManageLeads'
import Dashboardcss from '../../assets/style/admincss/Dashboard.css'

const Home = () => {
  return (
    <>
    <div className='container-fluid' id='HomePage' >
<div className='navlinks' >
    <Navbar />
</div>
<div className='manageleads'>
    <ManageLeads/>

</div>
    </div>
    </>
  )
}

export default Home