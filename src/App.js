import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import TodoList from './component/TodoList';
import studentDetail from './page/studentDetail';

function App() {
  return (
    <>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={TodoList} />
            <Route path="/student/:id" component={studentDetail} />
            {/* <Route path="/student" component={Student} /> */}
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App;
