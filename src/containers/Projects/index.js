import React, { Component } from 'react';
import { Relative, TopBar, ListBody, ProjectCard, LineBar } from './components';
import { Button, Input, Grid, SimpleSelect, Label } from '../../components/flex';
import { Theme } from '../../components/flex/theme';

const ProjectCardComponent = (props) => {
  return (
    <ProjectCard layout={props.layout}>
      <div className="project-year">{props.year}<span>{props.month}</span></div>
      <div className="project-code">{props.code}</div>

      <div className="project-name">{props.name}</div>
      <div className="project-completion"><Label>Completion</Label><LineBar percentage={`${props.completed}%`} /></div>
      <div className="project-payment"><Label>Payment</Label><LineBar color={Theme.PrimaryBlue} percentage={`${props.paid}%`} /></div>
      {props.completed === 100 ? <div className="project-status"><i className="icon-ok" /></div> : <div className="project-status non">~</div>}
    </ProjectCard>
  )
}
class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      current: 1,
      viewlayout: "card"
    }
  }

  render() {
    return (
      <Relative>
        <TopBar>
          <div className="logo"><i className="icon-headphones" /></div>
          <div></div>
          <div>
            <Input type="search" />
          </div>
          <div>
            <Button iconLeft><i className="icon-folder" />New Project</Button>
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
      </Relative>
    )
  }
}

export default ProjectList;