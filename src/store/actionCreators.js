import {
  CHANGE_INPUT_VALUE,
  SEARCH_VALUE_CHANGE,
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

export const getInputChangeAction = value => ({
  type: CHANGE_INPUT_VALUE,
  value,
});

export const searchChangeAction = value => ({
  type: SEARCH_VALUE_CHANGE,
  value,
});

export const modalInputChangeAction = (value, name) => ({
  type: HANDLE_MODAL_FORM_INPUT_CHANGE,
  value,
  name,
});

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
