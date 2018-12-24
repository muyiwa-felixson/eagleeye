/**
 * @file - PorjectCard jsx
 */
import Proptypes from "prop-types";
import React from 'react';
import { Relative, TopBar, ListBody, ProjectCard, LineBar } from '../components';
import { Button, Input, Grid, SimpleSelect, Label, Loader } from '../../../components/flex';
import { Theme } from '../../../components/flex/theme';
export const ProjectCardComponent = props => {
  const { layout, year, month, code, name, completed, paid, onClick} = props;
  return (
    <ProjectCard layout={layout}>
      <div onClick={onClick} className="project-year">
        {year}
        <span>{month}</span>
      </div>
      <div className="project-code">{code}</div>

      <div  onClick={onClick} className="project-name">{name}</div>
      <div onClick={onClick} className="project-completion">
        <Label>Completion</Label>
        <LineBar percentage={`${completed}%`} />
      </div>
      <div  onClick={onClick} className="project-payment">
        <Label>Payment</Label>
        <LineBar color={Theme.PrimaryBlue} percentage={`${paid}%`} />
      </div>
      {completed === 100 ? (
        <div className="project-status">
          <i className="icon-ok" />
        </div>
      ) : (
        <div className="project-status non">~</div>
      )}
    </ProjectCard>
  );
};
ProjectCardComponent.propTypes = {
  layout: Proptypes.any,
  year: Proptypes.string,
  month: Proptypes.string,
  code: Proptypes.string,
  name: Proptypes.string,
  completed: Proptypes.number,
  paid: Proptypes.number,
  onClick: Proptypes.func
};
