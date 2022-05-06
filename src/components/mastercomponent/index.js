import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocalArray } from "../config/storage.js";
import List from "../Lists";
import "./masterComponent.css";

const AddNewCard = lazy(() => import("../AddNewCard.js"));

export default function MasterComponent() {
 
  const localListArray=getLocalArray('listArray');
  const reduxLocalArray=useSelector((state) => state.addList.listArray);
  const[listt,setlist]=useState(false)
  const listArray =localListArray ? localListArray : reduxLocalArray

  
  const submitClicked=(val)=>{
    setlist(val);
  }


  // Render Lists Function

  const renderList=()=>{
    return listArray.map((item,index)=>{
      return <List listTitle={item.listName} index={index}/>
    });
  }

  

  return (
    <>
      <div className="header">
        <span style={{color:"#606060"}} >DASHBOARD</span>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>} ><AddNewCard submitButton={submitClicked} /></Suspense>
      </div>
      <div className="listDiv">
       {listArray.length>0 ? renderList() :<div>No Lists are there!</div>}
      </div>
    </>
  );
}
