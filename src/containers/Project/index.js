import React, { Component } from 'react';
import { TopSection, LowerSection, TimeLine, TimeBox, TimeDate, TimeContent, TimeDiv, Picture, Video, PayContent } from './components';
import { TopBar, LineBar } from '../Projects/components';
import { Button, Input, Grid, SimpleSelect, Label, Panel, PaleButton, Aligner, H4, H5, P } from '../../components/flex';
import { Theme } from '../../components/flex/theme';


const TimeComponent = (props) => {
  return (
    <TimeBox type={props.type}>
      <TimeDate><span>{props.day}, {props.month}</span><strong>{props.year}</strong></TimeDate>
      <TimeContent>
        {!props.confirmed &&
          <div className="button-section">
            <Button>Approve</Button>
            <PaleButton color={Theme.PrimaryBlue}>Update</PaleButton>
            <Button color={Theme.PrimaryRed}>Decline</Button>
          </div>
        }
        <TimeDiv confirmed={props.confirmed} type="report">
          <h3>{props.level}% <span>Complete</span></h3>
          <div className="badge">{props.confirmed ? "Confirmed" : "Pending confirmation"}</div>

          <Grid default="repeat(3, 1fr)">
            <div><Label>Submitted by</Label> {props.submittedBy}</div>
            <div><Label>Reported on</Label> {props.fullDate}</div>
            <div><Label>Confirmed By</Label> {props.confirmed ? props.confirmedBy : "Pending"}</div>
          </Grid>
          <Label>Comment</Label>
          <p>{props.comment}</p>

          <div className="media">
            {
              props.media.map(elem => (
                elem.type === "picture" ? <Picture /> : <Video />
              ))
            }
          </div>
        </TimeDiv>
      </TimeContent>
    </TimeBox>
  )
};

const PayComponent = (props) => {
  return (
    <TimeBox type={props.type}>
      <TimeDate><span>{props.day}, {props.month}</span><strong>{props.year}</strong></TimeDate>
      <PayContent>
        <TimeDiv type="payment">
          <h3>{props.level}% <span>Payment Approved</span></h3>

          <Grid default="repeat(3, 1fr)">
            <div><Label>Approved by</Label> {props.approvedBy}</div>
            <div><Label>Approved on</Label> {props.fullDate}</div>
          </Grid>
          <Label>Comment</Label>
          <p>{props.comment}</p>
        </TimeDiv>
      </PayContent>
    </TimeBox>
  )
};

class Project extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <TopBar>
          <div className="logo"><i className="icon-headphones" /></div>
          <div></div>
          <div>
            <Input type="search" />
          </div>
          <div>
            <Button iconLeft><i className="icon-folder" />New Project</Button>
          </div>
          <div><i className="alert icon-bell" /></div>
          <div>
            <i className="login-user icon-user-outline" />
          </div>
        </TopBar>
        <TopSection>
          <Panel>
            <Grid default="3fr 1fr">
              <div className="right-bar">
                <Label>Project Code</Label>
                <H4>NG/LOS/IKG/0034</H4>

                <Label>Project Name</Label>
                <H5>Very Long Project Name, Thats Spans Multiple Lines Like State Names And Local Government Names and Much More</H5>

                <Label>Description</Label>
                <P>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                </P>

                <Grid default="1fr 1.5fr 1fr" className="minibox">
                  <div>
                    <Label>Nature of Project</Label>
                    <span className="answer">Capital</span>
                  </div>
                  <div>
                    <Label>Types of Project</Label>
                    <span className="answer">Motorized Borehole</span>
                  </div>
                  <div>
                    <Label>Source of Funding</Label>
                    <span className="answer">Budgetary</span>
                  </div>
                </Grid>
                <Grid default="1fr 1.5fr 1fr" className="minibox">
                  <div>
                    <Label>Project Duration</Label>
                    <span className="answer"><i className="icon-clock" > </i> 8 weeks</span>
                  </div>
                  <div>
                    <Label>Contractor</Label>
                    <span className="answer"><i className="icon-certificate"> </i> Webscript Solutions Limited Nigeria</span>
                  </div>
                  <div>
                    <Label>Project Cost</Label>
                    <strong className="answer"><i className="icon-credit-card"> </i> N34,500,200</strong>
                  </div>
                </Grid>

                <Grid default="repeat(4,1fr)" className="minibox">
                  <div>
                    <Label>State</Label>
                    <span className="answer">Lagos</span>
                  </div>
                  <div>
                    <Label>LGA</Label>
                    <span className="answer">Ikeja</span>
                  </div>
                  <div>
                    <Label>Town</Label>
                    <span className="answer">Command</span>
                  </div>
                  <div>
                    <Label>Target Unit</Label>
                    <span className="answer">xxxxxx xxxxx xxx</span>
                  </div>
                </Grid>

              </div>
              <Aligner center>
                <P>PAYMENTS</P>
                <H4 className="paid">23%</H4>
                <P>Of Project Cost has been approved for payment</P>
                <Button>Make New Payment</Button>
              </Aligner>
            </Grid>
          </Panel>
        </TopSection>
        <LowerSection>
          <Panel>
            <div className="lower-buttons">
              <Grid default="2fr 1fr">
                <div>
                  <Grid default="50px auto 50px auto" padHorizontal="10px">
                    <div><span className="perval">76%</span></div>
                    <div><Label>Reported Coverage</Label><LineBar percentage="76%" color={Theme.PrimaryGreyDark} /></div>
                    <div><span className="perval">50%</span></div>
                    <div><Label>Approved Reports</Label><LineBar percentage="50%" /></div>
                  </Grid>
                </div>
                <Aligner right>
                  <PaleButton>New Report</PaleButton>
                </Aligner>
              </Grid>
            </div>
          </Panel>
        </LowerSection>
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
              media={
                [{ type: "picture" }, { type: "picture" }, { type: "video" }, { type: "picture" }]
              }
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
              media={
                [{ type: "video" }, { type: "picture" }]
              }
            />

          </TimeLine>
        </Panel>
      </div>
    )
  }
}

export default Project;