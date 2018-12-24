/**
 * @file export all the common utils files here
 */

// Third party imports
import React from "react";
import { TopBar } from './components';
import { Button, Input } from '../components/flex';

import Logo from '../components/assets/logo.png';
// Local importa
// N/A
export const ProjectAdd = ({ clickAction }) => {
  return (
    <TopBar>
      <div className="logo">
        <img src={Logo} />
      </div>
      <div />
      <div>
        <Input type="search" />
      </div>
      <div>
        <Button iconLeft onClick={clickAction} >
          <i className="icon-folder" />
          New Project
        </Button>
      </div>
      <div>
        <i className="alert icon-bell" />
      </div>
      <div>
        <i className="login-user icon-user-outline" />
      </div>
    </TopBar>
  );
};
