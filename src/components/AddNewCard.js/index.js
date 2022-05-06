import React, { useState } from "react";
import "./addnewcard.css";
import { useSelector, useDispatch } from "react-redux";
import { addList, inputAddList } from "../Redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNewCard(props) {
  const [nullCheckName, setNullCheck] = useState(false);

  const dispatch = useDispatch();
  const listInputValue = useSelector((state) => state.addList.inputList);

  const changeInput = (e) => {
    dispatch(inputAddList(e.target.value));
    props.submitButton(false);
  };

  const submitList = () => {
    if (!listInputValue) {
      setNullCheck(true);
      toast.error("Please Enter ListName!");
    } else {
      dispatch(addList());
      setNullCheck(false);
      props.submitButton(true);
      toast.success("List Added Successfully!");
    }
  };
  return (
    <>
      <div className="addnewCardMain">
        <div>
          <input
            onChange={changeInput}
            style={{ width: "95%", padding: "5px" }}
            placeholder="Enter listTile"
            value={listInputValue}
          />
        </div>
        <div>
          <button onClick={submitList} className="addlistbutton">
            ADD LIST
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
