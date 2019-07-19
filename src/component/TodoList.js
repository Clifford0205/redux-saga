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
import store from '../store/index.js';
import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
} from '../store/actionTypes.js';
import {
  getTodoList,
  getInputChangeAction,
  searchChangeAction,
  DeleteItemAction,
  initListAction,
  showregistermodal,
  getInitList,
  showEditModal,
} from '../store/actionCreators.js';
import { FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';
import StudentModal from './StudentModal.js';
import { Link, Redirect, withRouter } from 'react-router-dom';

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

  //生命週期:一開始載入資料
  componentDidMount() {
    const action = getInitList();
    store.dispatch(action);
  }

  //編輯 註冊的欄位值改變
  handleInputChange = e => {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  };

  // 處理搜尋字串的填寫，因為是可控元件
  handleSearchTextChange = e => {
    const action = searchChangeAction(e.target.value);
    store.dispatch(action);
  };

  //控制modal出現
  handleAddModalShow = () => {
    const action = showregistermodal();
    store.dispatch(action);
  };

  //刪除一整列
  handleItemDelete = item => () => {
    const action = DeleteItemAction(item);
    store.dispatch(action);
  };

  // 開啟編輯用的跳出視窗
  handleEditModalShow = id => () => {
    const action = showEditModal(id);
    store.dispatch(action);
  };

  render() {
    let data = this.state.list;

    if (this.state.searchText && this.state.searchText.trim() !== '') {
      data = this.state.list.filter(item => {
        return item.name.includes(this.state.searchText);
      });
    }

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
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.birth}</td>

                      <td>
                        <Button
                          variant="warning ml-1"
                          size="sm"
                          onClick={this.handleEditModalShow(item.id)}
                        >
                          <FaPen /> 編輯
                        </Button>
                        <Button
                          variant="danger ml-1"
                          size="sm"
                          onClick={this.handleItemDelete(item)}
                        >
                          <FaTrashAlt /> 刪除
                        </Button>
                        <Button variant="success ml-1">
                          <Link
                            to={'/student/' + item.id}
                            className="text-body "
                          >
                            詳細頁面
                          </Link>
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

export default withRouter(TodoList);
