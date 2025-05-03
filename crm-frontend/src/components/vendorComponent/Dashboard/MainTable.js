import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLeadData } from "../../../redux/slice/VendorSlice/AddLeadSlice";
const MainTable = () => {
  let { leaddata, leadid, employeelist } = useSelector(
    (state) => state.addlead
  );
  let { adminshow, adminprofile, employeeAdd } = useSelector(
    (state) => state.addEmp
  );

  let [data, setData] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!adminprofile || !adminprofile._id) {
        console.error("Admin ID is missing");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/leads/admin/${adminprofile._id}`
        );
        // dispatch(setLeadData(response.data));
        setData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [dispatch, adminprofile._id]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = data.slice(startIndex, startIndex + rowsPerPage);
  // console.log(data);
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header"> Leads</div>
          <div className="card-body">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Sr.No </th>
                  <th>Name </th>
                  <th>Number</th>
                  <th>Follow Ups</th>
                  <th>Meetings</th>
                  <th>asign</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={item.id}>
                    <td> {index + 1 + (currentPage - 1) * rowsPerPage}</td>
                    {/* <td>{index + 1}</td> */}
                    <td>{item.name}</td>
                    <td>{item.mobile_number}</td>
                    <td className="tds">
                      {item.comments.length > 0
                        ? (() => {
                            const validComments = item.comments.filter(
                              (comment) => comment.datetime
                            );

                            if (validComments.length === 0) {
                              return "Follow Date & Time";
                            }

                            const latestComment = validComments.sort(
                              (a, b) =>
                                new Date(b.datetime).getTime() -
                                new Date(a.datetime).getTime()
                            )[0];

                            if (!latestComment) {
                              return "Follow Date & Time";
                            }

                            return new Date(
                              latestComment.datetime
                            ).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            });
                          })()
                        : "Follow Date & Time"}
                    </td>
                    <td>{item.meeting_time}</td>
                    {/* {employeeAdd.map((items) => (
                      <td>
                        {item.employeeid === items._id
                          ? items.fullname
                          : items.fullname}
                      </td>
                    ))} */}
                    <td>
                     {
                      (()=>{
                        const matchedEmployee = employeeAdd.find(
                          (items)=> item.employeeid === items._id
                        )
                        return matchedEmployee ? matchedEmployee.fullname : "No Employee"
                      })
                     ()}
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}
            {/* <div className="card-footer"> */}
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTable;
