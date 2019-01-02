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
import { Signup } from "./components/signup";
import { Loader } from "../../components/flex/Loader/Loader.components";

const defaultState = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  group: "",
  error: {
    message: "",
    status: false
  }
};
class CreatUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  componentDidMount() {
    const { cookies } = this.props;
    if (cookies) {
      const token = cookies.get("token");
      if (!token) {
        this.props.history.push(`/login`);
      }
      const proxyGetInfo = () => {
        return getData({ url: urls.verify({ token }) });
      };
      console.log(urls.verify({ token }), " url being sent");
      this.props.dispatchActions("USER_INFO", { func: proxyGetInfo });
    } else {
      this.props.history.push(`/login`);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (prevProps.userInfoPending && nextProps.userInfoPayload) {
      const { permissionList } = nextProps.userInfoPayload;
      this.checkPermissions(permissionList);
    }
    // if (nextProps.signupPending) {
    //   this.setPendingState();
    // }
  }

  checkPermissions = permissionList => {
    const defaultPagePermission = "Can create users";
    if (permissionList.findIndex(perm => perm === defaultPagePermission) < 0) {
      this.props.history.push(`/login`);
    }
  };

  setError = () => {
    const { usersError } = this.props;
    const { reason } = usersError;
    this.setState({
      message: reason,
      status: true
    });
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
    let target;
    let value;
    try {
      target = e.target;
      value = target.value;
    } catch (error) {
      value = e.value;
    }
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };
  signup = e => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      username,
      password,
      error,
      group
    } = this.state;
    if (!username || !password || !firstname || !lastname || !group) {
      error.message = "You need to provide all the field information";
      error.status = true;
      this.setState(() => {
        return {
          error
        };
      });
    } else {
      const proxySignup = () => {
        const inputData = {
          username,
          password,
          firstname,
          lastname,
          group,
          token: this.props.userInfoPayload.token
        };
        return getData({ url: urls.signup, context: "POST", inputData });
      };
      return this.props.dispatchActions("SIGNUP", {
        func: proxySignup
      });
    }
  };
  render() {
    const { signupPending, userInfoPending } = this.props;
    const { error } = this.state;
    if (userInfoPending) {
      return <Loader />;
    } else {
      return (
        <div className="auth-body">
          <div className="auth-box">
            <Signup
              signup={this.signup}
              error={error.message}
              updateInfo={this.updateInfo}
              signupPending={signupPending}
              submit={this.submit}
            />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ userInfo, signup }) => ({
  userInfoPending: userInfo.pending,
  userInfoError: userInfo.error,
  userInfoPayload: userInfo.payload,
  signupPending: signup.pending,
  signupPayload: signup.payload,
  signupError: signup.error
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(CreatUser)));
