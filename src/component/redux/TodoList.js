import React from 'react';
import {
  FormControl,
  Button,
  ListGroup,
  Container,
  Row,
  Col,
  ButtonToolbar,
  InputGroup,
  Table,
} from 'react-bootstrap';
import store from '../../store/index.js';
import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
} from '../../store/actionTypes.js';
import {
  getTodoList,
  getInputChangeAction,
  getDeleteItemAction,
  initListAction,
  showregistermodal,
  getInitList,
} from '../../store/actionCreators.js';
import { FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';
import StudentModal from './StudentModal.js';

// const data = [
//   { id: 101, name: 'Racing car sprays burning fuel into crowd.' },
//   { id: 102, name: 'Japanese princess to wed commoner.' },
//   { id: 103, name: 'Australian walks 100km after outback crash.' },
//   { id: 104, name: 'Man charged over missing wedding girl.' },
//   { id: 105, name: 'Los Angeles battles huge wildfires.' },
// ];

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
    console.log(this.state);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
    // console.log('store change');
  };

  //使用 thunk處理的模式
  // componentDidMount() {
  //   const action = getTodoList();
  //   store.dispatch(action);
  // }

  componentDidMount() {
    const action = getInitList();
    store.dispatch(action);
    // console.log(action);
    // try {
    //   const response = await fetch('http://localhost:5555/students', {
    //     method: 'GET',
    //     headers: new Headers({
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     }),
    //   });
    //   // if (!response.ok) throw new Error(response.statusText);
    //   const jsonObject = await response.json();
    //   const action = initListAction(jsonObject);
    //   await store.dispatch(action);
    //   // console.log(jsonObject);
    //   // const action = initListAction(jsonObject);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    // }
  }

  handleInputChange = e => {
    const action = getInputChangeAction(e.target.value);

    store.dispatch(action);
    // console.log(e.target.value);
  };

  // handleItemDelete = id => () => {
  //   const action = getDeleteItemAction(id);
  //   store.dispatch(action);
  // };
  handleAddModalShow = () => {
    const action = showregistermodal();
    store.dispatch(action);
  };

  handleItemDelete = id => () => {
    const action = getDeleteItemAction(id);
    store.dispatch(action);
  };

  render() {
    return (
      <>
        <StudentModal />
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h1>學生管理資料庫</h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <ButtonToolbar>
                <Button variant="primary" onClick={this.handleAddModalShow}>
                  <FaPlus /> 新增
                </Button>
              </ButtonToolbar>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  name="searchText"
                  placeholder="輸入姓名進行搜尋"
                  value={this.state.searchText}
                  onChange={this.handleSearchTextChange}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>學號</th>
                    <th>姓名</th>
                    <th>出生年月日</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.birth}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          // onClick={this.handleEditModalShow(item.id)}
                        >
                          <FaPen /> 編輯
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={this.handleItemDelete(item.id)}
                        >
                          <FaTrashAlt /> 刪除
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TodoList;
