import {
  CHANGE_INPUT_VALUE,
  ADD_STUDENT_ITEM,
  EDIT_STUDENT_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION,
  SHOW_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  HANDLE_MODAL_FORM_INPUT_CHANGE,
  GET_INIT_LIST,
  SHOW_EDIT_MODAL,
} from './actionTypes.js';
import { type } from 'os';

export const getInputChangeAction = value => ({
  type: CHANGE_INPUT_VALUE,
  value,
});

export const modalInputChangeAction = (value, name) => ({
  type: HANDLE_MODAL_FORM_INPUT_CHANGE,
  value,
  name,
});

// export const getAddItemAction = () => ({
//   type: ADD_TODO_ITEM,
// });

export const DeleteItemAction = item => ({
  type: DELETE_TODO_ITEM,
  item,
});

export const initListAction = data => ({
  type: INIT_LIST_ACTION,
  data,
});

export const showregistermodal = () => ({
  type: SHOW_REGISTER_MODAL,
});

export const closeRegisterModal = () => ({
  type: CLOSE_REGISTER_MODAL,
});

export const getInitList = () => ({
  type: GET_INIT_LIST,
});

export const addItemAction = item => ({
  type: ADD_STUDENT_ITEM,
  item,
});

export const editItemAction = newData => ({
  type: EDIT_STUDENT_ITEM,
  newData,
});

export const showEditModal = id => ({
  type: SHOW_EDIT_MODAL,
  id,
});

//thunk用法
// export const getTodoList = () => {
//   return async dispatch => {
//     try {
//       const response = await fetch('http://localhost:5555/students', {
//         method: 'GET',
//         headers: new Headers({
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         }),
//       });
//       // if (!response.ok) throw new Error(response.statusText);
//       const jsonObject = await response.json();
//       const action = initListAction(jsonObject);
//       dispatch(action);
//       // console.log(jsonObject);
//       // const action = initListAction(jsonObject);
//       // await store.dispatch(action);
//     } catch (e) {
//       console.log(e);
//     } finally {
//     }
//   };
// };
