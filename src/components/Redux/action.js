
// Add Lists Actions

export const addList = (value) => {
    return { type: "ADD_LIST" };
  };

export const inputAddList=(value)=>{
    return { type: "INPUT_ADDLIST",payload:value };
}


// Add Card Actions

export const addCard = () => {
    return { type: "ADD_CARD" };
  };

export const inputAddCardTitle=(value)=>{
    return { type: "INPUT_ADD_TITLE",payload:value };
}

export const inputAddCardDesc=(value)=>{
    return { type: "INPUT_ADD_DESC",payload:value };
}


// Delete list

export const deleteList=(value)=>{
  return { type: "DELETE_LIST",payload:value };
}

// Delete card
export const deleteCard=(value)=>{
  return { type: "DELETE_CARD",payload:value };
}



// Index
export const globalIndexList=(value)=>{
  return { type: "SET_LIST_INDEX",payload:value };
}

// Index
export const globalIndexCard=(value)=>{
  return { type: "SET_CARD_INDEX",payload:value };
}