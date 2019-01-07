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
import { Relative } from "../../containers/Projects/components";
import { ProjectAdd } from "../../commons/index";
import { Loader } from "../../components/flex/Loader/Loader.components";
import { Boxed, FlexiTable, ModalComponent, PaleButton, Grid, Button } from "../../components/flex";

const defaultState = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  success: false,
  group: "",
  userModal: false,
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
    if (!prevProps.signupPending && nextProps.signupPending) {
      this.setPendingState();
    }
    if (!prevProps.signupPayload && nextProps.signupPayload) {
      this.props.history.push(`/projects`);
    }
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
    // PLEASE NOTE I ADDED THIS PART TO CLOSE THE MODAL ON SAVE //
    this.closeUserModal();
    // PLEASE NOTE I ADDED THIS PART TO CLOSE THE MODAL ON SAVE //
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

  closeUserModal = () => {
    this.setState({
      userModal: false
    })
  }

  columns = [{
    title: 'First Name', dataIndex: 'firstname', key: 'firstname',
  }, {
    title: 'Last Name', dataIndex: 'lastname', key: 'lastname',
  }, {
    title: 'Email', dataIndex: 'email', key: 'email',
  }, {
    title: 'User Group', dataIndex: 'usergroup', key: 'usergroup', width: 200
  },
  {
    title: 'Actions', dataIndex: '', key: 'operations', render: () => <PaleButton small>Delete</PaleButton>, width: 100
  },];


  data = [
    { firstname: 'Jack', lastname: 'Reacher', email: 'jack@reacher.com', usergroup: 'Super Admin' },
    { firstname: 'Peter', lastname: 'Parker', email: 'peter@spidey.com', usergroup: 'Super Admin' },
    { firstname: 'Clark', lastname: 'Kent', email: 'kent@dailyplanet.com', usergroup: 'Super Admin' },
    { firstname: 'Bruce', lastname: 'Wayne', email: 'bruce@darkknight.com', usergroup: 'Super Admin' },
    { firstname: 'Barry', lastname: 'Allen', email: 'allen@csi.com', usergroup: 'Super Admin' },
    { firstname: 'Jack', lastname: 'Ryan', email: 'jack@ryan.com', usergroup: 'Admin' }
  ];


  render() {
    const { signupPending, userInfoPending } = this.props;
    const { error } = this.state;
    if (userInfoPending) {
      return <Loader />;
    } else {
      return (
        <Relative>
          <ProjectAdd />
          <div className="auth-body">
            <Boxed margin="0 auto" pad="120px 30px 30px 30px">
              <Grid default="auto 150px">
                <div />
                <Button onClick={() => this.setState({ userModal: true })}>Add User</Button>
              </Grid>
              <FlexiTable
                columns={this.columns}
                data={this.data}
              >
              </FlexiTable>
            </Boxed>
          </div>
          <ModalComponent
            title="Create User"
            subTitle=""
            open={this.state.userModal}
            onClose={this.closeUserModal}
            width="600px"
          >
            <Signup
              signup={this.signup}
              error={error.message}
              updateInfo={this.updateInfo}
              signupPending={signupPending}
              submit={this.submit}
            />
          </ModalComponent>

        </Relative>
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
