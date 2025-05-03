import React, { useState } from "react";
import {Table,Overlay,Popover} from "react-bootstrap";
import { Search, XLg } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import"../../assets/style/employecss/ModalTable.css";
import { setHandleClose } from "../../redux/slice/EmployeSlice/ModalTableSlice";

const ModalTable = ({ commentitem }) => {
  let data = useSelector((state) => state.employeedata);
  let dispatch = useDispatch();
  let { Cshow, Ctarget, tableid } = useSelector((state) => state.modaltable);

  let handleClose = () => {
    dispatch(setHandleClose(false));
  };

  return (
    <>
      <Overlay
        show={Cshow}
        target={() => document.getElementById(Ctarget)}
        placement="right"
        containerPadding={20}
      >
        <Popover id="popover-contained" onPointerLeave={handleClose}>
          <Popover.Header as="h3" closeButton>
            Comments <XLg onClick={handleClose} className="XLgModalTable" />{" "}
          </Popover.Header>
          <Popover.Body>
            {/* <div className="container-fluid mt-8"> */}
              <div className="tableResponsive">
                <Table
                  responsive="sm"
                  className="border border-dark "
                  bordered
                  // hover
                >
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Call Result</th>
                      <th>Entry Date & Time</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
  {data.map((item) =>
    item._id === tableid && item.comments?.length > 0
      ? [...item.comments]
          .sort((a, b) => b._id.localeCompare(a._id)) // Sort by MongoDB ObjectId
          .map((comment, index) => (
            <tr key={comment._id}>
              <td>{index + 1}</td>
              <td>{comment.call}</td>
              <td>{comment.timedate}</td>
              <td className="text-wrap">{comment.comment}</td>
            </tr>
          ))
      : null
  )}
</tbody>
                </Table>
              </div>
            {/* </div> */}
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default ModalTable;
