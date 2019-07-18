import React from 'react';
import store from '../store/index.js';
import { Link, Redirect, withRouter } from 'react-router-dom';

class studentDetail extends React.Component {
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

  render() {
    const studentData = this.state.list.find(
      item => item.id === +this.match.params.id
    );
    console.log(studentData);
    return (
      <>
        {studentData ? (
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">姓名：{studentData.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">學號：{studentData.id}</li>
              <li className="list-group-item">
                出生年月日：{studentData.birth}
              </li>
            </ul>
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            沒找到資料
          </div>
        )}
      </>
    );
  }
}

export default withRouter(studentDetail);
