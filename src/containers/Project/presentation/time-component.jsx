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
import { Theme } from '../../../components/flex/theme';

export const TimeComponent = ({
  confirmed,
  confirmedBy,
  level,
  submittedBy,
  fullDate,
  type,
  day,
  month,
  year,
  comment,
  media
}) => {
  return (
    <TimeBox type={type}>
      <TimeDate>
        <span>
          {day}, {month}
        </span>
        <strong>{year}</strong>
      </TimeDate>
      <TimeContent>
        {!confirmed && (
          <div className="button-section">
            <Button>Approve</Button>
            <PaleButton color={Theme.PrimaryBlue}>Update</PaleButton>
            <Button color={Theme.PrimaryRed}>Decline</Button>
          </div>
        )}
        <TimeDiv confirmed={confirmed} type="report">
          <h3>
            {level}% <span>Complete</span>
          </h3>
          <div className="badge">
            {confirmed ? "Confirmed" : "Pending confirmation"}
          </div>

          <Grid default="repeat(3, 1fr)">
            <div>
              <Label>Submitted by</Label> {submittedBy}
            </div>
            <div>
              <Label>Reported on</Label> {fullDate}
            </div>
            <div>
              <Label>Confirmed By</Label> {confirmed ? confirmedBy : "Pending"}
            </div>
          </Grid>
          <Label>Comment</Label>
          <p>{comment}</p>

          <div className="media">
            {media.map(elem =>
              elem.type === "picture" ? <Picture /> : <Video />
            )}
          </div>
        </TimeDiv>
      </TimeContent>
    </TimeBox>
  );
};
