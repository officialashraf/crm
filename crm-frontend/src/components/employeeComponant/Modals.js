import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Overlay, Button } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { addComment } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import axios from "axios";
import { ResponsiveDateTimePickers } from "./ResponsiveDateTimePickers";
import { setClose ,setBShow} from "../../redux/slice/EmployeSlice/ModalSlice";
import Modal from "../../assets/style/employecss/Modal.css";
import API_URL from "../../utils/API_URL";

let Modals = () => {
  let [call, setCall] = useState("");
  let [datetime, setDateTime] = useState();
  let [comment, setComment] = useState("");

  let dispatch = useDispatch();
  const data = useSelector((state) => state.employeedata);
  const { Bshow, Btarget, userId } = useSelector((state) => state.modal);

  const handledatetime = (date) => {
    setDateTime(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newDates = new Date();

    let newcomment = {
      call: call,
      timedate: new Date().toLocaleString("en-IN"),
      comment: comment,
      datetime: datetime ? new Date(datetime) : null,
    };
    if (!newcomment.call || !newcomment.comment) {
      console.error("Please fill in all required fields");
      return;
    }

    if (
      !newcomment.datetime ||
      isNaN(newcomment.datetime.getTime()) ||
      newcomment.datetime < newDates
    ) {
      const initialDate = new Date();
      initialDate.setHours(initialDate.getHours() + 24);
      newcomment.datetime = initialDate;
    }
    if (!newcomment) return;

    const user = data.find((user) => user._id === userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    const addUser = {
      ...data.find((user) => user._id === userId),
      comments: [
        ...(data.find((user) => user._id === userId)?.comments || []),
        newcomment,
      ],
    };

    try {
      const response = await axios.put(
        `${API_URL}${userId}`,
        addUser
      );
      dispatch(addComment({ userId, comment: newcomment }));
    } catch (error) {
      console.log("error", error);
    }finally{
      
      handleClear();
      // dispatch(setBShow(false))
    }
  };

  const handleClear = () => {
    dispatch(setClose(false));
    setCall("");
    setComment("");
    setDateTime(null);
  };

  return (
    <>
      <Overlay
        show={Bshow}
        target={() => document.getElementById(Btarget)}
         placement="right"
        containerPadding={20}
      >
        {/* onMouseLeave={handleClear} */}
        <Popover id="popoverId" className="overlay" >
          <Popover.Header as="h3">
            Comments <XLg onClick={handleClear} id="XlgId" />
          </Popover.Header>
          <Popover.Body>
            <form
              onSubmit={handleSubmit}
              className="row justify-content-center"
              id="formId"
            >
              <div className="col-row">
                <select
                  name="call"
                  value={call}
                  // title="Select an option"
                  class="form-select my-2"
                  onChange={(e) => setCall(e.target.value)}
                >
                  <option value="" hidden> Select an option </option>
                  <option>Follow Up scheduled</option>
                  <option>Call Picked Up</option>
                  <option>Call Not Picked Up</option>
                  <option>Interested</option>
                  <option>Not Interested</option>
                </select>
              </div>
              <br />
              <div className="col-row">
                <label className="form-label">Comments</label>
                <textarea
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-control my-2"
                ></textarea>
              </div>

              <br />
              <div className="col-row">
                <label className="form-label">Follow Date & Time</label>
                <br />
                <ResponsiveDateTimePickers
                  onChange={handledatetime}
                  value={datetime}
                  newDates={new Date()}
                />
              </div>
              <div id="buttonId" className="d-grid">
                <Button type="submit" variant="dark">
                  Save Changes
                </Button>
              </div>
            </form>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
export default Modals;
