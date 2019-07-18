import {
  INIT_LIST_ACTION,
  CHANGE_INPUT_VALUE,
  SHOW_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  HANDLE_MODAL_FORM_INPUT_CHANGE,
  SHOW_EDIT_MODAL,
} from './actionTypes.js';

const defaultState = {
  inputValue: '',
  // 學生的資料，注意應該預設值是空陣列，而不是null或空物件
  list: [],
  //Modal的開關狀態
  showModal: false,
  // 控制是否讓學號(id)欄位變為不可變更(disabled)
  disableIdField: false,
  // 給跳出視窗中的表單欄位對照變動用的state
  // 預設資料應該為要處理的各種資料類型的初始值
  id: 0,
  name: '',
  birth: 0,
};

//reducer 可以接受state, 但絕不能修改state
export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === HANDLE_MODAL_FORM_INPUT_CHANGE) {
    const newState = JSON.parse(JSON.stringify(state));
    for (var s in newState) {
      if (s === action.name) {
        newState[s] = action.value;
        // 注意：id(學號)與生日，需先轉為數字類型再進入state中
        if (action.name === 'id' || action.name === 'birth')
          action.value = +action.value;
        console.log(s, newState[s]);
      }
    }
    return newState;
  }

  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data;
    return newState;
  }

  // if (action.type === ADD_TODO_ITEM) {
  //   const newState = JSON.parse(JSON.stringify(state));
  //   const item = {
  //     id: state.id,
  //     name: state.name,
  //     birth: state.birth,
  //   };
  //   newState.list = [item, ...newState.list];
  //   // newState.list.push(newState.inputValue);
  //   newState.id = 0;
  //   newState.name = '';
  //   newState.birth = 0;
  //   newState.showModal = false;
  //   return newState;
  // }

  // if (action.type === DELETE_TODO_ITEM) {
  //   const newState = JSON.parse(JSON.stringify(state));
  //   const arr = newState.list.filter(item => item.id !== action.id);
  //   newState.list = arr;
  //   console.log(newState.list);
  //   return newState;
  // }

  if (action.type === SHOW_REGISTER_MODAL) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.disableIdField = false;
    newState.showModal = true;
    return newState;
  }

  if (action.type === SHOW_EDIT_MODAL) {
    const newState = JSON.parse(JSON.stringify(state));
    console.log(action.id);
    const item = newState.list.find(item => item.id === action.id);
    console.log(item);
    newState.id = item.id;
    newState.name = item.name;
    newState.birth = item.birth;
    newState.disableIdField = true;
    newState.showModal = true;
    return newState;
  }

  if (action.type === CLOSE_REGISTER_MODAL) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.showModal = false;
    newState.id = 0;
    newState.name = '';
    newState.birth = 0;
    return newState;
  }

  console.log(state, action);
  return state;
};
