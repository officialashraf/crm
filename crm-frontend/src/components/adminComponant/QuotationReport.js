import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import QutationReports from "../../assets/style/admincss/QutationReports.css";

const QuotationReport = () => {
  const data = [
    { name: "Step 1", value: 100, fill: "#8884d8" },
    { name: "Step 2", value: 80, fill: "#83a6ed" },
    { name: "Step 3", value: 60, fill: "#8dd1e1" },
    { name: "Step 4", value: 40, fill: "#82ca9d" },
    { name: "Step 5", value: 20, fill: "#a4de6c" },
  ];
  return (
    <>
      <div className="container" id="quotationId">
        <div className="funnalChart">
          {/* <FannelChart /> */}
          <ResponsiveContainer width="100%" height={300}> 
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" /> 
                  <XAxis dataKey="name" /> 
                  <YAxis /> 
                  <Tooltip /> 
                  <Legend /> 
                  <Line type="monotone" dataKey="value" stroke="#8884d8" /> 
                 </LineChart>
              </ResponsiveContainer>
        </div>
        {/* <div className="QuotationGraph"> */}
        <div className="container">
          <div className="row ">
            {[
              { label: "Total Quotation Sent", value: "5,50,000" },
              { label: "Deal Won", value: "2,50,000" },
              { label: "Negotiation", value: "2,50,000" },
              { label: "Deal Lost", value: "2,50,000" },
            ].map((item, index) => (
              <div key={index} className="col-12 col-sm-8 p-2">
                <div className="d-flex justify-content-between p-2 border rounded bg-light">
                  <div>{item.label}</div>
                  <div>{item.value}</div>
                </div>
               </div>
            ))}
          {/* </div> */}
        </div>
      </div>
        {/* <div className="QuotationGraph">

        <div class="container" >
          <div class="row" >
            <div class="d-flex flex-column flex-sm-row p-2 justify-content-between" >
              <div>Total Quotation Sent</div>
              <div>5,50,000</div>
            </div>
            <div class="d-flex flex-column flex-sm-row p-2 justify-content-between ">
              <div>Deal Won</div>
              <div>2,50,000</div>
            </div>
            <div class="d-flex flex-column flex-sm-row p-2 justify-content-between ">
              <div>Nagotiation</div>
              <div>2,50,000</div>
            </div>
            <div class="d-flex flex-column flex-sm-row p-2 justify-content-between ">
              <div>Deal Lost</div>
              <div>2,50,000</div>
            </div>
          </div>
        </div>
        </div> */}
      </div>
    </>
  );
};

export default QuotationReport;
