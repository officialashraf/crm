import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modals from "./Modals";
import ModalTable from "./ModalTable";
import EmailEdit from "./EmailEdit";
import NumberEdit from "./NumberEdit";
import AddressEdit from "./AddressEdit";
import SendQuotation from "./SendQuotation";
import SendMeetingDate from "./SendMeetingDate";
import axios from "axios";
import API_URL from "../../utils/API_URL";
import {
  addData,
  updateStage,
  updateSource,
} from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import {
  setBShow,
  setBTarget,
  setUserId,
} from "../../redux/slice/EmployeSlice/ModalSlice";
import {
  setCShow,
  setTableId,
  setCTarget,
  setHandleClose,
} from "../../redux/slice/EmployeSlice/ModalTableSlice";
import {
  setEmailShow,
  setEmailId,
  setEmailTarget,
} from "../../redux/slice/EmployeSlice/EmailUpdateSlice";
import {
  setNumberShow,
  setNumberId,
  setNumberTarget,
} from "../../redux/slice/EmployeSlice/NumberUpdateSlice";
import {
  setAddressShow,
  setAddressTarget,
  setAddressId,
} from "../../redux/slice/EmployeSlice/AddressUpdateSlice";
import {
  setQuotationShow,
  setQuotationId,
  setQuotationTarget,
} from "../../redux/slice/EmployeSlice/QuotationSlice";
import {
  setMeetingDateShow,
  setMeetingDateId,
  setMeetingDateTarget,
} from "../../redux/slice/EmployeSlice/MeetingDateSlice";
import { useTable } from "./TableData";

const TableBody = () => {
  const { currentItems, currentPage, itemsPerPage } = useTable();

  let dispatch = useDispatch();

  const data = useSelector((state) => state.employeedata);

  const handleFormClick = (id) => {
    dispatch(setBShow(true));
    dispatch(setBTarget(`over-${id}`));
    dispatch(setUserId(id));
  };

  const handleover = () => {
    dispatch(setHandleClose(false));
  };
  const handleTableClick = (id) => {
    dispatch(setCShow((prevId) => (prevId === id ? null : id)));
    dispatch(setCTarget(`over-${id}`));
    dispatch(setTableId(id));
  };

  const handleEmailUpdate = (id) => {
    dispatch(setEmailShow(true));
    dispatch(setEmailTarget(`email-${id}`));
    dispatch(setEmailId(id));
  };

  const handleAddressUpdate = (id) => {
    dispatch(setAddressShow(true));
    dispatch(setAddressTarget(`address-${id}`));
    dispatch(setAddressId(id));
  };

  const handleNumberUpdate = (id) => {
    dispatch(setNumberShow(true));
    dispatch(setNumberTarget(`number-${id}`));
    dispatch(setNumberId(id));
  };

  const handleMeetingDateClick = (id) => {
    dispatch(setMeetingDateShow(true));
    dispatch(setMeetingDateTarget(`meetingdate-${id}`));
    dispatch(setMeetingDateId(id));
  };

  const handleQuotationClick = (id) => {
    dispatch(setQuotationShow(true));
    dispatch(setQuotationTarget(`quotation-${id}`));
    dispatch(setQuotationId(id));
  };

  const handleUpdateStage = async (event, id) => {
    const newStage = event.target.value;
    if (!newStage) {
      console.warn("Invalid stage selected");
      return;
    }
    try {
      const userToUpdate = data.find((user) => user._id === id);
      if (!userToUpdate) {
        console.error("User not found");
        return;
      }
      const updatedUser = { ...userToUpdate, stage: newStage };
      const response = await axios.put(`${API_URL}/${id}`, updatedUser);
      dispatch(updateStage({ id, stage: newStage }));
      if (response.status === 200 && response.data) {
        console.log("User data updated:", response.data);
      } else {
        console.warn("Unexpected response from the server:", response);
      }
    } catch (error) {
      console.error(
        "Error updating user stage:",
        error.response || error.message
      );
    }
  };
  const handleUpdateSource = async (event, id) => {
    const newSource = event.target.value;
    if (!newSource) {
      console.warn("Invalid Source selected");
      return;
    }
    try {
      const userToUpdate = data.find((user) => user._id === id);
      if (!userToUpdate) {
        console.error("User not found");
        return;
      }
      const updatedUser = { ...userToUpdate, source: newSource };
      const response = await axios.put(`${API_URL}/${id}`, updatedUser);
      dispatch(updateSource({ id, source: newSource }));
      if (response.status === 200 && response.data) {
        console.log("User data updated:", response.data);
      } else {
        console.warn("Unexpected response from the server:", response);
      }
    } catch (error) {
      console.error(
        "Error updating user stage:",
        error.response || error.message
      );
    }
  };

  return (
    <>
      {/* <tbody className="text-center"> */}
        {currentItems.map((item, index) => {
          return (
            <tr key={item._id}>
              <td  style={{borderLeft:"1px solid black", borderRight:"1px solid black"}}>
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              <td className="tds" title={item.name}>
                {/* {item.name.length > 20 ? item.name.substring(0,15)+"..." : item.name} */}
                {item.name}
                </td>
              <td
                id={`number-${item._id}`}
                onClick={(e) => handleNumberUpdate(item._id)}
                // id="td-style"
                className="tds"
                title={item.mobile_number}
              >
                {item.mobile_number.length > 0
                  ? item.mobile_number
                  : "Add Mobile Number"}

                {/* {item.mobile_number} */}
              </td>
              <td
                className="tds"
                onClick={(e) => handleFormClick(item._id)}
                onPointerOver={(e) => handleTableClick(item._id)}
                onClickCapture={handleover}
                // id="td-style"
                id={`over-${item._id}`}
              >
                {item.comments.length > 0 ? (
                  <p key={item.comments.at(-1)._id}>
                    {item.comments.at(-1).comment.length > 20
                      ? item.comments.at(-1).comment.slice(0, 20) + "..."
                      : item.comments.at(-1).comment}
                  </p>
                ) : (
                  <p>Add comments</p>
                )}
              </td>

              {/* {item.comments.length > 20 ? item.comments.substring(0,20)+"..." : item.comments || 'Add Comments' } */}
              
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
          (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
        )[0];

        if (!latestComment) {
          return "Follow Date & Time";
        }

        return new Date(latestComment.datetime).toLocaleString("en-IN", {
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


              <td
                onClick={(e) => handleMeetingDateClick(item._id)}
                // id="td-style"
                id={`meetingdate-${item._id}`}
                className="tds"
                title={item.meeting_time}
              >
                {/* {item.meeting_time} */}

                {item.meeting_time.length > 0
                  ? item.meeting_time
                  : "Meeting Date & Time"}
              </td>

              <td
                onClick={(e) => handleEmailUpdate(item._id)}
                // id="td-style"
                id={`email-${item._id}`}
                className="tds"
                title={item.email}
              >
                {/* {item.email} */}

                {/* {item.email.length > 0 ? item.email : "Add Email"} */}
                {item.email.length > 0 ?
                  // ? item.email.substring(0, 20) + "..."
                   item.email : "add email"}
                
              </td>
              <td className="tds" title={item.city}>

                {item.city.length > 0 ? item.city : "Add City"}
              </td>
              <td className="tds" title={item.sector}>
                {/* {item.sector}  */}
                {item.sector.length > 20
                  ? item.sector.substring(0, 20) + "..."
                  : item.sector || "add Sector"}
                {/* {item.sector.length > 0 ? item.sector : "Add Sector"} */}
              </td>

              <td
                onClick={(e) => handleAddressUpdate(item._id)}
                // id="td-style"

                id={`address-${item._id}`}
                className="tds"
                title={item.address}
              >
                {/* {item.address} */}
                {item.address.length > 20
                  ? item.address.substring(0, 20) + "..."
                  : item.address || "add address"}
              </td>

              <td
                onClick={(e) => handleQuotationClick(item._id)}
                // id="td-style"
                id={`quotation-${item._id}`}
                className="tds"
                title={`${item.quotation.items || ''}${item.quotation.amount || ''}`}
              >
                {item.quotation.items || item.quotation.amount ? (
                  <p>
                    {item.quotation.items && <p>{item.quotation.items}</p>}
                    {"-"}
                    {item.quotation.amount && <p>{item.quotation.amount}</p>}
                    /-
                  </p>
                ) : (
                  <p>Send quotation</p>
                )}
              </td>
              <td className="tds">
                {/* <Form.Select */}
                <select
                  style={{
                    border: "none",
                    padding: "5px",
                    backgroundColor: "transparent",
                    outline: "none", // Removes focus outline
                    // appearance: "none", // Removes default dropdown styling (optional)
                  }}
                  onChange={(e) => handleUpdateStage(e, item._id)}
                >
                  <option>{item.stage.length  > 0 ? item.stage : "Stage" }</option>
                  {/* <option> Stage</option> */}
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
                    outline: "none", // Removes focus outline
                    // appearance: "none", // Removes default dropdown styling (optional)
                  }}
                  onChange={(e) => handleUpdateSource(e, item._id)}
                >
                  <option>{item.source.length > 0 ? item.source : "Source"}</option>
                  {/* <option>Source </option> */}
                  <option>WhatsApp </option>
                  <option>FaceBook </option>
                  <option>Instagram</option>
                </select>
              </td>
            </tr>
          );
        })}
      {/* </tbody> */}
      <div>
        <NumberEdit />
        <Modals />
        <ModalTable />
        <SendMeetingDate />
        <EmailEdit />
        <AddressEdit />
        <SendQuotation />
      </div>
    </>
  );
};

export default TableBody;
