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
import { Theme } from "../../components/flex/theme";

const defaultState = {
  companyName: "",
  address: "",
  phoneNumber: "",
  email: "",
  rcNumber: "",
  userModal: false,
  data: [],
  contractors: {},
  error: {
    message: "",
    status: false
  },
  editingContractors: null
};
class Contractor extends React.Component {
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
      this.getContractors();
      const proxyGetUrl = () => {
        const { allProjects } = urls;
        return getData({ url: allProjects });
      };
      this.props.dispatchActions("LOAD_PROJECTS", { func: proxyGetUrl });
    } else {
      this.props.history.push(`/login`);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (
      (prevProps.deleteUserPending && !nextProps.deleteUserPending) ||
      (prevProps.deleteUserPending && nextProps.deleteUserError)
    ) {
      this.getContractors();
    }
    if (prevProps.userInfoPending && nextProps.userInfoPayload) {
      const { permissionList } = nextProps.userInfoPayload;
      this.checkPermissions(permissionList);
    }
    if (!prevProps.getContractorsPending && nextProps.getContractorsPending) {
      this.setPendingState();
    }
    if (prevProps.getContractorsPending && nextProps.getContractorsPayload) {
      this.setContractorsProject();
    }
    if (
      prevProps.createContractorsPending &&
      nextProps.createContractorsPayload
    ) {
      this.getContractors();
    }
    if (prevProps.loadProjectsPending && nextProps.loadProjectsPayload) {
      this.setContractorsProject();
    }
  }
  setContractorsProject = () => {
    const { loadProjectsPayload, getContractorsPayload } = this.props;
    if (loadProjectsPayload && getContractorsPayload) {
      const contractorsProject = getContractorsPayload.map(contractor => {
        let counter = 0;
        loadProjectsPayload.map(project => {
          if (project.doc.contractor === contractor.doc.companyName) {
            counter += 1;
          }
        });
        contractor.doc.projectHandled = counter;
        return contractor;
      });
      this.setState(() => {
        return { contractors: contractorsProject, editingContractors: null };
      });
    }
  };
  getContractors = () => {
    const proxygetContractors = () => {
      return getData({ url: urls.getContractors });
    };
    this.props.dispatchActions("GET_CONTRACTORS", {
      func: proxygetContractors
    });
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
        dbname: "contractor",
        token,
        rev,
        intent: "intiatePayment"
      };
      getData({ url: urls.deleteUser, inputData: data, context: "DELETE" })
        .then(() => {
          this.getContractors();
        })
        .catch(err => {
          this.getContractors();
        });
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
  signup = () => {
    const {
      companyName = "",
      address = "",
      phoneNumber = "",
      email = "",
      rcNumber = "",
      error,
      editingContractors
    } = this.state;
    if (!companyName || !address || !phoneNumber || !email || !rcNumber) {
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
          companyName,
          address,
          phoneNumber,
          rcNumber,
          email,
          dbname: "contractor",
          intent: "intiatePayment",
          token: this.props.userInfoPayload.token
        };
        if (editingContractors) {
          const id = editingContractors.id || editingContractors._id;
          const rev = editingContractors.rev || editingContractors._rev;
          inputData.id = id;
          inputData.rev = rev;
        }

        return getData({
          url: urls.postProject,
          context: editingContractors ? "PATCH" : "POST",
          inputData: {
            ...inputData,
            doc: {
              companyName,
              address,
              rcNumber,
              phoneNumber,
              email,
              dbname: "contractor"
            }
          }
        });
      };
      return this.props.dispatchActions("CREATE_CONTRACTORS", {
        func: proxySignup
      });
    }
  };
  editUser = contractor => {
    this.setState(() => {
      return {
        ...this.state,
        ...contractor,
        editingContractors: contractor,
        userModal: true
      };
    });
  };

  closeUserModal = () => {
    this.setState({
      userModal: false
    });
  };
  columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "RC Number",
      dataIndex: "rcNumber",
      key: "rcNumber"
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: 200
    },
    {
      title: "Project Handled",
      dataIndex: "projectHandled",
      key: "projectHandled"
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "operations",
      render: i => {
        const { _id, _rev, group } = i;
        if (group !== "superuser") {
          return (
            <div>
              <PaleButton
                style={{ display: "inline-block", fontSize: "10px" }}
                small
                onClick={() => this.editUser(i)}
              >
                Edit
              </PaleButton>
              <PaleButton
                style={{ display: "inline-block", marginLeft: "5px", fontSize: "10px" }}
                small
                color={Theme.PrimaryRed}
                onClick={() => this.deleteUser(_id, _rev)}
              >
                Delete
              </PaleButton>
            </div>
          );
        } else {
          return "";
        }
      },
      width: 160
    }
  ];
  constructUsers = () => {
    let { getContractorsPayload } = this.props;
    const { contractors } = this.state;
    if (contractors) {
      getContractorsPayload = contractors;
    }
    if (getContractorsPayload) {
      try {
        const data = getContractorsPayload.map(user => user.doc);
        return data;
      } catch (err) {
        return [];
      }
    } else {
      return [];
    }
  };

  render() {
    const {
      getContractorsPending,
      userInfoPending,
      signupError,
      deleteUserPending
    } = this.props;
    const { error, data, editingContractors } = this.state;
    if (userInfoPending || getContractorsPending || deleteUserPending) {
      return <Loader />;
    } else {
      return (
        <Relative>
          <ProjectAdd
            fromPage={"contractors"}
            canInitiatePayment={true}
            canCreateReports={true}
            canEditReports={true}
          />
          <div className="auth-body">
            <Boxed margin="0 auto" pad="120px 30px 30px 30px">
              <Grid default="auto 150px">
                <div />
                <Button onClick={() => this.setState({ userModal: true })}>
                  Add Contractor
                </Button>
              </Grid>
              <FlexiTable columns={this.columns} data={this.constructUsers()} />
            </Boxed>
          </div>
          <ModalComponent
            title="Create Contractor"
            subTitle=""
            open={this.state.userModal}
            onClose={this.closeUserModal}
            width="600px"
          >
            <Signup
              signup={this.signup}
              editingContractors={editingContractors || {}}
              error={signupError}
              formError={error}
              updateInfo={this.updateInfo}
              getContractorsPending={getContractorsPending}
              submit={this.submit}
            />
          </ModalComponent>
        </Relative>
      );
    }
  }
}

const mapStateToProps = ({
  userInfo,
  createContractors,
  getContractors,
  deleteUser,
  loadProjects
}) => ({
  userInfoPending: userInfo.pending,
  userInfoError: userInfo.error,
  userInfoPayload: userInfo.payload,
  createContractorsPending: createContractors.pending,
  createContractorsPayload: createContractors.payload,
  createContractorsError: createContractors.error,
  getContractorsPending: getContractors.pending,
  getContractorsPayload: getContractors.payload,
  getContractorsError: getContractors.error,
  deleteUserPending: deleteUser.pending,
  deleteUserError: deleteUser.error,
  deleteUserPayload: deleteUser.payload,
  loadProjectsPending: loadProjects.pending,
  loadProjectsError: loadProjects.error,
  loadProjectsPayload: loadProjects.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(Contractor)));
