import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST, ADD_TODO_ITEM } from './actionTypes.js';
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
    console.log(jsonObject);
    const action = initListAction(jsonObject);
    console.log(action);
    yield put(action);
  } catch (e) {
    console.log(e);
  }
}

function* addItemAction(newItem) {
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
//generator 函數
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
  yield takeEvery(ADD_TODO_ITEM, addItemAction);
}

export default mySaga;
