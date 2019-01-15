import React, { Component } from "react";
import { createForm, formShape } from "rc-form";
import { withCookies, Cookies } from "react-cookie";
import DatePicker from "react-datepicker";
import {
  getOptions,
  sourceOfFunding,
  natureOfProject,
  projectTypes,
  targetUnits,
  contractors,
  getMonth
} from "../../utils/utils";
// import Autosuggest from 'react-autosuggest';
import {
  Relative,
  TopBar,
  ListBody,
  ProjectCard,
  LineBar,
  BallLegend,
  LevelList,
  AutosuggestItem,
  LocTable
} from "./components";
import { locations } from "../../utils/levels";
import {
  Button,
  Input,
  Grid,
  SimpleSelect,
  Label,
  ModalComponent,
  PaleButton,
  Boxed,
  TextArea,
  P,
  Loader,
  InputWrapper
} from "../../components/flex";
import { Theme } from "../../components/flex/theme";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { urls, baseurl } from "../../api-requests/urls";
import { ProjectCardComponent } from "./presentation/projectCard";
import { getData } from "../../api-requests/index";
import { dispatchActions } from "../../store/actions/action-config.action";
import { bindActionCreators } from "redux";
import { ProjectAdd } from "../../commons/index";
import { projectFields } from "../../config/form-fields";
import PlaceHolder from "../../components/assets/placeholders";
import {
  wildSearch,
  sortArrayOfObjects,
  getYears,
  filterByDate,
  filterByCompletion,
  getLocations,
  filterByLocation,
  getNature,
  filterByNature
} from "../../utils/search";

const numberList = () => {
  let list = [];
  for (let i = 1; i <= 100; i++) {
    list.push({ value: i, label: i });
  }
  return list;
};
const defaultRequiredFields = [
  "name",
  "locations",
  "nature",
  "durationType",
  "funding",
  "duration",
  "contractor",
  "dateOfAward",
  "cost",
  "unit",
  "type"
];
const checkRequired = obj => {
  let ok = true;
  for (let i = 0; i < defaultRequiredFields.length - 1; i++) {
    const field = defaultRequiredFields[i];
    if (field === "locations" && obj.locations.length < 1) {
      ok = false;
      break;
    }
    if (obj[field]) {
      ok = true;
    } else {
      ok = false;
      break;
    }
  }
  return ok;
};
const defaultState = {
  current: 1,
  projectModal: false,
  viewlayout: "card",
  newProject: null,
  postData: null,
  submitButtonLoading: false,
  state: "",
  LGA: "",
  TOWN: "",
  locations: [],
  contractors: [],
  editingProject: null,
  projectReporteItems: {},
  formErrors: false,
  searchParam: [],
  yearsOption: [],
  computedSearchParam: []
};
class ProjectList extends Component {
  constructor() {
    super();
    this.locForm = React.createRef();
    this.state = defaultState;
    this.form = React.createRef();
  }
  proxyGetUrl = () => {
    const { allProjects } = urls;
    return getData({ url: allProjects });
  };
  componentDidMount() {
    const { cookies, history, userInfoPayload } = this.props;
    this.props.history.index = 0;
    const token = cookies.get("token");
    if (!token) {
      history.push("/login");
    }
    if (!userInfoPayload) {
      const proxyGetInfo = () => {
        return getData({ url: urls.verify({ token }) });
      };
      this.props.dispatchActions("USER_INFO", { func: proxyGetInfo });
    }
    this.props.dispatchActions("LOAD_PROJECTS", { func: this.proxyGetUrl });
    const proxygetContractors = () => {
      return getData({ url: urls.getContractors });
    };
    this.props.dispatchActions("GET_CONTRACTORS", {
      func: proxygetContractors
    });
  }
  // editProject = doc => {
  //   this.setState({ editingProject: doc, projectModal: true });
  // };
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (
      !prevState.postData &&
      nextState.postData &&
      !nextProps.loadProjectsPending &&
      nextState.postData == "loading"
    ) {
      this.resetPostData();
    }
    if (!prevProps.userInfoPayload && nextProps.userInfoPayload) {
      this.checkInfo();
    }
    if (prevProps.getContractorsPending && nextProps.getContractorsPayload) {
      this.setContractors();
    }
    if (!prevState.locations && nextState.locations) {
      this.setLocationFromState();
    }
    if (!prevState.projectModal && nextState.projectModal) {
      this.setErrorFalse();
    }
    if (prevProps.loadProjectsPending && nextProps.loadProjectsPayload) {
      this.runSearchParam();
    }
  }
  getCompletionOptions = () => {
    const completionObject = [];
    for (let i = 1; i <= 100; i++) {
      const value = { value: i, label: `${i}%` };
      completionObject.push(value);
    }
    return completionObject;
  };
  runSearchParam = () => {
    const projects = this.props.loadProjectsPayload.map(proj => {
      proj.doc.completed = this.getPercentCovered(proj.id, "reports");
      proj.doc.payment = this.getPercentCovered(proj.id, "payments");
      return proj;
    });
    this.setState(() => {
      return {
        yearsOption: getYears(this.props.loadProjectsPayload, "dateOfAward"),
        searchParam: projects,
        computedSearchParam: projects
      };
    });
  };
  onFilterDateChanged = (ev, type = "date") => {
    const { value } = ev;
    const { searchParam, computedSearchParam } = this.state;
    let newSearchParam;
    if (value === "reset") newSearchParam = this.props.loadProjectsPayload;
    else if (type === "date") {
      newSearchParam = filterByDate(
        this.props.loadProjectsPayload,
        "dateOfAward",
        value
      );
    } else if (type === "completion") {
      newSearchParam = filterByCompletion(
        computedSearchParam,
        "completed",
        value
      );
    } else if (type === "location") {
      newSearchParam = filterByLocation(computedSearchParam, value);
    } else if (type === 'nature') {
      newSearchParam = filterByNature(computedSearchParam, value)
    }

    this.setState(() => {
      return {
        searchParam: newSearchParam
      };
    });
  };
  setErrorFalse = () => {
    this.setState(() => {
      return {
        formErrors: false
      };
    });
  };
  setLocationFromState = () => {
    this.setState(() => {
      return {
        locations: this.state.editingProject.locations
      };
    });
  };
  subSearchAction = (doc, q, array) => {
    const newArr = wildSearch(doc, q, array);
    this.setState(
      () => {
        return {
          searchParam: newArr
        };
      },
      () => this.forceUpdate()
    );
  };
  searchAction = e => {
    const q = e.target.value.trim();
    const { loadProjectsPayload } = this.props;
    if (loadProjectsPayload) {
      let { doc } = loadProjectsPayload[0] || {};
      doc = { ...doc, tags: "" };
      if (!q) {
        this.setState(() => {
          return {
            searchParam: loadProjectsPayload
          };
        });
      } else {
        const { searchParam } = this.state;
        if (searchParam.length === 0) {
          this.setState(
            () => {
              return {
                searchParam: loadProjectsPayload
              };
            },
            () => this.subSearchAction(doc, q, loadProjectsPayload)
          );
        } else {
          this.subSearchAction(doc, q, searchParam);
        }
      }
    }
  };
  setContractors = () => {
    const { getContractorsPayload = [] } = this.props;
    if (getContractorsPayload) {
      const contractors = getContractorsPayload.map(contractor => {
        return {
          label: contractor.doc.companyName,
          value: contractor.doc.companyName
        };
      });
      this.setState(() => {
        return { contractors };
      });
    }
  };
  checkInfo = () => {
    const {
      userInfoPayload,
      userInfoError,
      history,
      loadProjectsPayload
    } = this.props;
    this.setState(() => {
      return {
        searchParam: loadProjectsPayload
      };
    });
    if (!userInfoPayload || userInfoError) {
      history.push("/login");
    }
  };
  resetPostData = () => {
    this.props.dispatchActions("LOAD_PROJECTS", { func: this.proxyGetUrl });
    this.setState(() => {
      return {
        postData: null
      };
    });
  };
  componentDidCatch() { }

  submit = ev => {
    ev.preventDefault();
    const {
      submitButtonLoading,
      dateOfAward,
      locations,
      editingProject
    } = this.state;
    const formElements = ev.target.elements;
    let obj = {};
    let tags = "";
    projectFields.map(field => {
      obj = {
        ...obj,
        [field]: formElements[field].value
      };
    });
    if (locations.length > 0) {
      locations.map(location => {
        Object.keys(location).map(item => {
          if (!tags) {
            tags += location[item];
          } else {
            tags += `;${location[item]}`;
          }
        });
      });
    }

    obj = { ...obj, dateOfAward, tags, completed: 0, paid: 0, locations };
    if (checkRequired(obj)) {
      this.setState(
        () => {
          return {
            submitButtonLoading: true
          };
        },
        () => {
          if (!editingProject) {
            getData({
              url: urls.postProject,
              inputData: {
                doc: obj,
                dbname: "project",
                token: this.props.userInfoPayload.token,
                intent: "createProject"
              },
              context: "POST"
            })
              .then(data => {
                this.setState(() => {
                  this.form.reset();
                  return {
                    postData: "loading",
                    formErrors: false,
                    submitButtonLoading: false,
                    projectModal: false,
                    editingProject: null
                  };
                });
              })
              .catch(err => {
                this.setState(() => {
                  this.form.reset();
                  return {
                    postData: {},
                    submitButtonLoading: false,
                    projectModal: false,
                    editingProject: null
                  };
                });
              });
          } else {
            getData({
              url: urls.postProject,
              inputData: {
                doc: obj,
                dbname: "project",
                id: this.state.editingProject._id,
                rev: this.state.editingProject._rev,
                _id: this.state.editingProject._id,
                _rev: this.state.editingProject._rev,
                token: this.props.userInfoPayload.token,
                intent: "createProject"
              },
              context: "PATCH"
            })
              .then(data => {
                this.setState(() => {
                  this.form.reset();
                  return {
                    postData: "loading",
                    submitButtonLoading: false,
                    projectModal: false,
                    editingProject: null
                  };
                });
              })
              .catch(err => {
                this.setState(() => {
                  this.form.reset();
                  return {
                    postData: {},
                    submitButtonLoading: false,
                    projectModal: false,
                    editingProject: null
                  };
                });
              });
            // editing project
          }
        }
      );
    } else {
      this.setState(() => {
        return { formErrors: true };
      });
    }
  };
  navigateToProject = (rev, id) => {
    this.props.history.push(`/projects/project/${id}/${rev}`);
  };

  getPercentCovered = (id, context = "payments") => {
    const { loadProjectsPayload } = this.props;
    let totalCoverage = 0;
    if (loadProjectsPayload) {
      const project = loadProjectsPayload.filter(
        project => project.id === id
      )[0].doc;
      if (context === "payments") {
        if (project.payments) {
          const { payments } = project;
          payments.map(payment => {
            let { percentage } = payment;
            if (!isNaN(parseInt(percentage, 10))) {
              totalCoverage += parseInt(percentage);
            }
          });
        }
      } else {
        if (project.reports) {
          const { reports } = project;
          const sorted = this.sortByDate(reports);
          for (let i = 0; i < sorted.length; i++) {
            const report = sorted[i];
            const { completionLevel, approved } = report;
            if (approved) {
              totalCoverage = completionLevel;
              break;
            }
          }
        }
      }
    }
    return totalCoverage;
  };

  sortByDate = mergedList => {
    const sortFunction = (a, b) => {
      const date1 = new Date(a.submittedOn);
      const date2 = new Date(b.submittedOn);
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
      return 0;
    };
    const sorted = mergedList.sort(sortFunction);
    return sorted;
  };
  handleDateChange = date => {
    this.setState(() => {
      return {
        dateOfAward: date
      };
    });
  };
  toggleClickAction = () => {
    const { projectModal } = this.state;
    let { editingProject } = this.state;
    if (!projectModal) editingProject = null;
    this.setState(() => {
      return {
        projectModal: !projectModal,
        editingProject
      };
    });
  };
  submitForm = () => {
    if (this.form) {
      this.form.dispatchEvent(new Event("submit"));
    }
  };

  getState = () => {
    let filters = Object.assign(locations);
    let locationOptions = [];
    filters.map(elem =>
      locationOptions.push({
        value: elem.state.name,
        label: elem.state.name,
        data: elem.state.locals
      })
    );
    return locationOptions;
  };
  getLGA = selectedState => {
    if (selectedState) {
      const stateValue = [...locations].filter(
        item => item.state.name === selectedState
      )[0];
      let locationOptions = stateValue.state.locals.map(elem => {
        return { value: elem.name, label: elem.name };
      });
      return locationOptions;
    }
  };

  handleLocChange = (e, name) => {
    let target;
    let value;
    try {
      target = e.target;
      value = target.value;
    } catch (error) {
      value = e.value;
    }
    if (value) {
      this.setState({
        [name]: value
      });
    }
  };

  addLocations = locationObject => {
    const { locations } = this.state;

    const newLocations = [...locations, locationObject];
    this.setState(() => {
      return {
        locations: newLocations,
        TOWN: ""
      };
    });
  };
  deleteLocations = locationObject => {
    let { locationsEdit = [] } = this.state;
    locationsEdit = locationsEdit.filter(location => {
      const state = location.STATE.toLowerCase().trim();
      const STATE = locationObject.STATE.toLowerCase().trim();
      const lga = location.LGA.toLowerCase().trim();
      const LGA = locationObject.LGA.toLowerCase().trim();
      const town = location.TOWN.toLowerCase().trim();
      const TOWN = locationObject.TOWN.toLowerCase().trim();
      return state !== STATE || lga !== LGA || town !== TOWN;
    });
    this.setState(() => {
      return {
        locationsEdit
      };
    });
  };
  submitState = () => {
    if (this.locForm) {
      this.locForm.current.reset();
      const { LGA, STATE, TOWN } = this.state;
      if (LGA && STATE && TOWN) {
        this.addLocations({ TOWN, LGA, STATE });
      }
    }
  };
  render() {
    let {
      loadProjectsPending,
      loadProjectsError,
      loadProjectsPayload = [],
      userInfoPending,
      userInfoPayload,
      canInitiatePayment,
      canCreateReports,
      canEditReports
    } = this.props;
    let {
      submitButtonLoading,
      locations,
      searchParam,
      STATE,
      LGA,
      TOWN,
      editingProject
    } = this.state;
    let locButtonDisabled = true;
    if (STATE !== "" && LGA !== "" && TOWN !== "") locButtonDisabled = false;
    loadProjectsPayload = searchParam;

    return (
      <Relative>
        <ProjectAdd
          fromPage={"projects"}
          searchAction={this.searchAction}
          canInitiatePayment={canInitiatePayment}
          canCreateReports={canCreateReports}
          canEditReports={canEditReports}
          clickAction={this.toggleClickAction}
        />
        <ListBody>
          <Grid className="filter-lane" default="200px 1fr 1.5fr" tablet="1fr">
            <div>
              <Button
                icon
                color={this.state.viewlayout === "list" && Theme.PrimaryGrey}
                onClick={() => this.setState({ viewlayout: "card" })}
              >
                <i className="icon-th-large" />
              </Button>
              <Button
                icon
                color={this.state.viewlayout === "card" && Theme.PrimaryGrey}
                onClick={() => this.setState({ viewlayout: "list" })}
              >
                <i className="icon-th-list" />
              </Button>
            </div>
            <div />

            <Grid
              default="repeat(5, 1fr)"
              tablet="repeat(3, 1fr)"
              mobile="1fr"
              className="right-align"
            >
              <SimpleSelect
                label="Year of Initiation"
                options={[
                  ...this.state.yearsOption,
                  { value: "reset", label: "All" }
                ]}
                onChange={e => this.onFilterDateChanged(e, "date")}
                forminput
              />
              <SimpleSelect
                label="Completion Level"
                isSearchable={false}
                onChange={e => this.onFilterDateChanged(e, "completion")}
                options={[
                  ...this.getCompletionOptions(),
                  { value: "reset", label: "All" }
                ]}
                forminput
              />
              <SimpleSelect
                label="Location"
                onChange={e => this.onFilterDateChanged(e, "location")}
                options={[
                  ...getLocations(this.state.computedSearchParam),
                  { value: "reset", label: "All" }
                ]}
                forminput
              />
              <SimpleSelect
                label="Category"
                isSearchable={false}
                onChange={e => this.onFilterDateChanged(e, "nature")}
                options={[
                  ...getNature(this.state.computedSearchParam),
                  { value: "reset", label: "All" }
                ]}
                forminput
              />
              <PaleButton>Clear Filter</PaleButton>
              {/* <SimpleSelect placeholder="Status" isSearchable={false} /> */}
            </Grid>
          </Grid>
          {!userInfoPending &&
            loadProjectsPayload &&
            loadProjectsPayload.length > 0 ? (
              <Grid
                default={
                  this.state.viewlayout === "card" ? "repeat(5, 1fr)" : "1fr"
                }
                pad={this.state.viewlayout === "card" ? "30px" : "5px"}
              >
                <React.Fragment>

                  <React.Fragment>
                    {loadProjectsPayload.map((project, index) => {
                      const { doc, id, value } = project;
                      let { rev } = value;
                      if (!rev) rev = doc._rev;
                      const {
                        dateOfAward,
                        fileNumber,
                        name,
                        completed,
                        paid
                      } = doc;
                      try {
                        const splittedDate = dateOfAward.split(" ");
                      } catch (err) { }
                      const date = new Date(dateOfAward) || new Date();
                      const year = date.getFullYear();
                      const month = date.getMonth();
                      return (
                        <React.Fragment>
                          {loadProjectsPending ? <Loader absolute /> : null}
                          <ProjectCardComponent
                            key={index}
                            year={year}
                            month={getMonth(month)}
                            code={fileNumber}
                            onClick={() => this.navigateToProject(id, rev)}
                            name={name}
                            completed={this.getPercentCovered(id, "reports")}
                            paid={this.getPercentCovered(id, "payments")}
                            layout={this.state.viewlayout}
                          />
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>

                </React.Fragment>
              </Grid>
            ) : loadProjectsPending || userInfoPending ? (
              <Loader absolute />
            ) : (
                <div>
                  <PlaceHolder
                    title="No Projects"
                    content="TThere are currently no projects reported at the moment"
                  />
                </div>
              )}
        </ListBody>

        <ModalComponent
          title="Project"
          subTitle="Add A New"
          open={this.state.projectModal}
          onClose={this.toggleClickAction}
          footer={
            <div>
              <PaleButton>Cancel</PaleButton>{" "}
              <Button onClick={this.submitForm}>
                {" "}
                {!submitButtonLoading ? "Save Report" : "Loading ..."}
              </Button>
            </div>
          }
          expandable
          fluid
        >
          <form ref={el => (this.form = el)} onSubmit={this.submit}>
            Add a new Project , please endeavour to add all the required fields
            <Boxed padVertical="30px">
              <Grid pad="15px" default="3fr 1fr" tablet="2fr 1fr">
                <Input
                  placeholder="Project Name"
                  type="text"
                  label="Project"
                  forminput
                  name="name"
                />
                <Input
                  placeholder="File Number"
                  type="text"
                  label="File Number"
                  forminput
                  name="fileNumber"
                />
              </Grid>
              <p />
              <TextArea name="description" label="Project Description" />
              <p />
              <Grid pad="15px" default="1fr 1fr 1fr 1fr" tablet="1fr 1fr 1fr">
                <SimpleSelect
                  type="select"
                  label="Project Nature"
                  name="nature"
                  options={getOptions(natureOfProject)}
                  required
                  forminput
                />
                <SimpleSelect
                  type="select"
                  label="Source of Funding"
                  required
                  forminput
                  name="funding"
                  options={getOptions(sourceOfFunding)}
                />

                <SimpleSelect
                  type="select"
                  label="Project Type"
                  required
                  forminput
                  name="type"
                  options={getOptions(projectTypes)}
                />

                <Input
                  type="text"
                  placeholder="Target Unit"
                  label="Target Unit"
                  required
                  forminput
                  name="unit"
                />

                <Input
                  placeholder="Project Cost"
                  type="number"
                  label="Project Cost"
                  forminput
                  name="cost"
                />

                {/* <Input
                  placeholder="Date of Award"
                  // This Input should be a date selector //
                  type="text"
                  label="Date of Award"
                  forminput
                  
                /> */}
                <div style={{ paddingTop: "10px" }}>
                  <InputWrapper required>
                    <Label>Date of Award</Label>
                    <DatePicker
                      name="dateOfAward"
                      onChange={this.handleDateChange}
                      selected={this.state.dateOfAward || new Date()}
                    />
                  </InputWrapper>
                </div>

                <SimpleSelect
                  type="select"
                  label="Contractor"
                  required
                  forminput
                  name="contractor"
                  options={this.state.contractors}
                />

                <Grid
                  default="1fr 2fr"
                  tablet="1fr 2fr"
                  mobile="1fr 2fr"
                  pad="15px"
                >
                  <SimpleSelect
                    options={numberList()}
                    type="select"
                    label="Duration"
                    required
                    forminput
                    name="duration"
                  />
                  <SimpleSelect
                    options={[
                      { value: "days", label: "days" },
                      { value: "weeks", label: "weeks" },
                      { value: "months", label: "months" },
                      { value: "years", label: "years" }
                    ]}
                    type="select"
                    label="Duration Type"
                    name="durationType"
                    required
                    forminput
                  />
                </Grid>
              </Grid>
              <h3>Location</h3>
              <form ref={this.locForm} onSubmit={e => e.preventDefault()}>
                <Grid
                  pad="15px"
                  default="1fr 1fr 1fr 1fr 2fr"
                  tablet="1fr 1fr 1fr 1fr"
                  mobile="1fr 1fr"
                >
                  <SimpleSelect
                    type="select"
                    label="State"
                    name="state"
                    options={this.getState()}
                    onChange={e => this.handleLocChange(e, "STATE")}
                    forminput
                  />

                  <SimpleSelect
                    type="select"
                    label="State"
                    name="state"
                    forminput
                    onChange={e => this.handleLocChange(e, "LGA")}
                    options={this.getLGA(STATE)}
                  />

                  <Input
                    placeholder="Ward/Town"
                    type="text"
                    label="Location"
                    forminput
                    name="ward"
                    onChange={e => this.handleLocChange(e, "TOWN")}
                  />
                  <Button
                    disabled={locButtonDisabled}
                    onClick={this.submitState}
                    style={{ marginTop: "10px" }}
                  >
                    Add Location
                  </Button>
                </Grid>
              </form>

              <Grid pad="0" default="4fr 2fr" tablet="1fr" mobile="1fr">
                <LocTable>
                  <thead>
                    <th>State</th>
                    <th>LGA</th>
                    <th>Location</th>
                    <th />
                  </thead>
                  <tbody>
                    {locations.map((location, index) => {
                      const { STATE, LGA, TOWN } = location;
                      return (
                        <tr key={index}>
                          <td>{STATE}</td>
                          <td>{LGA}</td>
                          <td>{TOWN}</td>
                          <td>
                            <PaleButton
                              onClick={() =>
                                this.deleteLocations({ STATE, TOWN, LGA })
                              }
                              small
                              icon
                              color={Theme.PrimaryRed}
                            >
                              <i className="icon-cancel" />
                            </PaleButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </LocTable>
              </Grid>
              <p />
            </Boxed>
          </form>
          {this.state.formErrors ? "All required fields must be completed" : ""}
        </ModalComponent>
      </Relative>
    );
  }
}

const mapStateToProps = ({ loadProjects, userInfo, getContractors }) => ({
  loadProjectsPending: loadProjects.pending,
  loadProjectsError: loadProjects.error,
  loadProjectsPayload: loadProjects.payload,
  userInfoPending: userInfo.pending,
  userInfoError: userInfo.error,
  userInfoPayload: userInfo.payload,
  getContractorsPending: getContractors.pending,
  getContractorsPayload: getContractors.payload,
  getContractorsError: getContractors.error
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(ProjectList)));
