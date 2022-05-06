import { uniq } from "lodash-es";
import { get, pullAt } from "lodash-es";
import { getLocalArray, setLocalArray } from "../../config/storage";

const initial = {
  listArray: getLocalArray("listArray") ? getLocalArray("listArray") : [],
  inputList: "",
  cardArray: [],
  inputTitle: "",
  inputDesc: "",
  indexT: "",
  indexCard:""
};

const addList = (state = initial, action) => {
  switch (action.type) {
    // Add list 
    case "ADD_LIST": {
      let { listArray, inputList, inputTitle, inputDesc } = state;
      const list = [
        ...listArray,
        { listName: inputList, inputTitle: "", inputDesc: "", cardArray: [] },
      ];
      setLocalArray('listArray',list)
      return { ...state, listArray: list, inputList: "" };
    }

    case "INPUT_ADDLIST": {
      const { payload } = action;
      const { listArray } = state;
      return { ...state, inputList: payload };
    }

    // Add Card
    case "INPUT_ADD_TITLE": {
      const { name, index, value } = action.payload;
      const { listArray, indexT } = state;
      const { payload } = action;
      listArray[index].inputTitle = value;
      return { ...state, listArray: [...listArray], indexT: index };
    }

    case "INPUT_ADD_DESC": {
      const { name, index, value } = action.payload;
      const { listArray, indexT } = state;
      listArray[index].inputDesc = value;
      return { ...state, listArray: [...listArray], indexT: index };
    }

    case "ADD_CARD": {
      const{payload}=action;
      let { inputTitle, inputDesc, listArray, indexT } = state;
      inputDesc = listArray[indexT].inputDesc;
      inputTitle = listArray[indexT].inputTitle;
      listArray[indexT].cardArray.push({ inputDesc, inputTitle });
      setLocalArray('listArray',listArray)

      listArray[indexT].inputDesc = "";
      listArray[indexT].inputTitle = "";
      return { ...state, listArray: [...listArray], inputList: "",indexT };
    }

    // Delete List and cards

    case "DELETE_LIST": {
      const { payload } = action;
      let { inputTitle, inputDesc, listArray, indexT } = state;
      pullAt(listArray, [payload]);
      setLocalArray('listArray',listArray)
      return { ...state, listArray: uniq(listArray), inputList: "" };
    }


    case 'DELETE_CARD':{
       const { payload } = action;
      let { inputTitle, indexCard, listArray, indexT } = state;
      // const filteredSchema = pullAt(listArray, [payload]);

      const cardArray=listArray[indexCard]?.cardArray;
      const filteredArray= pullAt(cardArray,[payload])    
      listArray[indexCard].cardArray=filteredArray;
      return { ...state, listArray:uniq(listArray), inputList: "" };
    }

    case "SET_LIST_INDEX":{
      const{payload}=action;
      return { ...state,indexT:payload };

    }
    case 'SET_CARD_INDEX':{
      const{payload}=action;
      return { ...state,indexCard:payload };
    }

    default:
      return state;
  }
};

export default addList;
