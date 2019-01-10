
import React from "react";
import {
  TopSection,
  LowerSection,
  TimeLine,
  TimeBox,
  TimeDate,
  TimeContent,
  TimeDiv,
  Picture,
  Video,
  PayContent,
  DragZone
} from "../components";
import {
  Button,
  Input,
  Grid,
  SimpleSelect,
  Label,
  Panel,
  PaleButton,
  Aligner,
  H4,
  H5,
  P,
  ModalComponent,
  Boxed,
  TextArea,
  InputWrapper
} from "../../../components/flex";

export const PayComponent = props => {
  const { printPage, paymentBody } = props;
    return (
      <TimeBox type={props.type}>
        <TimeDate>
          <span>
            {props.day}, {props.month}
          </span>
          <strong>{props.year}</strong>
        </TimeDate>
        <PayContent>
          <TimeDiv type="payment">
            <h3>
              {props.level}% <span>Payment Approved</span>
            </h3>
  
            <Grid default="repeat(3, 1fr)">
              <div>
                <Label>Approved by</Label> {props.approvedBy}
              </div>
              <div>
                <Label>Approved on</Label> {props.fullDate}
              </div>
            </Grid>
            <Label>Comment</Label>
            <p>{props.comment}</p>
            <Button
              onClick={() => printPage(paymentBody, 'payment')}
            >
             Print
            </Button>
          </TimeDiv>
        </PayContent>
      </TimeBox>
    );
  };