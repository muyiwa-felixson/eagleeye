/**
 * @file print
 */
import React, { Component } from "react";
import { Button, ModalComponent, PaleButton } from "../../components/flex";

const initialState = {
  data: {},
  page: {},
  project: {},
  mergedList: {},
  page: ""
};

export class PrintPage extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    const storedData = localStorage.getItem("fromPage") || "";
    const { data, project, page, mergedList } = JSON.parse(storedData);
    this.setState(
      () => {
        return {
          data,
          project,
          page,
          mergedList
        };
      },
      () => {
        try {
          localStorage.removeItem("fromPage");
        } catch (err) {
          //
        }
      }
    );
  }
  componentWillUnmount() {
    try {
      localStorage.removeItem("fromPage");
    } catch (err) {
      //
    }
  }

  render() {
    console.log(this.state);
    const { data, project, mergedList } = this.state;
    // Here you have access to the data 
    // Data contains the particualr payment object that was clicked , within you will find its id 
    // project contains the project including all the information on the project and the payments and reports as array 
    // Merged list comined both payment and report objects into an array sorted the way they are reported 
    return <div />;
  }
}
