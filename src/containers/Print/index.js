/**
 * @file print
 */
import React, { Component } from "react";


const initialState = {
  data: null,
  project: null,
  mergedList: null,
  page: ""
};

export class PrintPage extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    try {
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
    } catch (err) {
      //
    }
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
    if (data && project && mergedList) {
      return <div />;
    } else {
      return <div>This page has expired</div>;
    }
  }
};
