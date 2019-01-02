import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import "./components/flex/fonts/fonts/fonts.css";
import "./components/flex/fonts/fontello/css/flexisaf.css";
import { Body } from "./components/flex";
import ProjectList from "./containers/Projects";
import Project from "./containers/Project";
import Auth from "./containers/User/index";
import CreatUser from "./containers/CreateUser/index";
import { withCookies, Cookies } from "react-cookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  componentDidMount() {
    const { allCookies } = this.props;
    const token = allCookies["token"];
    if (token) {
      this.setState(() => {
        return {
          token
        };
      });
    }
  }
  render() {
    const { allCookies } = this.props;
    const token = allCookies["token"];
    return (
      <Body>
        <BrowserRouter>
          <Route
            render={() => {
              return (
                <React.Fragment>
                  <Route exact path="/projects" component={ProjectList} />
                  <Route exact path="/login" component={Auth} />
                  <Route exact path="/signup" component={CreatUser} />
                  <Route
                    exact
                    path="/projects/project/:name/:id"
                    component={Project}
                  />
                  <Route
                    exact={true}
                    path={`/`}
                    render={() => {
                      if (token) {
                        return (
                          <Redirect
                            to={{
                              pathname: `/projects`
                            }}
                          />
                        );
                      } else {
                        return (
                          <Redirect
                            to={{
                              pathname: `/login`
                            }}
                          />
                        );
                      }
                    }}
                  />
                </React.Fragment>
              );
            }}
          />
        </BrowserRouter>
      </Body>
    );
  }
}

export default withCookies(App);
