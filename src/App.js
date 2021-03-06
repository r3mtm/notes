import React, { Component } from 'react';
import Navbar from './component/UI/NavBar/Navbar';
import { Route, Switch } from 'react-router-dom';
import NoteEditor from './container/NoteEditor/NoteEditor';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import NoteViewer from './container/NoteViewer/NoteViewer';
import TodoViewer from './container/Todo/Viewer/TodoViewer';
import TodoEditor from './container/Todo/Editor/TodoEditor';
import TestComponent from './TestComponent'
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import './App.css';
import Homepage from './container/Homepage/Homepage';

let routes = null;

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/note" component={NoteEditor} />
          <Route path="/logout" component={Logout} exact />
          <Route path="/login" component={Auth} exact />
          <Route path="/todo" component={TodoEditor} />
          <Route path="/todoviewer" component={TodoViewer} />
          <Route path="/noteviewer" component={NoteViewer} />
          <Route path="/test" component={TestComponent} />
          <Route path="/" component={Homepage} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/todoviewer" component={TodoViewer} />
          <Route path="/note" component={NoteEditor} />
          <Route path="/todo" component={TodoEditor} />
          <Route path="/login" component={Auth} exact />
          <Route path="/noteviewer" component={NoteViewer} />
          <Route path="/test" component={TestComponent} />
          <Route path="/" component={Homepage} />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <Navbar />
        {routes}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
}

export const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
