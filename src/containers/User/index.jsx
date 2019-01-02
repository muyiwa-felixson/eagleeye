// Third party imports
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../api-requests/index";
import { bindActionCreators } from "redux";
import { withCookies, Cookies } from "react-cookie";
import { urls } from "../../api-requests/urls";
// Local imports
import { dispatchActions } from "../../store/actions/action-config.action";
import { Login } from "./components/login";

const defaultState = {
  username: "",
  password: "",
  error: {
    message: "",
    status: false
  }
};
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  componentDidMount() {
    const { cookies } = this.props;
    if (cookies) {
      cookies.remove("token", { path: "/" });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (!prevProps.usersPending && nextProps.usersPending) {
      this.setPendingState();
    }
    if (nextProps.usersPayload && !prevProps.usersPayload) {
      this.pushPage();
    }
    if (
      prevProps.usersPending &&
      nextProps.usersError &&
      !prevProps.usersError
    ) {
      this.setError();
    }
  }
  setError = () => {
    const { usersError } = this.props;
    const { reason } = usersError;
    this.setState({
      message: reason,
      status: true
    });
  };
  pushPage = () => {
    const { cookies, usersPayload } = this.props;
    console.log(usersPayload);
    const token = usersPayload.token || usersPayload.userToken;

    if (cookies && token) {
      cookies.set("token", token, { path: "/" });
      this.props.history.push(`/projects`);
    }
  };
  setPendingState = () => {
    this.setState(() => {
      return {
        error: defaultState.error
      };
    });
  };
  submit = ref => {
    if (ref && ref.current) {
      ref.current.dispatchEvent(new Event("submit"));
    }
  };
  updateInfo = (e, name) => {
    const { target } = e;
    const { value } = target;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };
  login = e => {
    e.preventDefault();
    const { username, password, error } = this.state;
    if (!username || !password) {
      error.message = "You need to provide both username and password";
      error.status = true;
      this.setState(() => {
        return {
          error
        };
      });
    } else {
      const proxySiginin = () => {
        const inputData = { username, password };
        return getData({ url: urls.signin, context: "POST", inputData });
      };
      return this.props.dispatchActions("USERS", {
        func: proxySiginin
      });
    }
  };
  render() {
    const { usersPending } = this.props;
    const { error } = this.state;
    return (
      <div className="auth-body">
        <div className="auth-box">
          <Login
            login={this.login}
            error={error.message}
            updateInfo={this.updateInfo}
            usersPending={usersPending}
            submit={this.submit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  usersPending: users.pending,
  usersError: users.error,
  usersPayload: users.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(Auth)));
