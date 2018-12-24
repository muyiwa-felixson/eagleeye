import React from "react";
import {
  TimeLine,

} from "../components";
import {
  Panel,
} from "../../../components/flex";
import { Theme } from "../../../components/flex/theme";
import { TimeComponent } from './time-component';
import { PayComponent } from './pay-component';
export const TimelineList = props => {
  const { reportModal, closeReportModal } = props;
  return (
    <Panel>
      <TimeLine>
        <TimeComponent
          type="report"
          confirmed={false}
          day="24"
          month="NOV"
          year="2018"
          level={55}
          submittedBy="Damina Ibra"
          fullDate="01:34PM Tue, 24th Nov 2018"
          comment="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores"
          media={[
            { type: "picture" },
            { type: "picture" },
            { type: "video" },
            { type: "picture" }
          ]}
        />

        <PayComponent
          approvedBy="Mr Salki Abdul"
          day="2"
          month="JUN"
          year="2018"
          ullDate="01:34PM Tue, 2nd Jun 2018"
          level={25}
          comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
        />

        <TimeComponent
          type="report"
          confirmed={true}
          confirmedBy="Mikhail Olufadi"
          day="2"
          month="JUN"
          year="2018"
          level={25}
          submittedBy="Damina Ibra"
          fullDate="01:34PM Tue, 2nd Jun 2018"
          comment="Tit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores"
          media={[{ type: "video" }, { type: "picture" }]}
        />
      </TimeLine>
    </Panel>
  );
};
