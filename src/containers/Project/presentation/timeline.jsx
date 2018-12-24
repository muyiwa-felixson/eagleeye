import React from "react";
import { TimeLine } from "../components";
import { Panel } from "../../../components/flex";
import { Theme } from "../../../components/flex/theme";
import { TimeComponent } from "./time-component";
import { PayComponent } from "./pay-component";
import * as moment from 'moment';
export const TimelineList = props => {
  const { mergedList } = props;
  console.log(mergedList,   ' and etc' )
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
              category
            } = item;
            const date = new Date(submittedOn);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            if (category == "reports") {
              return (
                <TimeComponent
                  type="report"
                  key={index}
                  confirmed={approved}
                  day={day}
                  month={month}
                  year={year}
                  level={completionLevel}
                  submittedBy={submittedBy}
                  fullDate={moment(date).format('DD MMMM YYYY')}
                  comment={reportComment}
                  media={[
                    { type: "picture" },
                    { type: "picture" },
                    { type: "video" },
                    { type: "picture" }
                  ]}
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
                  fullDate={moment(date).format('DD MMMM YYYY')}
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
