import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Task from './components/task/Task';
import Edit from './components/task/Edit';
import Create from './components/task/Create';
import Container from '@material-ui/core/Container';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/task/:taskId"} component={Task}/>
          <Route path={"/edit/:taskId"} component={Edit}/>
          <Route path={"/create"} component={Create} />
        </Switch>
      </Container>
    </div>
  );
}
export default App;