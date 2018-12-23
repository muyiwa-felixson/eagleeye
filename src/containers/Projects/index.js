import React, { Component } from "react";
import { Relative, TopBar, ListBody, ProjectCard, LineBar } from "./components";
import {
  Button,
  Input,
  Grid,
  SimpleSelect,
  Label,
  Loader
} from "../../components/flex";
import { Theme } from "../../components/flex/theme";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { urls } from "../../api-requests/urls";
import { ProjectCardComponent } from "./presentation/projectCard";
import { getData } from "../../api-requests/index";
import { dispatchActions } from "../../store/actions/action-config.action";
import { bindActionCreators } from "redux";
import { ProjectAdd } from "../../commons/index";

const defaultState = {
  current: 1,
  viewlayout: "card"
};
class ProjectList extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  proxyGetUrl = () => {
    const { allProjects } = urls;
    return getData({ url: allProjects });
  };
  componentDidMount() {
    this.props.dispatchActions("LOAD_PROJECTS", { func: this.proxyGetUrl });
  }
  componentDidUpdate() {
    //
  }
  componentDidCatch() {}

  render() {
    const {
      loadProjectsPending,
      loadProjectsError,
      loadProjectsPayload
    } = this.props;
    return (
      <Relative>
        <ProjectAdd clickAction={() => console.log("click action")} />
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
            {loadProjectsPending ? (
              <Loader />
            ) : (
              <React.Fragment>
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={75}
                  paid={50}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={100}
                  paid={100}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={75}
                  paid={50}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={100}
                  paid={100}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={75}
                  paid={50}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={100}
                  paid={100}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={75}
                  paid={50}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={100}
                  paid={100}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={75}
                  paid={50}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={100}
                  paid={100}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={75}
                  paid={50}
                  layout={this.state.viewlayout}
                />
                <ProjectCardComponent
                  year="2018"
                  month="Sep"
                  code="PM/2018/JUN/LAG/IKG/001"
                  name="Design a Solution for the Federal Agric Department"
                  completed={100}
                  paid={100}
                  layout={this.state.viewlayout}
                />
              </React.Fragment>
            )}
          </Grid>
        </ListBody>
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
