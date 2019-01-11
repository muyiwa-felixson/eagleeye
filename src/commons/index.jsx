/**
 * @file export all the common utils files here
 */

// Third party imports
import React from "react";
import { NavLink } from "react-router-dom";
import { TopBar, PopMenu } from "./components";
import { Button, Input, PaleButton } from "../components/flex";

import Logo from "../components/assets/logo.png";
// Local importa
// N/A
export const ProjectAdd = props => {
  const {
    canCreateReports,
    canInitiatePayment,
    canEditReports,
    searchAction,
    fromPage
  } = props;
  const PROJECT = "project";
  const PROJECTS = "projects";
  const nav = [
    {
      to: "/projects",
      permission: canCreateReports,
      label: "Projects"
    },
    {
      to: "/add/contractor",
      permission: canInitiatePayment,
      label: "Contractors"
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
        <div>{fromPage === PROJECTS ? <Input type="search" onChange={searchAction} /> : null}</div>
        <div>
          {fromPage === PROJECTS || fromPage === PROJECT ? (
            fromPage === PROJECTS ?
              <Button iconLeft onClick={props.clickAction}><i className="icon-folder" />New Project</Button> : <PaleButton iconLeft onClick={props.clickAction}>Edit Project</PaleButton>
          ) : null}
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
