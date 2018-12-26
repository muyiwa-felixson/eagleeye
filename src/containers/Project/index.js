import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { urls, baseurl } from "../../api-requests/urls";
import { createForm, formShape } from "rc-form";
import { dispatchActions } from "../../store/actions/action-config.action";
import { ProjectAdd } from "../../commons/index";
import { ProjectReport } from "./presentation/project-report";
import { PayReport } from "./presentation/pay-report";
import { projectReportFields, paymentFields } from "../../config/form-fields";
import { TopSection, LowerSection } from "./components";
import { LineBar } from "../Projects/components";
import axios from "axios";
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
import { TimelineList } from "./presentation/timeline";
import { guid } from "../../utils/utils";

const defaultState = {
  reportModal: false,
  paymentModal: false,
  projectCost: 34500200,
  expectedCost: 0,
  mergedList: null,
  totalPayable: 0,
  image: null,
  displayImages: []
};

class Project extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  componentDidMount() {
    console.log("component mounting ..");
    const { match } = this.props;
    const { params } = match;
    const { id, rev } = params;
    const proxyLoadProject = () => {
      return getData({ url: urls.getProject({ id, rev }) });
    };
    this.props.dispatchActions("LOAD_PROJECT", { func: proxyLoadProject });
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    if (!prevState.postData && nextState.postData) {
      this.resetPostData();
    }
    if (prevProps.loadProjectPending && nextProps.loadProjectPayload) {
      const { loadProjectPayload } = nextProps;
      let { reports, payments } = loadProjectPayload;
      if (!reports) reports = [];
      if (!payments) payments = [];
      const mergedList = [...reports, ...payments];
      this.sortByDate(mergedList, reports, payments);
    }

    //
  }
  sortByDate = (mergedList, reports, payments) => {
    const sortFunction = (a, b) => {
      const date1 = new Date(a.submittedOn);
      const date2 = new Date(b.submittedOn);
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
      return 0;
    };
    const sorted = mergedList.sort(sortFunction);
    const sortedReports = reports.sort(sortFunction);
    const sortedPayments = payments.sort(sortFunction);
    this.setState({
      mergedList: sorted,
      sortedReports,
      sortedPayments
    });
  };
  percentages = (stat = "payment") => {
    let ceilVal = 100;
    let percent = 0;
    if (stat == "payment") {
      if (!this.getPercentPaid()) {
        percent = 0;
      } else {
        percent = this.getPercentPaid();
      }
    } else {
      if (!this.getPercentCompleted()) {
        percent = 0;
      } else {
        percent = this.getPercentCompleted();
      }
    }
    ceilVal = 100 - percent;
    let list = [];
    for (let i = 1; i <= ceilVal; i++) {
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

  readFiles = (file, target) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const newImage = e.target.result;
        this.setState(() => {
          const { displayImages } = this.state;
          displayImages.push(newImage);
          return {
            displayImages
          };
        });
        reader.removeEventListener("load", () => {});
        // target.reset();
      };

      reader.readAsDataURL(file);
    }
  };

  imageChanged = ev => {
    const target = ev.target;
    const files = ev.target.files;
    this.readFiles(files["0"], target);
    if (files.length < 2) {
      this.setState(() => {
        return {
          image: files["0"]
        };
      });
    }
  };
  submit = () => {
    this.props.form.validateFields((error, value) => {
      // Do nothing
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
  calculatePayable = (ev, cost) => {
    const percentage = ev.value;
    if (percentage) {
      console.log(percentage);
      let num = percentage;
      num = parseInt(num, 10);
      const payable = (percentage / 100) * cost;
      this.setState(() => {
        return {
          totalPayable: payable
        };
      });
    }
  };
  submitForm = ev => {
    ev.preventDefault();
    let doc = null;
    const { submitButtonLoading } = this.state;
    const formElements = ev.target.elements;
    const { match, loadProjectPayload = {} } = this.props;
    const { params } = match;
    const { id } = params;
    const rev = loadProjectPayload._rev;
    let obj2 = {};
    const { reports = [] } = loadProjectPayload;
    projectReportFields.map(field => {
      try {
        obj2[field] = formElements[field].value;
      } catch (err) {
        // Do nothing
      }
    });
    const reportId = guid();
    obj2.submittedOn = new Date();
    obj2.category = "reports";
    obj2.approved = false;
    obj2.id = reportId;
    delete loadProjectPayload._id;
    delete loadProjectPayload._rev;
    let obj = {
      ...loadProjectPayload,
      reports: [...reports, obj2]
    };
    doc = obj;
    this.setState(
      () => {
        return {
          submitButtonLoading: true
        };
      },
      () => {
        getData({
          url: urls.postProject,
          inputData: { doc: obj, dbname: "project", id, rev, confirmed: false },
          context: "PATCH"
        })
          .then(data => {
            const { image } = this.state;
            const dataF = new FormData();
            const media = [image];
            if (image) {
              console.log("Image is here = == >");
              let url = "";
              let m = null;
              url = urls.postSingleMedia;
              m = image;
              dataF.append("reports", m, m.filename);
              dataF.append("doc", obj);
              dataF.append("reportId", reportId);
              dataF.append("rev", data.rev);
              dataF.append("id", data.id);

              axios
                .post(url, dataF, {
                  onUploadProgress: progressEvent => {
                    // do something
                    const stat =
                      (progressEvent.loaded / progressEvent.total) * 100;
                  }
                })
                .then(data2 => {
                  console.log(data2);
                  this.closeReportModal();
                  this.setState(() => {
                    return {
                      postData: data,
                      media: false,
                      submitButtonLoading: false,
                      reportModal: false
                    };
                  });
                })
                .catch(err => console.error(err));
            } else {
              this.closeReportModal();
              this.setState(() => {
                return {
                  postData: data,
                  submitButtonLoading: false,
                  reportModal: false
                };
              });
            }
          })
          .catch(err => {
            this.setState(() => {
              this.closeReportModal();
              return {
                postData: {},
                submitButtonLoading: false,
                reportModal: false
              };
            });
          });
      }
    );
  };
  submitFormPay = ev => {
    ev.preventDefault();
    const formElements = ev.target.elements;
    const { match, loadProjectPayload = {} } = this.props;
    const { params } = match;
    const { id } = params;
    const rev = loadProjectPayload._rev;
    let obj2 = {};
    const { payments = [] } = loadProjectPayload;
    paymentFields.map(field => {
      try {
        obj2[field] = formElements[field].value;
      } catch (err) {
        // Do nothing
      }
    });
    obj2.submittedOn = new Date();
    obj2.category = "payments";
    obj2.id = guid();
    let obj = {
      ...loadProjectPayload,
      payments: [...payments, obj2]
    };
    this.setState(
      () => {
        return {
          submitButtonLoading: true
        };
      },
      () => {
        getData({
          url: urls.postProject,
          inputData: { doc: obj, dbname: "project", id, rev },
          context: "PATCH"
        })
          .then(data => {
            this.setState(() => {
              this.closePaymentModal();
              return {
                postData: data,
                submitButtonLoading: false,
                paymentModal: false
              };
            });
          })
          .catch(err => {
            this.closePaymentModal();
            this.setState(() => {
              return {
                postData: {},
                submitButtonLoading: false,
                paymentModal: false
              };
            });
          });
      }
    );
  };
  preSubmitForm = ref => {
    if (ref) {
      ref.current.dispatchEvent(new Event("submit"));
    }
  };
  preSubmitFormPay = ref => {
    if (ref) {
      ref.current.dispatchEvent(new Event("submit"));
    }
  };
  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  });
  getPercentPaid = () => {
    const { sortedPayments } = this.state;
    if (sortedPayments && sortedPayments.length > 0) {
      let totalCoverage = 0;
      sortedPayments.map(payment => {
        let { percentage } = payment;
        if (!isNaN(parseInt(percentage, 10))) {
          totalCoverage += parseInt(percentage);
        }
      });
      if (!totalCoverage) totalCoverage = 0;
      return totalCoverage;
    }
  };
  getPercentCompleted = (approved = false) => {
    const { sortedReports } = this.state;
    if (sortedReports && sortedReports.length > 0) {
      let totalCoverage = 0;
      if (!approved) {
        sortedReports.map(report => {
          let { completionLevel } = report;
          totalCoverage += parseInt(completionLevel);
        });
      } else {
        sortedReports.map(report => {
          let { completionLevel } = report;
          if (report.approved) {
            totalCoverage += parseInt(completionLevel);
          }
        });
      }
      if (!totalCoverage) totalCoverage = 0;
      return totalCoverage;
    }
  };
  render() {
    let errors;
    // const { getFieldProps, getFieldError } = this.props.form;
    const {
      loadProjectPayload = {},
      loadProjectPending,
      loadProjectError
    } = this.props;
    const {
      code = "",
      name = "",
      description = "",
      funding = "",
      nature = "",
      type = "",
      duration = "",
      durationType = "",
      contractor = "",
      cost = "",
      media = []
    } = this.props.loadProjectPayload || {};
    const {
      reportModal,
      paymentModal,
      mergedList,
      sortedReports,
      sortedPayments,
      totalPayable,
      displayImages
    } = this.state;
    const lastPayment =
      sortedPayments && sortedPayments.length > 0
        ? sortedPayments[0].percentage
        : 0;

    const lastCost =
      sortedPayments && sortedPayments.length > 0 ? sortedPayments[0].cost : 0;
    const lastReportCompletion =
      sortedReports && sortedReports.length > 0
        ? sortedReports[0].completionLevel
        : 0;
    console.log(mergedList, " and etc");
    return (
      <div>
        {loadProjectPending && !loadProjectPayload ? (
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
                          <i className="icon-clock"> </i> {duration}{" "}
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
                    <H4 className="paid">{`${
                      this.getPercentPaid() ? this.getPercentPaid() : 0
                    }%`}</H4>
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
                          <span className="perval">{`${
                            this.getPercentCompleted()
                              ? this.getPercentCompleted()
                              : 0
                          }%`}</span>
                        </div>
                        <div>
                          <Label>Reported Coverage</Label>
                          <LineBar
                            percentage={`${
                              this.getPercentCompleted()
                                ? this.getPercentCompleted()
                                : 0
                            }%`}
                            color={Theme.PrimaryGreyDark}
                          />
                        </div>
                        <div>
                          <span className="perval">{`${
                            this.getPercentCompleted(true)
                              ? this.getPercentCompleted(true)
                              : 0
                          }%`}</span>
                        </div>
                        <div>
                          <Label>{`${
                            this.getPercentCompleted(true)
                              ? this.getPercentCompleted(true)
                              : 0
                          }%`}</Label>
                          <LineBar
                            percentage={`${
                              this.getPercentCompleted(true)
                                ? this.getPercentCompleted(true)
                                : 0
                            }%`}
                          />
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
            <TimelineList mergedList={mergedList} media={media} />
            {reportModal ? (
              <ProjectReport
                preSubmitForm={this.preSubmitForm}
                submitForm={this.submitForm}
                coverageReported={this.getPercentCompleted}
                closeReportModal={this.closeReportModal}
                reportModal={reportModal}
                name={name}
                imageChanged={this.imageChanged}
                displayImages={displayImages}
                percentages={this.percentages}
              />
            ) : null}
            {paymentModal ? (
              <PayReport
                paymentModal={paymentModal}
                preSubmitFormPay={this.preSubmitFormPay}
                closePaymentModal={this.closePaymentModal}
                percentages={this.percentages}
                paidPercent={this.getPercentPaid}
                totalPayable={totalPayable}
                calculatePayable={this.calculatePayable}
                name={name}
                cost={cost}
                submitFormPay={this.submitFormPay}
                getFieldsProps={this.props.getFieldProps}
              />
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ loadProject }) => ({
  loadProjectPending: loadProject.pending,
  loadProjectError: loadProject.error,
  loadProjectPayload: loadProject.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(createForm()(Project)));
