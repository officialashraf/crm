import axios from 'axios'
import React ,{useEffect, useState}from 'react'
import { useSelector } from 'react-redux'




const Content = () => {
  let {adminshow,adminprofile} = useSelector((state)=>state.addEmp)

  let [todayreport, setTodayReport] = useState(null)

  useEffect(()=>{
    const fetchdata = async()=>{
    if (!adminprofile || !adminprofile._id) {
      console.error("Admin ID is missing");
      return;
    }
    try{

      let response = await axios.get(`http://localhost:5000/leads/admin/aggregatedtask/${adminprofile._id}`);
      setTodayReport(response.data)
    }catch(error){
      console.log(error)
    }}
    fetchdata()
  },[adminprofile])


  return (
    <>
    <div className="container-fluid px-4">
    <h4 className="p-2">Dashboard</h4>
    {/* <ol className="breadcrumb mb-4">
      <li className="breadcrumb-item active">Dashboard</li>
    </ol> */}
    
    <div className="row">
      
          <div className="col-xl-3 col-md-6">
           <div className="card bg-dark text-white mb-4">
          <div className="card-body">Total Follow Ups</div>
          <div className="card-footer">
            {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
            <h5> {todayreport?.totalFollowUp} </h5>
            {/* <div className="small text-white"><i className="fas fa-angle-right"></i></div> */}
          </div>
        </div>
      </div>
    
    
      <div className="col-xl-3 col-md-6">
        <div className="card bg-dark text-white mb-4">
          <div className="card-body">Total Meetings</div>
          <div className="card-footer">
            {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
            {/* <div className="small text-white"><i className="fas fa-angle-right"></i></div> */}
            <h5> {todayreport?.totalMeetings}</h5>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card bg-dark text-white mb-4">
          <div className="card-body">Quotation Sent</div>
          <div className="card-footer">
            <h5> {todayreport?.totalQuotations} </h5>
            {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
            {/* <div className="small text-white"><i className="fas fa-angle-right"></i></div> */}
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card bg-dark text-white mb-4">
          <div className="card-body">Deal Won</div>
          <div className="card-footer">
            <h5> {todayreport?.totalDealWon}</h5>
            {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
            {/* <div className="small text-white"><i className="fas fa-angle-right"></i></div> */}
          </div>
        </div>
      </div>
    
    </div>
  </div>
 
    </>

  )
}

export default Content