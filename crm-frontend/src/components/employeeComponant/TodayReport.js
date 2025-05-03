import React, { useEffect, useState } from "react";
import '../../assets/style/employecss/dashboard.css'
import axios from "axios";
import { useSelector } from "react-redux";


const TodayReport = () => {
  const  profiledata  = useSelector((state) => state.empleeprofile.profiledata);
  let [error, setError] = useState(null)
  let [data, setData]= useState(null)

  useEffect(()=>{
    const fetchdata = async()=>{
      if(!profiledata || !profiledata._id) return;
      try{
        let response = await axios.get(`http://localhost:5000/leads/aggregatedtask/${profiledata._id}`)
        setData(response.data);
        setError(null)
      }catch(error){
        console.error("Error fetching report:", error);
        setData(null);
        setError("failed to fetch data Please try again")

      }
    }
    fetchdata()
  },[profiledata])

  return (
    <div className="container">
      { data ? (
        <div className="boxs">
      <div className="box" id="follows">
        <b>{data.totalFollowUp}</b>
        <p>Follow Up's</p>
      </div>
      <div className="box" >
        <b>{data.totalMeetings}</b>
        <p>Meetings</p>
      </div>
      {/* <div className="box">
        <b>{data.totalInterested}</b>
        <p>Interested</p>
      </div>
      <div className="box">
         <b>{data.totalQuotations}</b>
        <p>Quotation Sent</p>
      </div> */}
        </div>
    ):(
      <p>No Data Available</p>
    )}
    </div>
  );
};

export default TodayReport;
