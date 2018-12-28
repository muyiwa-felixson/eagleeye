import React from "react";
import {
  TimeBox,
  TimeDate,
  TimeContent,
  TimeDiv,
  Picture,
  Video
} from "../components";
import { Button, Grid, Label, PaleButton } from "../../../components/flex";
import { Theme } from "../../../components/flex/theme";
import { getExtension, videoFilter } from "../../../utils/utils";
import moment from 'moment';


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
  reportId,
  comment,
  media,
  approvePost,
  declinePost,
  previewer
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
            <Button onClick={() => approvePost(reportId)}>Approve</Button>
            <PaleButton color={Theme.PrimaryBlue}>Update</PaleButton>
            <Button
              onClick={() => declinePost(reportId)}
              color={Theme.PrimaryRed}
            >
              Decline
            </Button>
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
            {media.map(elem => {
              const isVideo = videoFilter(getExtension(elem.image));
              return !isVideo ? (
                <Picture backgroundImage={elem.image} onClick={() => previewer({ type: "picture", source: elem.image })} />
              ) : (
                  <Video>
                    <video
                      type="video/mp4"
                      style={{ width: "100%", height: "100%", display: "block" }}
                      autoplay={false}
                      loop={false}
                      controls={false}
                      muted={true}
                      onClick={() => previewer({ type: "video", source: elem.image })}
                    >
                      <source
                        // type="video/mp4"
                        // data-reactid=".0.1.0.0.0"
                        src={elem.image}
                      />
                    </video>
                  </Video>
                );
            })}
          </div>
        </TimeDiv>
      </TimeContent>
    </TimeBox>
  );
};
