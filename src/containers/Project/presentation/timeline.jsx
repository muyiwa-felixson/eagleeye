import React from "react";
import { TimeLine } from "../components";
import { Panel } from "../../../components/flex";
import { Theme } from "../../../components/flex/theme";
import { TimeComponent } from "./time-component";
import { PayComponent } from "./pay-component";
import * as moment from "moment";
import { getMonth } from "../../../utils/utils";
import PlaceHolder from "../../../components/assets/placeholders";
export const TimelineList = props => {
  const {
    mergedList,
    approvePost,
    declinePost,
    previewer,
    canEditReports,
    canCreateReports,
    canInitiatePayment,
    project,
    editReport,
    printPage
  } = props;
  return (
    <Panel>
      {mergedList && mergedList.length > 0 ? (
        <TimeLine>

          {mergedList.map((item, index) => {
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
                  reportBody={item}
                  editReport={editReport}
                  day={day}
                  reportId={id}
                  canEditReports={canEditReports}
                  canCreateReports={canCreateReports}
                  canInitiatePayment={canInitiatePayment}
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
                  approvedBy={submittedBy}
                  day={day}
                  key={index}
                  paymentBody={item}
                  project={project}
                  month={month}
                  printPage={printPage}
                  canEditReports={canEditReports}
                  canCreateReports={canCreateReports}
                  canInitiatePayment={canInitiatePayment}
                  year={year}
                  fullDate={moment(date).format("DD MMMM YYYY")}
                  level={percentage}
                  comment={reportComment}
                />
              );
            }
          })
          }

        </TimeLine>
      ) : (
          <div>
            <PlaceHolder title="No report" type="locations" content="There are no reports or payment records to show" />
          </div>
        )}

    </Panel>
  );
};
