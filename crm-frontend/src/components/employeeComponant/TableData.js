import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addData } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";

let TableContext = createContext();

export const TableData = ({ children }) => {
  const dispatch = useDispatch();

  const [refreshInterval, setRefreshInterval] = useState(1000); // Refresh every 5 seconds

  useEffect(() => {
    const loadLeadsData = async () => {
      const token = localStorage.getItem("access-token");
      const profile = JSON.parse(localStorage.getItem("employee"));
      const employeefullname = profile?._id;

      if (employeefullname && token) {
        try {
          const response = await axios.get(
            `http://localhost:5000/leads/employee/${employeefullname}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          localStorage.setItem("leads", JSON.stringify(response.data));
          dispatch(addData(response.data));
        } catch (error) {
          console.error("Error fetching leads:", error);
        }
      }
    };

    loadLeadsData();
    const intervalId = setInterval(loadLeadsData, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);

  const data = useSelector((state) => state.employeedata);

  let [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      Object.keys(item).some(
        (key) =>
          item[key].toString().toLowerCase().includes(search.toLowerCase()) ||
          (item.quotation &&
            item.quotation.amount &&
            item.quotation.amount.toString().includes(search)) ||
          (item.quotation &&
            item.quotation.items &&
            item.quotation.items
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()))
      ) ||
      item.comments.some(
        (comment) =>
          new Date(comment.datetime).getDate() === new Date(search).getDate()
      )
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Step 1: Sort `filteredData` based on latest datetime first
  const sortedData = [...filteredData].sort((a, b) => {
    const latestA =
      a.comments.length > 0 && a.comments.at(-1)?.datetime
        ? new Date(a.comments.at(-1).datetime)
        : null;
    const latestB =
      b.comments.length > 0 && b.comments.at(-1)?.datetime
        ? new Date(b.comments.at(-1).datetime)
        : null;

    return latestA && latestB
      ? latestA - latestB
      : latestA
      ? -1
      : latestB
      ? 1
      : 0;
  });

  // Step 2: Apply pagination on sorted data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentItems = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Step 3: Page change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let handleclick = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };


  return (
    <>
      <TableContext.Provider
        value={{
          currentPage,
          totalPages,
          handlePageChange,
          handleclick,
          search,
          currentItems,
          currentPage,
          itemsPerPage,
        }}
      >
        {children}
      </TableContext.Provider>

    
    </>
  );
};

// export default TableData;
export const useTable = () => useContext(TableContext);

{
  /* <div className="container-fluid" id="TableContainerFluid">
        <div className="navbarTable">
          <NavbarTable
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleclick={handleclick}
          />
        </div>

        <div
          style={{ maxHeight: "100%", overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <Table className="border border-dark" bordered hover>
            <TableHeader
              handleclick={handleclick}
              search={search}
            />
            <TableBody
              currentItems={currentItems}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </Table> */
}

//  import {
// //   setProfileData,
//   setShow,
// //   setTarget,
//  } from "../../redux/slice/EmployeSlice/ProfileSlice";
// import {
//   setBShow,
//   setBTarget,
//   setUserId,
// } from "../../redux/slice/EmployeSlice/ModalSlice";
// import {
//   setCShow,
//   setTableId,
//   setCTarget,
//   setHandleClose,
// } from "../../redux/slice/EmployeSlice/ModalTableSlice";
// import {
//   setEmailShow,
//   setEmailId,
//   setEmailTarget,
// } from "../../redux/slice/EmployeSlice/EmailUpdateSlice";
// import {
//   setNumberShow,
//   setNumberId,
//   setNumberTarget,
// } from "../../redux/slice/EmployeSlice/NumberUpdateSlice";
// import {
//   setAddressShow,
//   setAddressTarget,
//   setAddressId,
// } from "../../redux/slice/EmployeSlice/AddressUpdateSlice";
// import {
//   setQuotationShow,
//   setQuotationId,
//   setQuotationTarget,
// } from "../../redux/slice/EmployeSlice/QuotationSlice";
// import {
//   setMeetingDateShow,
//   setMeetingDateId,
//   setMeetingDateTarget,
// } from "../../redux/slice/EmployeSlice/MeetingDateSlice";
// import LogoutPage from "../../pages/employee/LogoutPage";
// import { FunnelFill, PersonCircle } from "react-bootstrap-icons";

// const handleFormClick = (event, id) => {
//   dispatch(setBShow(true));
//   dispatch(setBTarget(event.target));
//   dispatch(setUserId(id));
// };

// const handleover = () => {
//   dispatch(setHandleClose(false));
// };
// const handleTableClick = (event, id) => {
//   dispatch(setCShow((prevId) => (prevId === id ? null : id)));
//   dispatch(setCTarget(event.target));
//   dispatch(setTableId(id));
// };

// const handleEmailUpdate = (event, id) => {
//   dispatch(setEmailShow(true));
//   dispatch(setEmailTarget(event.target));
//   dispatch(setEmailId(id));
// };

// const handleAddressUpdate = (event, id) => {
//   dispatch(setAddressShow(true));
//   dispatch(setAddressTarget(event.target));
//   dispatch(setAddressId(id));
// };

// const handleNumberUpdate = (event, id) => {
//   dispatch(setNumberShow(true));
//   dispatch(setNumberTarget(event.target));
//   dispatch(setNumberId(id));
// };

// const handleMeetingDateClick = (event, id) => {
//   dispatch(setMeetingDateShow(true));
//   dispatch(setMeetingDateTarget(event.target));
//   dispatch(setMeetingDateId(id));
// };

// const handleQuotationClick = (event, id) => {
//   dispatch(setQuotationShow(true));
//   dispatch(setQuotationTarget(event.target));
//   dispatch(setQuotationId(id));
// };

// const handleUpdateStage = async (event, id) => {
//   const newStage = event.target.value;
//   if (!newStage) {
//     console.warn("Invalid stage selected");
//     return;
//   }
//   try {
//     const userToUpdate = data.find((user) => user._id === id);
//     if (!userToUpdate) {
//       console.error("User not found");
//       return;
//     }
//     const updatedUser = { ...userToUpdate, stage: newStage };
//     const response = await axios.put(`${API_URL}/${id}`, updatedUser);
//     dispatch(updateStage({ id, stage: newStage }));
//     if (response.status === 200 && response.data) {
//       console.log("User data updated:", response.data);
//     } else {
//       console.warn("Unexpected response from the server:", response);
//     }
//   } catch (error) {
//     console.error(
//       "Error updating user stage:",
//       error.response || error.message
//     );
//   }
// };
// const handleUpdateSource = async (event, id) => {
//   const newSource = event.target.value;
//   if (!newSource) {
//     console.warn("Invalid Source selected");
//     return;
//   }
//   try {
//     const userToUpdate = data.find((user) => user._id === id);
//     if (!userToUpdate) {
//       console.error("User not found");
//       return;
//     }
//     const updatedUser = { ...userToUpdate, source: newSource };
//     const response = await axios.put(`${API_URL}/${id}`, updatedUser);
//     dispatch(updateSource({ id, source: newSource }));
//     if (response.status === 200 && response.data) {
//       console.log("User data updated:", response.data);
//     } else {
//       console.warn("Unexpected response from the server:", response);
//     }
//   } catch (error) {
//     console.error(
//       "Error updating user stage:",
//       error.response || error.message
//     );
//   }
// };
// let [targetf, setTargetF] = useState(null);
// let navigate = useNavigate();

// const ProfileEvent = (event) => {
//   dispatch(setShow(true));
//   setTargetF(event.target);
// };

{
  /* <thead>
               <tr>
                <th id="th">Sr.No </th>
                <th id="th">Name</th>
                <th id="th">Mobile No.</th>
                <th id="th">Comment</th>
                <th id="th">
                  <input
                    type="date"
                    onChange={(e) => handleclick(e)}
                    value={search}
                    className="d-flex"
                    // id="datesearch"
                    style={{
                      border: "none", 
                      // padding: "5px",
                      backgroundColor: "transparent",
                      outline: "none",  // Removes focus outline
                      appearance: "none", // Removes default dropdown styling (optional)
                    }}
                  />
                  Follow Date & Time
                </th>
                <th id="th">Meeting Date & Time</th>
                <th id="th">Email </th>

                <th id="th">
                  <select
                     style={{
                      border: "none", 
                      padding: "5px",
                      backgroundColor: "transparent",
                      outline: "none",  // Removes focus outline
                      // appearance: "none", // Removes default dropdown styling (optional)
                    }}
                    title="Sector"
                    id="formselect"
                    onChange={(e) => handleclick(e)}
                  >
                    <option>City</option>
                    {data
                      .filter(
                        (item, index, self) =>
                          index === self.findIndex((t) => t.city === item.city)
                      )
                      .map((item) => (
                        <option key={item._id}>{item.city}</option>
                      ))}
                  </select>
                </th>
                <th id="th">
                  <select
                     style={{
                      border: "none", 
                      padding: "5px",
                      backgroundColor: "transparent",
                      outline: "none",  // Removes focus outline
                      // appearance: "none", // Removes default dropdown styling (optional)
                    }}
                    title="Sector"
                    // id="formselect"
                    onChange={(e) => handleclick(e)}
                  >
                    <option>Sector</option>
                    {data
                      .filter(
                        (item, index, self) =>
                          index ===
                        self.findIndex((t) => t.sector === item.sector)
                      )
                      .map((item) => (
                        <option key={item._id}>{item.sector}</option>
                      ))}
                  </select>
                </th>
                <th id="th">Address</th>
                <th id="th">Quotation</th>
                <th id="th">
                  <select
                     style={{
                       border: "none", 
                       padding: "5px",
                       backgroundColor: "transparent",
                       outline: "none",  // Removes focus outline
                       // appearance: "none", // Removes default dropdown styling (optional)
                      }}
                    // id="formselect"
                    aria-label="Default select example"
                    title="Stage"
                    onChange={(e) => handleclick(e)}
                  >
                    <option>Stage </option>
                    <option>Nagotiation </option>
                    <option>Deal Won </option>
                    <option>Deal Lost </option>
                  </select>
                </th>
                <th id="th">
                  <select
                     style={{
                       border: "none", 
                       padding: "5px",
                      backgroundColor: "transparent",
                      outline: "none",  // Removes focus outline
                      // appearance: "none", // Removes default dropdown styling (optional)
                    }}
                    // id="formselect"
                    aria-label="Default select example"
                    title="Stage"
                    onChange={(e) => handleclick(e)}
                  >
                    <option>Source </option>
                    <option>WhatsApp </option>
                    <option>FaceBook </option>
                    <option>Instagram </option>
                  </select>
                
                       {/* <FunnelFill type="button" onClick={() => setDropdownOpen(!dropdownOpen)}/> */
}
{
  /* </th> */
}
{
  /* </tr>   */
}

{
  /* </thead> */
}

{
  /* <tbody className="text-center">
              {currentItems.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td className="tds">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="tds">{item.name}</td>
                    <td
                      onClick={(e) => handleNumberUpdate(e, item._id)}
                      id="td-style"
                      className="tds"
                    >
                      {item.mobile_number.length > 0
                        ? item.mobile_number
                        : "Add Mobile Number"} 

                    </td>
                    <td
                      className="tds"
                      onClick={(e) => handleFormClick(e, item._id)}
                      onPointerOver={(e) => handleTableClick(e, item._id)}
                      onClickCapture={handleover}
                      id="td-style"

                  
                    >
                      {item.comments.length > 0 ? (
                        item.comments.slice(-1).map((commentItem) => {
                          const limitedComment = commentItem.comment
                            .trim()
                            .substring(0, 20); 

                          return (
                            <p key={commentItem._id}>
                              {commentItem.comment.length > 20 ? (
                                <p>{limitedComment}...</p> 
                              ) : (
                                <p>{commentItem.comment}</p>
                              )}
                            </p>
                          );
                        })
                      ) : (
                        <p>Add comments</p>
                      )}
                    </td>
                    <td className="tds">
                      {item.comments.length > 0
                        ? new Date(
                            [...item.comments]
                              .filter((comment) => comment.datetime)
                              .sort(
                                (a, b) =>
                                  new Date(a.datetime) - new Date(b.datetime)
                              )[0]?.datetime 
                          ).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "No Date"}
                    </td>

                    <td
                      onClick={(e) => handleMeetingDateClick(e, item._id)}
                      id="td-style"
                      className="tds"
                    >
                  

                      {item.meeting_time.length > 0
                        ? item.meeting_time
                        : "Meeting Date & Time"}
                    </td>

                    <td
                      onClick={(e) => handleEmailUpdate(e, item._id)}
                      id="td-style"
                      className="tds"
                    >
                    

                      {item.email.length > 0 ? item.email : "Add Email"}
                    </td>
                    <td className="tds">
                      {item.city}

                      {item.city.length > 0 ? item.city : "Add City"}
                    </td>
                    <td className="tds">
                      
                      {item.sector.length > 0 ? item.sector : "Add Sector"}
                    </td>

                    <td
                      onClick={(e) => handleAddressUpdate(e, item._id)}
                      id="td-style"
                      className="tds"
                    >
                  
                      {item.address.length > 0 ? item.address : "Add Address"}
                    </td>

                    <td
                      onClick={(e) => handleQuotationClick(e, item._id)}
                      id="td-style"
                      className="tds"
                    >
                      {item.quotation.items || item.quotation.amount ? (
                        <p>
                          {item.quotation.items && (
                            <p>{item.quotation.items}</p>
                          )}
                          <br />
                          {item.quotation.amount && (
                            <p>{item.quotation.amount}</p>
                          )}
                          /-
                        </p>
                      ) : (
                        <p>Send quotation</p>
                      )}
                    </td>
                    <td className="tds">
                  
                      <select
                         style={{
                          border: "none", 
                          padding: "5px",
                          backgroundColor: "transparent",
                          outline: "none",  
                  
                        }}
                        onChange={(e) => handleUpdateStage(e, item._id)}
                      >
                        <option>{item.stage}</option>
                        <option> Stage</option>
                        <option>Nagotiation </option>
                        <option>Deal Won </option>
                        <option>Deal Lost </option>
                      </select>
                    </td>
                    <td className="tds">
                      
                      <select
                       style={{
                        border: "none", 
                        padding: "5px",
                        backgroundColor: "transparent",
                        outline: "none",  
                      
                      }}
                        onChange={(e) => handleUpdateSource(e, item._id)}
                      >
                        <option>{item.source}</option>
                        <option>Source </option>
                        <option>WhatsApp </option>
                        <option>FaceBook </option>
                        <option>Instagram </option>
                  
                      </select>
                    </td>
                  </tr>
                );
              })}
            
            </tbody> */
}

{
  /* <Navbar className="justify-content-between" id="navbartB">
            <PaginatedList
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    onChange={(e) => handleclick(e)}
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2 p-2 border border-dark"
                    id="searchbar"
                  />
                </Col>
              </Row>
            </Form>
            <h4>
              <a className="profile">
                <PersonCircle size={40} onClick={ProfileEvent} />
                <Profile target={targetf} />

                <a href="" className="profilename">
                  {profiledata.fullname}
                </a>
              </a>
            </h4>
          </Navbar> */
}
