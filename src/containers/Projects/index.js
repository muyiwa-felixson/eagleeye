import React, { Component } from "react";
import { createForm, formShape } from "rc-form";
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
  AutosuggestItem
} from "./components";
import { getLevelAttr, levelAttribute } from "../../utils/levels";
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

const numberList = () => {
  let list = [];
  for (let i = 1; i <= 100; i++) {
    list.push({ value: i, label: i });
  }
  return list;
};

const defaultState = {
  current: 1,
  projectModal: false,
  viewlayout: "card",
  newProject: null,
  postData: null,
  submitButtonLoading: false
};
class ProjectList extends Component {
  constructor() {
    super();
    this.state = defaultState;
    this.form = React.createRef();
  }
  proxyGetUrl = () => {
    const { allProjects } = urls;
    return getData({ url: allProjects });
  };
  componentDidMount() {
    this.props.dispatchActions("LOAD_PROJECTS", { func: this.proxyGetUrl });
  }
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

    //
  }
  resetPostData = () => {
    this.props.dispatchActions("LOAD_PROJECTS", { func: this.proxyGetUrl });
    this.setState(() => {
      return {
        postData: null
      };
    });
  };
  componentDidCatch() {}

  submit = ev => {
    ev.preventDefault();
    const { submitButtonLoading, dateOfAward } = this.state;
    const formElements = ev.target.elements;
    let obj = {};
    projectFields.map(field => {
      obj = {
        ...obj,
        [field]: formElements[field].value
      };
    });
    obj = { ...obj, dateOfAward, completed: 0, paid: 0 };
    this.setState(
      () => {
        return {
          submitButtonLoading: true
        };
      },
      () => {
        getData({
          url: urls.postProject,
          inputData: { doc: obj, dbname: "project" },
          context: "POST"
        })
          .then(data => {
            this.setState(() => {
              this.form.reset();
              return {
                postData: "loading",
                submitButtonLoading: false,
                projectModal: false
              };
            });
          })
          .catch(err => {
            this.setState(() => {
              this.form.reset();
              return {
                postData: {},
                submitButtonLoading: false,
                projectModal: false
              };
            });
          });
      }
    );
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
          // reports.map(report => {
          //   const { completionLevel } = report;
          //   if (!isNaN(parseInt(completionLevel, 10))) {
          //     totalCoverage += parseInt(completionLevel);
          //   }
          // });
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
    this.setState(() => {
      return {
        projectModal: !projectModal
      };
    });
  };
  submitForm = () => {
    if (this.form) {
      this.form.dispatchEvent(new Event("submit"));
    }
  };
  render() {
    const {
      loadProjectsPending,
      loadProjectsError,
      loadProjectsPayload = []
    } = this.props;
    const { submitButtonLoading } = this.state;
    return (
      <Relative>
        <ProjectAdd clickAction={this.toggleClickAction} />
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
              <SimpleSelect placeholder="Year of Initiation" />
              <SimpleSelect
                placeholder="Completion Level"
                isSearchable={false}
              />
              <SimpleSelect placeholder="Location" />
              <SimpleSelect placeholder="Category" isSearchable={false} />
              <SimpleSelect placeholder="Status" isSearchable={false} />
            </Grid>
          </Grid>

          <Grid
            default={
              this.state.viewlayout === "card" ? "repeat(5, 1fr)" : "1fr"
            }
            pad={this.state.viewlayout === "card" ? "30px" : "5px"}
          >
            <React.Fragment>
              {loadProjectsPayload && loadProjectsPayload.length > 0 ? (
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
                    } catch (err) {}
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
              ) : loadProjectsPending ? (
                <Loader absolute />
              ) : (
                <div><h2> There are currently no projects reported at the moment</h2></div>
              )}
            </React.Fragment>
          </Grid>
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
                  required
                  forminput
                  name="nature"
                  options={getOptions(natureOfProject)}
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
                      selected={this.state.dateOfAward || new Date()}
                      onChange={this.handleDateChange}
                    />
                  </InputWrapper>
                </div>

                <SimpleSelect
                  type="select"
                  label="Contractor"
                  required
                  forminput
                  name="contractor"
                  options={getOptions(contractors)}
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
              <p />
            </Boxed>
          </form>
        </ModalComponent>
      </Relative>
    );
  }
}

const mapStateToProps = ({ loadProjects }) => ({
  loadProjectsPending: loadProjects.pending,
  loadProjectsError: loadProjects.error,
  loadProjectsPayload: loadProjects.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectList));
