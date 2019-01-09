/**
 * @file export all the common utils files here
 */

// Third party imports
import React from "react";
import { NavLink } from "react-router-dom";
import { TopBar, PopMenu } from "./components";
import { Button, Input } from "../components/flex";

import Logo from "../components/assets/logo.png";
// Local importa
// N/A
export const ProjectAdd = props => {
  const { canCreateReports, canInitiatePayment, canEditReports } = props;

  const nav = [
    {
      to: "/projects",
      permission: canCreateReports,
      label: "Projects"
    },
    {
      to: "#",
      permission: canInitiatePayment,
      label: "Contaractors"
    },
    {
      to: "/signup",
      permission: canInitiatePayment,
      label: "Manage Users"
    },
    {
      to: "/login",
      permission: canCreateReports,
      label: "Logout"
    }
  ];
  return (
    <div>
      <TopBar>
        <div className="logo">
          <img src={Logo} />
        </div>
        <PopMenu>
          <ul>
            {nav.map((item, index) => {
              const { to, permission, label } = item;
              if (permission) {
                return (
                  <li key={index}>
                    <NavLink to={to}>{label}</NavLink>
                  </li>
                );
              } else {
                return "";
              }
            })}
          </ul>
        </PopMenu>
        <div />
        <div>{props.projects && <Input type="search" />}</div>
        <div>
          {
            <Button iconLeft onClick={props.clickAction}>
              <i className="icon-folder" />
              New Project
            </Button>
          }
        </div>
        <div>
          <i className="alert icon-bell" />
        </div>
        <div>
          <NavLink to="./login">
            <i className="login-user icon-user-outline" />
          </NavLink>
        </div>
      </TopBar>
    </div>
  );
};
