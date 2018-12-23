/**
 * @file export all the common utils files here
 */

// Third party imports
import React from "react";
import { TopBar } from './components';
import { Button, Input } from '../components/flex';
// Local importa
// N/A
export const ProjectAdd = ({ clickAction  }) => {
  return (
    <TopBar>
      <div className="logo">
        <i className="icon-headphones" />
      </div>
      <div />
      <div>
        <Input type="search" />
      </div>
      <div>
        <Button iconLeft>
          <i className="icon-folder" onClick={clickAction} />
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
