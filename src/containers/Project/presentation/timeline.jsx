import React from "react";
import { TimeLine } from "../components";
import { Panel } from "../../../components/flex";
import { Theme } from "../../../components/flex/theme";
import { TimeComponent } from "./time-component";
import { PayComponent } from "./pay-component";
import * as moment from "moment";
import { getMonth } from "../../../utils/utils";
export const TimelineList = props => {
  const { mergedList, approvePost, declinePost, previewer } = props;
  return (
    <Panel>
      <TimeLine>
        {mergedList && mergedList.length > 0 ? (
          mergedList.map((item, index) => {
            const {
              type,
              submittedOn,
              submittedBy,
              percentage,
              reportComment,
              completionLevel,
              approved,
              category,
              id,
              media = []
            } = item;
            const m = media.map(pic => {
              console.log(pic, "pic");
              return {
                type: "picture",
                image: pic
              };
            });
            const date = new Date(submittedOn);
            const year = date.getFullYear();
            const month = getMonth(date.getMonth());
            const day = date.getDate();
            if (category == "reports") {
              return (
                <TimeComponent
                  type="report"
                  key={index}
                  confirmed={approved}
                  day={day}
                  reportId={id}
                  month={month}
                  approvePost={id => approvePost(id)}
                  declinePost={id => declinePost(id)}
                  year={year}
                  level={completionLevel}
                  submittedBy={submittedBy}
                  fullDate={moment(date).format("DD MMMM YYYY")}
                  comment={reportComment}
                  media={m}
                  previewer={previewer}
                />
              );
            } else {
              return (
                <PayComponent
                  approvedBy="Mr Salki Abdul"
                  day={day}
                  key={index}
                  month={month}
                  year={year}
                  fullDate={moment(date).format("DD MMMM YYYY")}
                  level={percentage}
                  comment={reportComment}
                />
              );
            }
          })
        ) : (
            <div>
              <h1>There are no reports or payment records to show</h1>
            </div>
          )}
      </TimeLine>
    </Panel>
  );
};
