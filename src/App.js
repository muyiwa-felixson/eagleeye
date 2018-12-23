import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/flex/fonts/fonts/fonts.css';
import './components/flex/fonts/fontello/css/flexisaf.css';
import { Body } from './components/flex';
import ProjectList from './containers/Projects';
import Project from './containers/Project';

class App extends Component {
  render() {
    return (
      <Body>
        <ProjectList />
        {/* <Project /> */}
      </Body>
    );
  }
}

export default App;
