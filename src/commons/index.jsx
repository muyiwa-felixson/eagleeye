/**
 * @file export all the common utils files here
 */

// Third party imports
import React from "react";
import { NavLink } from "react-router-dom";
import { TopBar, PopMenu } from './components';
import { Button, Input } from '../components/flex';

import Logo from '../components/assets/logo.png';
// Local importa
// N/A
export const ProjectAdd = (props) => {
  return (
    <div>
      <TopBar>
        <div className="logo">
          <img src={Logo} />
        </div>
        <PopMenu>
          <ul>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="#">Contractors</NavLink></li>
            <li><NavLink to="/signup">Manage Users</NavLink></li>
          </ul>
        </PopMenu>
        <div />
        <div>
          {props.projects && <Input type="search" />}

        </div>
        <div>
          {props.projects && <Button iconLeft onClick={props.clickAction} >
            <i className="icon-folder" />
            New Project
        </Button>
          }
        </div>
        <div>
          <i className="alert icon-bell" />
        </div>
        <div>
          <NavLink to="./login"><i className="login-user icon-user-outline" /></NavLink>
        </div>
      </TopBar>

    </div>
  );
};
