import React, { lazy, Suspense } from "react";
import "./list.css";
// import Card from '../Card'
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  addCard,
  deleteList,
  globalIndexList,
  inputAddCardDesc,
  inputAddCardTitle,
} from "../Redux/action";
import { get } from "lodash-es";
import { getLocalArray } from "../config/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// To load component Dynamically
const Card = lazy(() => import("../Card"));


export default function List({ listTitle, index }) {
  const dispatch = useDispatch();
  
  const cardLocalArray = getLocalArray("listArray");
  const cardReduxArray = useSelector((state) =>
    get(state.addList.listArray[index], "cardArray", [])
  );

  const cardArray = cardLocalArray
    ? cardLocalArray[index]?.cardArray
    : cardReduxArray;

  const inputTitle = useSelector(
    (state) => state.addList.listArray[index]?.inputTitle
  );
  const inputDesc = useSelector(
    (state) => state.addList.listArray[index]?.inputDesc
  );

  //  Add card input and saved in redux store
  const inputChange = (e, type) => {
    if (type === "TITLE") {
      dispatch(
        inputAddCardTitle({ name: "inputTitle", index, value: e.target.value })
      );
    } else if (type === "DESC") {
      dispatch(
        inputAddCardDesc({ name: "inputTitle", index, value: e.target.value })
      );
    }
  };

  // Submit Card

  const submitCard = () => {
    if (!inputDesc || !inputTitle) {
      if (!inputTitle) {
        toast.error("Please Enter Title!");
      } else if (!inputDesc) {
        toast.error("Please Enter Text for card!");
      }
    }
    else{
      dispatch(globalIndexList(index));
      dispatch(addCard(index));
    }
    
  };

  // Render Cards Function

  const renderCards = () => {
    return cardArray.map((item, ind) => {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Card inputDesc={item.inputDesc} inputTitle={item.inputTitle} cardIndex={ind} listIndex={index} />
         </Suspense>
      );
    });
  };

  return (
    <>
      <div key={index} className="mainList">
        <div className="listTopHead">
          <span>{listTitle}</span>
          <span
            onClick={() => {
              dispatch(deleteList(index));
            }}
          >
            <GrClose />
          </span>
        </div>

        {cardArray && cardArray.length > 0 && renderCards()}
        <div className="defaultInputs">
          <div className="cardName">
            <input
              value={inputTitle}
              onChange={(e) => inputChange(e, "TITLE")}
              className="inputDefault1 commonInput"
              placeholder="Enter title"
            />
          </div>
          <div className="cardDesc">
            <input
              value={inputDesc}
              onChange={(e) => inputChange(e, "DESC")}
              className="inputDefault2 commonInput"
              placeholder="Enter text for this card"
            />
          </div>
        </div>
        <button className="addCard" onClick={submitCard}>
          Add Card
        </button>
        <ToastContainer position="bottom-right" />

      </div>

    </>
  );
}
