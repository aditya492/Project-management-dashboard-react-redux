import React, { memo } from "react";
import "./card.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteCard, globalIndexCard, globalIndexList } from "../Redux/action";

function Card({ inputDesc, inputTitle, cardIndex,listIndex }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="topCard">
        <div className="mainCard">
          <span className="crossIcon">{inputTitle}</span>

          <span
            className="crossIcon"
            onClick={() => {
              dispatch(globalIndexList(listIndex));
              dispatch(globalIndexCard(cardIndex));
              dispatch(deleteCard());
            }}
            style={{cursor:"pointer"}}

          >
            <GrClose />
          </span>
        </div>
        <div className="description">{inputDesc}</div>
      </div>
    </>
  );
}
export default memo(Card);
