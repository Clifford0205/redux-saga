import { takeEvery, put } from 'redux-saga/effects';
import {
  GET_INIT_LIST,
  ADD_STUDENT_ITEM,
  EDIT_STUDENT_ITEM,
  DELETE_TODO_ITEM,
} from './actionTypes.js';
import { initListAction, closeRegisterModal } from './actionCreators';

function* getInitList() {
  try {
    const response = yield fetch('http://localhost:5555/students', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    // if (!response.ok) throw new Error(response.statusText);
    const jsonObject = yield response.json();
    jsonObject.reverse();
    const action = initListAction(jsonObject);
    console.log(action);
    yield put(action);
  } catch (e) {
    console.log(e);
  }
}

function* addItemAction(newItem) {
  console.log(newItem);
  console.log(newItem.item);
  try {
    const data = newItem.item;

    const response = yield fetch('http://localhost:5555/students', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const jsonObject = yield response.json();

    console.log(jsonObject);
    yield getInitList();
    const action = closeRegisterModal();
    yield put(action);
    // console.log(action);
    // yield put(action);
  } catch (e) {
    console.log(e);
  }
}

function* deleteItem(newItem) {
  try {
    const data = newItem.item.id;
    console.log(data);
    const response = yield fetch('http://localhost:5555/students/' + data, {
      method: 'DELETE',
    });
    const jsonObject = yield response.json();

    console.log(jsonObject);
    yield getInitList();
    // console.log(action);
    // yield put(action);
  } catch (e) {
    console.log(e);
  }
}

function* editItem(newItem) {
  console.log(newItem.newData);
  try {
    const studentID = newItem.newData.id;
    const data = newItem.newData;

    const response = yield fetch(
      'http://localhost:5555/students/' + studentID,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    );
    const jsonObject = yield response.json();

    console.log(jsonObject);
    yield getInitList();
    const action = closeRegisterModal();
    yield put(action);
    // console.log(action);
    // yield put(action);
  } catch (e) {
    console.log(e);
  }
}

//generator 函數
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
  yield takeEvery(ADD_STUDENT_ITEM, addItemAction);
  yield takeEvery(DELETE_TODO_ITEM, deleteItem);
  yield takeEvery(EDIT_STUDENT_ITEM, editItem);
}

export default mySaga;
