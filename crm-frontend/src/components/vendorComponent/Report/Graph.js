import React, { useEffect, useState } from "react";
import Content from "../Dashboard/Content";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  Legend,
  ArcElement,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip
);

const Graph = () => {
  let { employeeAdd,adminprofile } = useSelector((state) => state.addEmp);

  let [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [employeeid, setEmployeeId] = useState('')
  // console.log(date);

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate) {
      const [year, month, day] = inputDate.split("-");
      const formatedDate = `${day}/${month}/${year}`;
      setDate(formatedDate);
    } else {
      setDate("");
    }
  };

// const handleEmployeeId = (e)=>{
//   setEmployeeId(e.target.value)

// }
console.log(employeeid)


  useEffect(() => {
    let fetchReport = async () => {
      try {
        let response = await axios.get(
          `http://localhost:5000/leads/report/${employeeid}/${date}`
        );

        setReport(response.data);
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchReport();
  }, [date,employeeid]);


  const BarChartData = {
    labels: [
      "Call Picked Up",
      "Call Note Picked Up",
      "Follow-Up Scheduled",
      "Interested",
      "Meeting Scheduled",
      "Note Interested",
    ],
    datasets: [
      {
        label: "Call Report",
        data: [
          report.callPickedUp,
          report.callNotPickedUp,
          report.followUpScheduled,
          report.interested,
          report.notInterested,
          report.meetingScheduled,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Deal Won (Greenish)
          "rgba(255, 206, 86, 0.6)", // Negotiation (Yellow)
          "rgba(255, 99, 132, 0.6)", // Deal Lost (Red)
          "rgba(50, 50, 179, 0.6)", // Deal Lost (Red)
          "rgba(38, 194, 64, 0.6)", // Deal Lost (Red)
          "rgba(58, 187, 196, 0.6)", // Deal Lost (Red)
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border for Deal Won
          "rgba(255, 206, 86, 1)", // Border for Negotiation
          "rgba(255, 99, 132, 1)", // Border for Deal Lost
          "rgb(48, 41, 151)", // Border for Deal Lost
          "rgb(39, 159, 47)", // Border for Deal Lost
          "rgb(45, 182, 172)", // Border for Deal Lost
        ],
        // backgroundColor: "hsla(228, 83.20%, 62.70%, 0.60)",
        // borderColor: "rgb(49, 49, 235)",
        // borderWidth: 1,
      },
    ],
  };
  const PieChartData = {
    labels: ["Deal Won", "Negotiation", "Deal Lost"],
    datasets: [
      {
        label: "Deal Report",
        data: [report.dealWon, report.dealLost, report.negotiation],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Deal Won (Greenish)
          "rgba(255, 206, 86, 0.6)", // Negotiation (Yellow)
          "rgba(255, 99, 132, 0.6)", // Deal Lost (Red)
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border for Deal Won
          "rgba(255, 206, 86, 1)", // Border for Negotiation
          "rgba(255, 99, 132, 1)", // Border for Deal Lost
        ],
        // backgroundColor: "hsla(228, 83.20%, 62.70%, 0.60)",
        // borderColor: "rgb(49, 49, 235)",
        borderWidth: 1,
      },
    ],
  };
  const LineChartData = loading
    ? null // Jab tak loading hai, koi data na banao
    : report?.quotationItems?.length > 0 && report?.quotationAmounts?.length > 0
    ? {
        labels: [...report.quotationItems],
        datasets: [
          {
            label: "Product Report",
            data: report.quotationAmounts.map((amount) => Number(amount) || 0),
            backgroundColor: "hsla(228, 83.20%, 62.70%, 0.60)",
            borderColor: "rgb(49, 49, 235)",
            borderWidth: 1,
          },
        ],
      }
    : null;
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Isse chart container ke andar adjust hoga
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <div className="container-fluid pb-4">
        <div className="row">
          <div className="d-flex gap-4 justify-content-center">
            <input
              type="date"
              onChange={handleDateChange}
              className="form-controle rounded shadow p-2"
            />
              <select className="rounded shadow px-6" onChange={(e)=>setEmployeeId(e.target.value)}
                
                >
                <option value=''> Select Employee</option>
                {
              
                    <option key={adminprofile._id} value={adminprofile._id}>All Employees</option>
                }
            {
              loading ? (
                <p>Data is Loading</p>
              ):
                employeeAdd.length > 0 ?(

                employeeAdd.map((item)=>(
                  <option key={item._id} value={item._id} >{item.fullname}</option>
                  
                ))
              ):(
                <p>No Data</p>
              )
            }
            </select>
          </div>

          {/* <Content /> */}
          <div className="container-fluid px-4">
          <h4 className="p-2">Dashboard</h4>
          <div className="row">
      
      <div className="col-xl-3 col-md-6">
       <div className="card bg-dark text-white mb-4">
      <div className="card-body">Total Follow Ups</div>
      <div className="card-footer">
        {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
        <h5> {report?.followUpDate} </h5>
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
        <h5> {report?.meetingScheduled}</h5>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6">
    <div className="card bg-dark text-white mb-4">
      <div className="card-body">Quotation Sent</div>
      <div className="card-footer">
        <h5> {report?.totalQuotation} </h5>
        {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
        {/* <div className="small text-white"><i className="fas fa-angle-right"></i></div> */}
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6">
    <div className="card bg-dark text-white mb-4">
      <div className="card-body">Deal Lost</div>
      <div className="card-footer">
        <h5> {report?.dealLost}</h5>
        {/* <a className="small text-white stretched-link" href="#">View Details</a> */}
        {/* <div className="small text-white"><i className="fas fa-angle-right"></i></div> */}
      </div>
    </div>
  </div>

</div>
</div>

          <div className="col-xl-6 mt-4">
            <div className="card">
              <div className="card-header">
                <h6>Calling Report</h6>
              </div>
              <div className="card-body p-3 shadow">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "250px", width: "100%" }}
                >
                  <Bar data={BarChartData} options={options} />
                </div>

                {/* <Line data={data} options={options} /> */}
              </div>
              <div className="card-footer bg-light">
                <div className="d-block justify-content-space-between">
                  <h6 className="d-flex justify-content-between">
                    Total Calls Made <span>{report.totalCalls}</span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Call Picked Up <span>{report.callPickedUp} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Call Note Picked Up <span>{report.callNotPickedUp} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Follow-Up Scheduled{" "}
                    <span> {report.followUpScheduled} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Interested <span> {report.interested} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Note Interested <span> {report.notInterested} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Meeting Scheduled <span> {report.meetingScheduled} </span>
                  </h6>
                </div>
                {/* ))
                } */}
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="card">
              <div className="card-header">
                <h6>Quotation Report</h6>
              </div>
              <div className="card-body p-3 shadow ">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "250px", width: "100%" }}
                >
                  <Pie data={PieChartData} options={options} />
                </div>
              </div>
              <div className="card-footer bg-light">
                <div className="d-block justify-content-space-between">
                  <h6 className="d-flex justify-content-between">
                    Total Quotation Sent <span> {report.totalDeals} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Deal Won <span>{report.dealWon} </span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Negotiation <span>{report.negotiation}</span>
                  </h6>
                  <h6 className="d-flex justify-content-between">
                    Deal Lost <span> {report.dealLost}</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card">
              <div className="card-header">
                <h6>Product Report</h6>
              </div>
              <div className="card-body shadow">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "250px", width: "100%" }}
                >
                  {/* <Line data={PieChartData} options={options} width={100} /> */}
                  {/* <Line data={LineChartData} options={options} width={100} /> */}

                  {loading ? (
                    <p>Loading Chart Data...</p>
                  ) : LineChartData ? (
                    <Line data={LineChartData} options={options} width={100} />
                  ) : (
                    <p>No Data Available for Chart</p>
                  )}
                </div>
              </div>
              <div className="card-footer bg-light">
                <div className="d-block justify-content-space-between">
                  <h6 className="d-flex justify-content-between">
                    Total Product Sales <span> {report.totalQuotation}</span>
                  </h6>

                  {loading ? (
                    <p>Loading Chart Data</p>
                  ) : report?.quotationItems?.length > 0 ? (
                    report.quotationItems.map((item, index) => (
                      <h6
                        key={index}
                        className="d-flex justify-content-between"
                      >
                        {item} <span>{report.quotationAmounts[index]}</span>
                      </h6>
                    ))
                  ) : (
                    <p>No Quotation Data Available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
