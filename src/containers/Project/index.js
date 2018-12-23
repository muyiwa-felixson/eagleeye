import React, { Component } from 'react';
import { TopSection, LowerSection } from './components';
import { TopBar, LineBar } from '../Projects/components';
import { Button, Input, Grid, SimpleSelect, Label, Panel, PaleButton, Aligner, H4, H5, P } from '../../components/flex';
import { Theme } from '../../components/flex/theme';

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
                    <span className="answer">8 weeks</span>
                  </div>
                  <div>
                    <Label>Contractor</Label>
                    <span className="answer"><i className="icon-certificate"> </i> Webscript Solutions Limited Nigeria</span>
                  </div>
                  <div>
                    <Label>Project Cost</Label>
                    <strong className="answer">N34,500,200</strong>
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
      </div>
    )
  }
}

export default Project;