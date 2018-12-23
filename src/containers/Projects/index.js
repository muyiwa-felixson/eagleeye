import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
// import Autosuggest from 'react-autosuggest';
import { Relative, TopBar, ListBody, ProjectCard, LineBar, BallLegend, LevelList, AutosuggestItem } from './components';
import { getLevelAttr, levelAttribute } from '../../utils/levels';
import { Button, Input, Grid, SimpleSelect, Label, ModalComponent, PaleButton, Boxed, TextArea, P, Loader } from '../../components/flex';
import { Theme } from '../../components/flex/theme';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { urls } from '../../api-requests/urls';
import { ProjectCardComponent } from './presentation/projectCard';
import { getData } from '../../api-requests/index';
import { dispatchActions } from '../../store/actions/action-config.action';
import { bindActionCreators } from 'redux'


const numberList = () => {
  let list = []
  for (let i = 1; i <= 100; i++) {
    list.push({ value: i, label: i })
  }
  return list
}

const defaultState = {
  current: 1,
  projectModal: false,
  viewlayout: "card"
}
class ProjectList extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  proxyGetUrl = () => {
    const { allProjects } = urls;
    return getData({ url: allProjects });
  }
  componentDidMount() {
    this.props.dispatchActions('LOAD_PROJECTS', { func: this.proxyGetUrl });
  }
  componentDidUpdate() {
    //
  }
  componentDidCatch() {

  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  render() {
    const { loadProjectsPending, loadProjectsError, loadProjectsPayload } = this.props;
    if (loadProjectsPending) {
      return (
        <Loader />
      )
    }
    return (
      <Relative>
        <TopBar>
          <div className="logo"><i className="icon-headphones" /></div>
          <div></div>
          <div>
            <Input type="search" />
          </div>
          <div>
            <Button iconLeft onClick={() => this.setState({ projectModal: true })}><i className="icon-folder" />New Project</Button>
          </div>
          <div><i className="alert icon-bell" /></div>
          <div>
            <i className="login-user icon-user-outline" />
          </div>
        </TopBar>

        <ListBody>
          <Grid className="filter-lane" default="200px 1fr 1.5fr" tablet="1fr">
            <div>
              <Button icon color={this.state.viewlayout === "list" && Theme.PrimaryGrey} onClick={() => this.setState({ viewlayout: "card" })}><i className="icon-th-large" /></Button>
              <Button icon color={this.state.viewlayout === "card" && Theme.PrimaryGrey} onClick={() => this.setState({ viewlayout: "list" })}><i className="icon-th-list" /></Button>
            </div>
            <div></div>

            <Grid default="repeat(5, 1fr)" tablet="repeat(3, 1fr)" mobile="1fr" className="right-align">
              <SimpleSelect placeholder="Year of Initiation"></SimpleSelect>
              <SimpleSelect placeholder="Completion Level" isSearchable={false}></SimpleSelect>
              <SimpleSelect placeholder="Location"></SimpleSelect>
              <SimpleSelect placeholder="Category" isSearchable={false}></SimpleSelect>
              <SimpleSelect placeholder="Status" isSearchable={false}></SimpleSelect>
            </Grid>
          </Grid>

          <Grid default={this.state.viewlayout === "card" ? "repeat(5, 1fr)" : "1fr"} pad={this.state.viewlayout === "card" ? "30px" : "5px"}>
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
          </Grid>
        </ListBody>

        <ModalComponent
          title="Project"
          subTitle="Add A New"
          open={this.state.projectModal}
          onClose={() => this.setState({ projectModal: !this.state.projectModal })}
          footer={<div><PaleButton>Cancel</PaleButton> <Button>Save Report</Button></div>}
          expandable
          fluid
        >
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
          <Boxed padVertical="30px">
            <Grid pad="15px" default="3fr 1fr" tablet="2fr 1fr">
              <Input

                placeholder="Project Name"
                type="text"
                label="Project"
                forminput
              />

              <Input

                placeholder="File Number"
                type="text"
                label="File Number"
                forminput
              />
            </Grid>
            <p></p>
            <TextArea
              label="Project Description"
            />
            <p></p>
            <Grid pad="15px" default="1fr 1fr 1fr 1fr" tablet="1fr 1fr 1fr">



              <SimpleSelect

                type="select"
                label="Project Nature"
                required
                forminput
              />
              <SimpleSelect

                type="select"
                label="Source of Funding"
                required
                forminput
              />

              <Input

                placeholder="Project Type"
                type="number"
                label="Project Type"
                forminput
              />

              <SimpleSelect
                type="select"
                label="Target Unit"
                required
                forminput
              />

              <Input

                placeholder="Project Cost"
                type="number"
                label="Project Cost"
                forminput
              />

              <Input

                placeholder="Date of Award"
                // This Input should be a date selector //
                type="text"
                label="Date of Award"
                forminput
              />

              <SimpleSelect
                type="select"
                label="Contractor"
                required
                forminput
              />
              <Grid default="1fr 2fr" tablet="1fr 2fr" mobile="1fr 2fr" pad="15px">
                <SimpleSelect
                  options={numberList()}
                  type="select"
                  label="Duration"
                  required
                  forminput
                />
                <SimpleSelect
                  options={[{ value: "days", label: "days" }, { value: "weeks", label: "weeks" }, { value: "months", label: "months" }, { value: "years", label: "years" }]}
                  type="select"
                  label="Duration Type"
                  required
                  forminput
                />
              </Grid>

            </Grid>
            <p></p>


          </Boxed>
        </ModalComponent>
      </Relative>
    )
  }
}
const mapStateToProps = ({ loadProjects }) => ({
  loadProjectsPending: loadProjects.pending,
  loadProjectsError: loadProjects.error,
  loadProjectsPayload: loadProjects.payload
})
const mapDispatchToProps = dispatch => (
  bindActionCreators({ dispatchActions }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectList));
