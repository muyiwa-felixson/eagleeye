import React, { Component } from "react";
// third party imports
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import "./components/flex/fonts/fonts/fonts.css";
import "./components/flex/fonts/fontello/css/flexisaf.css";
import { Body } from "./components/flex";
import ProjectList from "./containers/Projects";
import Project from "./containers/Project";

class App extends Component {
  render() {
    return (
      <Body>
        <BrowserRouter>
          <Route
            render={() => {
              <React.Fragment>
                <Route exact path="/projects" component={ProjectList} />
                <Route
                  exact
                  path="/projects/project/:name/:id"
                  component={Project}
                />
                <Route
                  exact={true}
                  path={`/`}
                  render={() => (
                    <Redirect
                      to={{
                        pathname: `/projects`
                      }}
                    />
                  )}
                />
              </React.Fragment>;
            }}
          />
        </BrowserRouter>
      </Body>
    );
  }
}

export default App;
