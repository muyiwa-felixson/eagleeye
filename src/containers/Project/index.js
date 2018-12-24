import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { urls, baseurl } from "../../api-requests/urls";
import { createForm, formShape } from "rc-form";
import { dispatchActions } from "../../store/actions/action-config.action";
import { ProjectAdd } from "../../commons/index";
import { PayComponent } from "./presentation/pay-component";
import { TimeComponent } from "./presentation/time-component";
import { ProjectReport } from "./presentation/project-report";
import { PayReport } from "./presentation/pay-report";
import { projectReportFields, paymentFields } from "../../config/form-fields";

import {
  TopSection,
  LowerSection,
} from "./components";
import {  LineBar } from "../Projects/components";
import {
  Button,
  Grid,
  Label,
  Panel,
  PaleButton,
  Aligner,
  H4,
  Loader,
  H5,
  P
} from "../../components/flex";
import { Theme } from "../../components/flex/theme";
import { getData } from "../../api-requests/index";
import { bindActionCreators } from "redux";
import { TimelineList} from './presentation/timeline';

const defaultState = {
  reportModal: false,
  paymentModal: false,
  projectCost: 34500200,
  expectedCost: 0
};

class Project extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  componentDidMount = () => {
    const { match } = this.props;
    const { params } = match;
    const { id, rev } = params;
    const proxyLoadProject = () => {
      return getData({ url: urls.getProject({ id, rev }) });
    };
    this.props.dispatActions("LOAD_PROJECT", { func: proxyLoadProject });
  };
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (!prevState.postData && nextState.postData) {
      this.resetPostData();
    }

    //
  }
  percentages = () => {
    let list = [];
    for (let i = 1; i <= 100; i++) {
      list.push({ value: i, label: `${i}%` });
    }
    return list;
  };
  resetPostData = () => {
    const { match } = this.props;
    const { params } = match;
    const { id, rev } = params;
    const proxyLoadProject = () => {
      return getData({ url: urls.getProject({ id, rev }) });
    };
    this.props.dispatchActions("LOAD_PROJECT", { func: proxyLoadProject });
    this.setState(() => {
      return {
        postData: null
      };
    });
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  };
  onChangePercentage = selectedOption => {
    this.setState({
      expectedCost: (this.state.projectCost * selectedOption.value) / 100
    });
  };
  closeReportModal = () => {
    this.setState(() => {
      return {
        reportModal: false
      };
    });
  };
  closePaymentModal = () => {
    this.setState(() => {
      return {
        paymentModal: false
      };
    });
  };
  submitForm = ev => {
    ev.preventDefault();
    const { submitButtonLoading } = this.state;
    const formElements = ev.target.elements;
    const { match, loadProjectPayload = {} } = this.props;
    const { params } = match;
    const { id, rev } = params;
    let obj2 = {};
    projectReportFields.map(field => {
      obj2[field] = formElements[field].value;
    });
    let obj = {
      ...loadProjectPayload,
      reports: [...loadProjectPayload.reports, obj2]
    };

    this.setState(
      () => {
        return {
          submitButtonLoading: true
        };
      },
      () => {
        getData({
          url: baseurl,
          inputData: { doc: obj, dbname: "project", id, rev },
          context: "PATCH"
        })
          .then(data => {
            this.setState(() => {
              this.form.reset();
              return {
                postData: data,
                submitButtonLoading: false,
                reportModal: false
              };
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };
  submitFormPay = ev => {
    ev.preventDefault();
    const { submitButtonLoading } = this.state;
    const formElements = ev.target.elements;
    const { match, loadProjectPayload = {} } = this.props;
    const { params } = match;
    const { id, rev } = params;
    let obj2 = {};
    paymentFields.map(field => {
      obj[field] = formElements[field].value;
    });
    let obj = {
      ...loadProjectPayload,
      payments: [...loadProjectPayload.payments, obj2],
    };

    this.setState(
      () => {
        return {
          submitButtonLoading: true
        };
      },
      () => {
        getData({
          url: baseurl,
          inputData: { doc: obj, dbname: "project", id, rev },
          context: "PATCH"
        })
          .then(data => {
            this.setState(() => {
              this.form.reset();
              return {
                postData: data,
                submitButtonLoading: false,
                reportModal: false
              };
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };
  preSubmitForm = ref => {
    if (ref) {
      ref.dispatchEvent(new Event("submit"));
    }
  };
  preSubmitFormPay = ref => {
    if (ref) {
      ref.dispatchEvent(new Event("submit"));
    }
  };
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const {
      loadProjectPayload,
      loadProjectPending,
      loadProjectError
    } = this.props;
    const {
      code,
      name,
      description,
      funding,
      nature,
      type,
      duration,
      durationType,
      contractor,
      cost
    } = loadProjectPayload;
    const { reportModal, paymentModal } = this.state;
    return (
      <div>
        {loadProjectPending ? (
          <Loader />
        ) : (
          <React.Fragment>
            <ProjectAdd />
            <TopSection>
              <Panel>
                <Grid default="3fr 1fr">
                  <div className="right-bar">
                    <Label>Project Code</Label>
                    <H4>{code} </H4>

                    <Label>Project Name</Label>
                    <H5>{name}</H5>

                    <Label>Description</Label>
                    <P>{description}</P>

                    <Grid default="1fr 1.5fr 1fr" className="minibox">
                      <div>
                        <Label>Nature of Project</Label>
                        <span className="answer">{nature}</span>
                      </div>
                      <div>
                        <Label>Types of Project</Label>
                        <span className="answer">{type}</span>
                      </div>
                      <div>
                        <Label>Source of Funding</Label>
                        <span className="answer">{funding}</span>
                      </div>
                    </Grid>
                    <Grid default="1fr 1.5fr 1fr" className="minibox">
                      <div>
                        <Label>Project Duration</Label>
                        <span className="answer">
                          <i className="icon-clock"> </i> {duration} " "{" "}
                          {durationType}
                        </span>
                      </div>
                      <div>
                        <Label>Contractor</Label>
                        <span className="answer">
                          <i className="icon-certificate"> </i> {contractor}
                        </span>
                      </div>
                      <div>
                        <Label>Project Cost</Label>
                        <strong className="answer">
                          <i className="icon-credit-card"> </i> {cost}
                        </strong>
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
                    <Button
                      onClick={() => this.setState({ paymentModal: true })}
                    >
                      Make New Payment
                    </Button>
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
                        <div>
                          <span className="perval">76%</span>
                        </div>
                        <div>
                          <Label>Reported Coverage</Label>
                          <LineBar
                            percentage="76%"
                            color={Theme.PrimaryGreyDark}
                          />
                        </div>
                        <div>
                          <span className="perval">50%</span>
                        </div>
                        <div>
                          <Label>Approved Reports</Label>
                          <LineBar percentage="50%" />
                        </div>
                      </Grid>
                    </div>
                    <Aligner right>
                      <PaleButton
                        color={Theme.PrimaryBlue}
                        onClick={() => this.setState({ reportModal: true })}
                      >
                        New Report
                      </PaleButton>
                    </Aligner>
                  </Grid>
                </div>
              </Panel>
            </LowerSection>
            <TimelineList />
            <ProjectReport
              preSubmitForm={this.preSubmitForm}
              submitForm={this.submitForm}
              closeReportModal={this.closeReportModal}
              reportModal={reportModal}
            />
            <PayReport
              paymentModal={paymentModal}
              presubmitForm={this.preSubmitFormPay}
              closePaymentModal={this.closePaymentModal}
              percentage={this.percentages}
              submitForm={this.submitFormPay}
              getFieldsProps={this.props.getFieldProps}
            />
            :{" "}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ loadProject }) => ({
  loadProjectPending: loadProject.pending,
  loadProjectError: loadProject.error,
  loadProjectPayload: loadProject.payload ? loadProject.payload : null
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(createForm()(PayComponent)));
