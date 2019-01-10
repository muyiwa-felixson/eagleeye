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
import {
  Boxed,
  FlexiTable,
  ModalComponent,
  PaleButton,
  Grid,
  Button
} from "../../components/flex";

const defaultState = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  success: false,
  group: "",
  userModal: false,
  data: [],
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
      this.getUsers();
    } else {
      this.props.history.push(`/login`);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    console.log(prevProps.deleteUserPending, nextProps.deleteUserPayload)
    if (prevProps.deleteUserPending && !nextProps.deleteUserPending || prevProps.deleteUserPending && nextProps.deleteUserError) {
      this.getUsers();
    }
    if (prevProps.userInfoPending && nextProps.userInfoPayload) {
      const { permissionList } = nextProps.userInfoPayload;
      this.checkPermissions(permissionList);
    }
    if (!prevProps.signupPending && nextProps.signupPending) {
      this.setPendingState();
    }
    if (!prevProps.signupPayload && nextProps.signupPayload) {
      this.getUsers();
    }
  }
  getUsers = () => {
    const proxyGetUsers = () => {
      return getData({ url: urls.getUsers });
    };
    this.props.dispatchActions("GET_USERS", { func: proxyGetUsers });
  };
  checkPermissions = permissionList => {
    const defaultPagePermission = "Can create users";
    if (permissionList.findIndex(perm => perm === defaultPagePermission) < 0) {
      this.props.history.push(`/login`);
    }
  };
  deleteUser = (id, rev) => {
    const { cookies } = this.props;
    if (cookies) {
        const token = cookies.get("token");
        const data = {
          id,
          dbname: "user",
          token,
          rev,
          intent: "intiatePayment"
        };
        getData({ url: urls.deleteUser, inputData: data, context: "DELETE" }).then(()=>{ 
          this.getUsers();
        }).catch((err)=> { 
          this.getUsers();
        })
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
    // if (ref && ref.current) {
    //   ref.current.dispatchEvent(new Event("submit"));
    // }
    this.signup();
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
    // e.preventDefault();
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
    });
  };

  columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname"
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname"
    },
    {
      title: "Email",
      dataIndex: "username",
      key: "email"
    },
    {
      title: "User Group",
      dataIndex: "group",
      key: "usergroup",
      width: 200
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "operations",
      render: i => {
        const { _id, _rev, group } = i;
        if (group !== "superuser") {
          return (
            <PaleButton small onClick={() => this.deleteUser(_id, _rev)}>
              Delete
            </PaleButton>
          );
        } else {
          return "";
        }
      },
      width: 100
    }
  ];
  constructUsers = () => {
    const { getUsersPayload } = this.props;
    if (getUsersPayload) {
      const data = getUsersPayload.map(user => user.doc);
      return data;
    } else {
      return [];
    }
  };

  render() {
    const {
      signupPending,
      userInfoPending,
      getUsersPending,
      signupError,
      deleteUserPending
    } = this.props;
    const { error, data } = this.state;
    if (userInfoPending || getUsersPending || deleteUserPending ) {
      return <Loader />;
    } else {
      return (
        <Relative>
            <ProjectAdd
              fromPage={"createUser"}
              canInitiatePayment={true}
              canCreateReports={true}
              canEditReports={true}
            />
          <div className="auth-body">
            <Boxed margin="0 auto" pad="120px 30px 30px 30px">
              <Grid default="auto 150px">
                <div />
                <Button onClick={() => this.setState({ userModal: true })}>
                  Add User
                </Button>
              </Grid>
              <FlexiTable columns={this.columns} data={this.constructUsers()} />
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
              error={signupError}
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

const mapStateToProps = ({ userInfo, signup, getUsers, deleteUser }) => ({
  userInfoPending: userInfo.pending,
  userInfoError: userInfo.error,
  userInfoPayload: userInfo.payload,
  signupPending: signup.pending,
  signupPayload: signup.payload,
  signupError: signup.error,
  getUsersPending: getUsers.pending,
  getUsersPayload: getUsers.payload,
  getUsersError: getUsers.error,
  deleteUserPending: deleteUser.pending,
  deleteUserError: deleteUser.error,
  deleteUserPayload: deleteUser.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(CreatUser)));
