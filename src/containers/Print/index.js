/**
 * @file print
 */
import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button, ModalComponent, PaleButton, H4, H5, P } from "../../components/flex";
import { Theme } from "../../components/flex/theme";
import Projects from "../Projects";
import { getMonth } from "../../utils/utils";

import Image from "../../components/assets/logo.png";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2
});

const initialState = {
  data: null,
  project: null,
  mergedList: null,
  page: ""
};

const PrintWindow = styled.div`
 max-width: 100%;
 margin: 0 auto;
  padding: 10px;
 width: calc(21cm - 20px);
 min-height: calc(29.7cm - 40px);
 text-align: center;
 color: ${Theme.PrimaryFontColor};
 /* background: #fff; */
 font-size: 10px;

 & img{
   height: 80px;
 }
`;

const Field = styled.div`
  padding: 10px 10px;
  font-weight: normal;
  min-width: 100px;
  ${props => props.lined && css`
   border-bottom: 1px dashed ${Theme.PrimaryFontColor};
  `}
  ${props => props.limit && css`
    width: 120px;
  `}
`;

const Dotted = styled.div`
  margin: 50px 20px 10px 20px;
  border-top: 1px dashed ${Theme.PrimaryFontColor};
  padding: 10px;
  text-align: center;
  width: 200px;
  display: inline-block;
`;



const SilentTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
  & td{
    padding: 0;
    font-weight: bold;
    text-transform: capitalize;
    vertical-align: bottom;
    &.right{
      text-align: right;
    }
  }
`;

const LinedTable = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #ccc;
  & th{
    text-align: left;
    text-transform: uppercase;
    font-weight: normal;
    opacity: 0.6;
    border-bottom:1px solid #ccc;
    border-left:1px solid #ccc;
    font-size: 10px;
    padding: 5px;
  }
  & td{
    padding: 5px;
    font-weight: normal;
    text-transform: capitalize;
    border-left:1px solid #ccc;
  }
`;

const TheTable = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid ${Theme.PrimaryFontColor};
  & th{
    text-align: left;
    text-transform: uppercase;
    font-weight: bold;
    border-bottom:1px solid ${Theme.PrimaryFontColor};
    border-left:1px solid ${Theme.PrimaryFontColor};
    font-size: 10px;
    padding: 10px;
  }
  & td{
    padding: 10px;
    font-weight: normal;
    text-transform: capitalize;
    border-left:1px solid ${Theme.PrimaryFontColor};
    vertical-align: top;
    border-bottom:1px solid ${Theme.PrimaryFontColor};
  }
`;

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
          //   try {
          //     localStorage.removeItem("fromPage");
          //   } catch (err) {
          //     //
          //   }
        }
      );
    } catch (err) {
      //
    }
  }
  componentWillUnmount() {
    // try {
    // //   localStorage.removeItem("fromPage");
    // } catch (err) {
    //   //
    // }
  }

  render() {
    console.log(this.state);
    const { data, project, mergedList } = this.state;

    // Here you have access to the data 
    // Data contains the particualr payment object that was clicked , within you will find its id 
    // project contains the project including all the information on the project and the payments and reports as array 
    // Merged list comined both payment and report objects into an array sorted the way they are reported 
    //     return // Here you have access to the data
    // Data contains the particualr payment object that was clicked , within you will find its id
    // project contains the project including all the information on the project and the payments and reports as array
    // Merged list comined both payment and report objects into an array sorted the way they are reported
    if (data && project && mergedList) {
      return <PrintWindow>
        <img src={Image} />
        <H4>LETTER OF VALIDATION</H4>
        <h5>FEDERAL MINISTRY OF AGRICULTURE AND RURAL DEVELOPMENT</h5>
        <h5>DEPARTMENT OF SPECIAL DUTIES <br />TEMPLATE FOR PROJECTS VERIFICATION</h5>

        <SilentTable>
          <tbody>
            <tr>
              <td style={{ width: "140px" }}>NAME OF PROJECT</td>
              <td colSpan={3}><Field lined>{project.name}</Field></td>
            </tr>
            <tr>
              <td>FILE NO</td>
              <td><Field lined>{project.fileNumber}</Field></td>
              <td style={{ width: "80px", textAlign: "right" }}>CODE NO</td>
              <td><Field lined></Field></td>
            </tr>
            <tr>
              <td style={{ width: "140px" }}>CONTRACTOR</td>
              <td colSpan={3}><Field lined>{project.contractor}</Field></td>
            </tr>
          </tbody>
        </SilentTable>

        <LinedTable>
          <thead>
            <th>Nature Of Project</th>
            <th>Source of Funding</th>
            <th>Project Duration</th>
            <th>TYPE OF PROJECT</th>
          </thead>
          <tbody>
            <tr>
              <td>{project.nature}</td>
              <td>{project.funding}</td>
              <td>{project.duration} {project.durationType}</td>
              <td>{project.type}</td>
            </tr>
          </tbody>
        </LinedTable>

        <LinedTable>
          <thead>
            <th>Project Cost</th>
            <th>Target Unit</th>
            <th>Status of Execution</th>
          </thead>
          <tbody>
            <tr>
              <td>{formatter.format(project.cost)}</td>
              <td>{project.unit}</td>
              <td>{project.duration} {project.durationType}</td>
            </tr>
          </tbody>
        </LinedTable>
        <H4 style={{ textAlign: "left", fontSize: "14px" }}>LOCATION(s)</H4>
        <LinedTable style={{ width: "60%" }}>
          <thead>
            <th>State</th>
            <th>LGA</th>
            <th>Town</th>
          </thead>
          <tbody>
            {
              project.locations && project.locations.map(elem => {
                return (
                  <tr>
                    <td>{elem.STATE}</td>
                    <td>{elem.LGA}</td>
                    <td>{elem.TOWN}</td>

                  </tr>
                )
              })
            }
          </tbody>
        </LinedTable>
        <H4 style={{ textAlign: "left", fontSize: "14px" }}>REPORTS</H4>
        <TheTable>
          <thead>
            <th>Report Time</th>
            <th>Comment/Remarks</th>
            <th>Performance Level</th>
            {/* <th>Submitted By</th> */}
          </thead>
          <tbody>
            {
              project.reports && project.reports.map(elem => {
                const date = new Date(elem.submittedOn);
                const year = date.getFullYear();
                const month = getMonth(date.getMonth());
                const day = date.getDate();
                return (
                  <tr>
                    <td style={{ width: "120px" }}>{day} {month} {year}</td>
                    <td>{elem.reportComment}</td>
                    <td style={{ width: "140px", textAlign: "center" }}><H5>{elem.completionLevel}%</H5></td>
                    {/* <td>{elem.submittedBy}</td> */}
                  </tr>
                )
              })
            }
          </tbody>
        </TheTable>

        <P>The Director of Special Duties have reviewed the Project <strong>"{project.name}"</strong> and Recommend the payment of <strong style={{ fontSize: "16px" }}>{data.percentage}%</strong> of the Project Cost, which amounts to <strong>{data.payableAmount}</strong></P>
        <Dotted>Sign</Dotted>

        <Dotted>Date</Dotted>

      </PrintWindow>;


    } else {
      return <div>This page has expired</div>;
    }

  }
};
