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

import { connect } from "react-redux";
import { dispatchActions } from "./store/actions/action-config.action";
import { getData } from "./api-requests/index";
import { bindActionCreators } from "redux";
import { urls } from "./api-requests/urls";
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      canCreateReports: false,
      canEditReports: false,
      canInitiatePayment: false
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
      const proxyGetInfo = () => {
        return getData({ url: urls.verify({ token }) });
      };
      this.props.dispatchActions("USER_INFO", { func: proxyGetInfo });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (!prevProps.userInfoPayload && nextProps.userInfoPayload) {
      this.checkInfo();
    }
  }
  checkInfo = () => {
    console.log('checkInfo called');
    const { userInfoPayload, userInfoError, history } = this.props;
    if (userInfoPayload && !userInfoError) {
      const { permissionList } = userInfoPayload;
      console.log(permissionList)
      const tcanCreateReports = "Can create reports";
      const tcanInitiatePayment = "Can initiate payments";
      const tcanEditReports = "Can edit reports";
      const indexCreateReports = permissionList.findIndex(
        p => p === tcanCreateReports
      );
      const indexPayment = permissionList.findIndex(
        p => p === tcanInitiatePayment
      );
      const indexEdit = permissionList.findIndex(p => p === tcanEditReports);
      this.setState(() => {
        return {
          canCreateReports: indexCreateReports > -1,
          canEditReports: indexEdit > -1,
          canInitiatePayment: indexPayment > -1
        };
      });
    }
  };
  render() {
    const { allCookies } = this.props;
    const token = allCookies["token"];
    const { canCreateReports, canEditReports, canInitiatePayment } = this.state;
    return (
      <Body>
        <BrowserRouter>
          <Route
            render={() => {
              return (
                <React.Fragment>
                  <Route
                    exact
                    path="/projects"
                    render={props => {
                      return (
                        <ProjectList
                          {...props}
                          canInitiatePayment={canInitiatePayment}
                          canCreateReports={canCreateReports}
                          canEditReports={canEditReports}
                        />
                      );
                    }}
                  />
                  <Route exact path="/login" component={Auth} />
                  <Route exact path="/signup" component={CreatUser} />
                  <Route
                    exact
                    path="/projects/project/:name/:id"
                    render={props => {
                      return (
                        <Project
                          {...props}
                          canInitiatePayment={canInitiatePayment}
                          canCreateReports={canCreateReports}
                          canEditReports={canEditReports}
                        />
                      );
                    }}
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

const mapStateToProps = ({ userInfo }) => ({
  userInfoPending: userInfo.pending,
  userInfoError: userInfo.error,
  userInfoPayload: userInfo.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(App));
