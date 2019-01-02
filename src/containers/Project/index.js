import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { urls, baseurl } from "../../api-requests/urls";
import { dispatchActions } from "../../store/actions/action-config.action";
import { ProjectAdd } from "../../commons/index";
import { ProjectReport } from "./presentation/project-report";
import { PayReport } from "./presentation/pay-report";
import { projectReportFields, paymentFields } from "../../config/form-fields";
import { TopSection, LowerSection, Previewer } from "./components";
import { withCookies, Cookies } from "react-cookie";
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
  P,
  ModalBody,
  ModalClose,
  Modal,
  ModalContent
} from "../../components/flex";
import { Theme } from "../../components/flex/theme";
import { getData } from "../../api-requests/index";
import { bindActionCreators } from "redux";
import { TimelineList } from "./presentation/timeline";
import { guid } from "../../utils/utils";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2
});

const defaultState = {
  reportModal: false,
  paymentModal: false,
  projectCost: 34500200,
  expectedCost: 0,
  mergedList: null,
  totalPayable: 0,
  image: [],
  displayImages: [],
  submitButtonLoading: false,
  copleted: 0,
  approvingPost: false,
  decliningPost: false,
  preview: false,
  previewElement: {
    type: "img",
    source: ""
  },
  canCreateReports: false,
  canInitiatePayement: false,
  canEditReports: false
};

class Project extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id, rev } = params;
    const { cookies, history, userInfoPayload } = this.props;
    const token = cookies.get("token");
    console.log(token, " here is token and tokenisation");
    if (!token) {
      history.push("/login");
    }
    const proxyGetInfo = () => {
      return getData({ url: urls.verify({ token }) });
    };
    this.props.dispatchActions("USER_INFO", { func: proxyGetInfo });

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
    if (!prevProps.userInfoPayload && nextProps.userInfoPayload) {
      this.checkInfo();
    }
    if (prevProps.loadProjectPending && nextProps.loadProjectPayload) {
      const { loadProjectPayload } = nextProps;
      let { reports, payments } = loadProjectPayload;
      if (!reports) reports = [];
      if (!payments) payments = [];
      const mergedList = [...reports, ...payments];
      this.sortByDate(mergedList, reports, payments);
    }
    if (nextProps.approvePostPayload && prevProps.approvePostPending) {
      this.resetPostData();
    }
    if (nextProps.declinePostPayload && prevProps.declinePostPending) {
      this.resetPostData();
    }
    if (prevState.reportModal != nextState.reportModal) {
      this.resetImage();
    }
    //
  }
  checkInfo = () => {
    const { userInfoPayload, userInfoError, history } = this.props;
    if (!userInfoPayload || userInfoError) {
      history.push("/login");
    } else {
      const { permissionList } = userInfoPayload;
      const tcanCreateReports = "Can create reports";
      const tcanInitiatePayment = "Can initiate payments";
      const tcanEditReports = "Can edit reports";
      const indexCreateReports = permissionList.findIndex(
        p => p === tcanCreateReports
      );
      const indexPayment = permissionList.findIndex(
        p => p === tcanInitiatePayment
      );
      const indexEdit = permissionList.findIndex(p => p === tcanEditReports);
      this.setState(() => {
        return {
          canCreateReports: indexCreateReports > -1,
          canEditReports: indexEdit > -1,
          canInitiatePayement: indexPayment > -1
        };
      });
    }
  };
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
  percentages = (stat = "payment", approved = false) => {
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
        if (!approved) {
          percent = parseInt(this.getPercentCompleted(), 10);
        } else {
          percent = parseInt(this.getPercentCompleted(true), 10);
        }
      }
    }
    ceilVal = 100;
    let list = [];
    for (let i = percent + 1; i <= ceilVal; i++) {
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
  resetImage = () => {
    this.setState(() => {
      return {
        displayImages: [],
        image: [],
        submitButtonLoading: false
      };
    });
  };
  readFiles = file => {
    if (file) {
      const reader = new FileReader();
      if (!file.length) {
        reader.onload = e => {
          const newImage = e.target.result;
          if (!file.length) {
            const { displayImages } = this.state;
            this.setState(() => {
              displayImages.push(newImage);
              return {
                displayImages
              };
            });
          }
          // target.reset();
        };
        reader.removeEventListener("load", () => {});
      }
      if (!file.length) {
        reader.readAsDataURL(file);
      } else {
        const { displayImages = [] } = this.state;
        file.map(f => {
          const r = new FileReader();
          r.onload = e => {
            const image = e.target.result;
            displayImages.push(image);
          };
          r.onloadend = () => {
            this.setState(() => {
              return {
                displayImages
              };
            });
          };
          r.readAsDataURL(f);
          r.removeEventListener("load", () => {});
        });
      }
    }
  };

  imageChanged = (ev, ref) => {
    const target = ev.target;
    let files = ev.target.files;
    // files = Object.assign(ev.target.files, files);
    this.readFiles(files["0"], target);
    let { image = [] } = this.state;
    if (files.length < 2) {
      image.push(files["0"]);
      this.setState(() => {
        return {
          image
        };
      });
    } else {
      const images = [];
      for (let i = 0; i < files.length; i++) {
        images.push(files[String(i)]);
        image.push(files[String(i)]);
      }
      this.readFiles(images);

      this.setState(() => {
        return {
          image
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
        reportModal: false,
        displayImage: []
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
    const { match, loadProjectPayload = {}, userInfoPayload } = this.props;
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
          inputData: {
            doc: obj,
            dbname: "project",
            id,
            rev,
            confirmed: false,
            intent: "createReport",
            token: userInfoPayload.token
          },
          context: "PATCH"
        })
          .then(data => {
            const { image } = this.state;
            const dataF = new FormData();
            if (image) {
              let url = "";
              let m = image;
              if (m.length && m.length > 1) {
                url = urls.postMultipleMedia;
                m.map(f => {
                  dataF.append("photos[]", f, f.filename);
                });
              } else {
                url = urls.postSingleMedia;
                dataF.append("reports", m[0], m[0].filename);
              }

              dataF.append("doc", obj);
              dataF.append("reportId", reportId);
              dataF.append("rev", data.rev);
              dataF.append("id", data.id);
              dataF.append("token", userInfoPayload.token);

              axios
                .post(url, dataF, {
                  onUploadProgress: progressEvent => {
                    // do something
                    const stat =
                      (progressEvent.loaded / progressEvent.total) * 100;
                  }
                })
                .then(data2 => {
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
    const { match, loadProjectPayload = {}, userInfoPayload } = this.props;
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
    console.log(obj2, ' obj22222222')
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
          inputData: {
            doc: obj,
            dbname: "project",
            id,
            rev,
            itent: "initiatePayment",
            token: userInfoPayload.token
          },
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
  declinePost = reportId => {
    const { loadProjectPayload, userInfoPayload } = this.props;
    const { _id, _rev } = loadProjectPayload;
    if (loadProjectPayload.reports) {
      const report = loadProjectPayload.reports.filter(
        report => report.id === reportId
      )[0];
      report.approved = true;
      let withoutReport = loadProjectPayload.reports.filter(
        report => report.id !== reportId
      );
      delete loadProjectPayload.reports;
      loadProjectPayload.reports = withoutReport;
      const proxyUpdate = () => {
        return getData({
          url: urls.postProject,
          inputData: {
            doc: loadProjectPayload,
            dbname: "project",
            id: _id,
            rev: _rev,
            intent: "editProject",
            token: userInfoPayload.token
          },
          context: "PATCH"
        });
      };
      this.props.dispatchActions("DECLINE_POST", { func: proxyUpdate });
    }
  };
  approvePost = reportId => {
    const { loadProjectPayload, userInfoPayload } = this.props;
    const { _id, _rev } = loadProjectPayload;
    if (loadProjectPayload.reports) {
      const report = loadProjectPayload.reports.filter(
        report => report.id === reportId
      )[0];
      report.approved = true;
      let withoutReport = loadProjectPayload.reports.filter(
        report => report.id !== reportId
      );
      withoutReport = [...withoutReport, report];
      delete loadProjectPayload.reports;
      loadProjectPayload.reports = withoutReport;
      const proxyUpdate = () => {
        return getData({
          url: urls.postProject,
          inputData: {
            intent: "editReport",
            token: userInfoPayload.token,
            doc: loadProjectPayload,
            dbname: "project",
            id: _id,
            rev: _rev
          },
          context: "PATCH"
        });
      };
      this.props.dispatchActions("APPROVE_POST", { func: proxyUpdate });
    }
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
      const payment = sortedPayments[0] || {};
      const { percentage = 0 } = payment;
      totalCoverage = percentage;
      // sortedPayments.map(payment => {
      //   let { percentage } = payment;
      //   if (!isNaN(parseInt(percentage, 10))) {
      //     totalCoverage += parseInt(percentage);
      //   }
      // });
      if (!totalCoverage) totalCoverage = 0;
      return totalCoverage;
    }
  };
  getPercentCompleted = (approved = false) => {
    const { sortedReports } = this.state;
    let totalCoverage = 0;
    if (sortedReports) {
      if (!approved && sortedReports && sortedReports.length > 0) {
        const report = sortedReports[0];
        const { completionLevel } = report;
        return completionLevel;
      } else {
        for (let i = 0; i < sortedReports.length; i++) {
          const report = sortedReports[i];
          const { completionLevel } = report;
          if (report.approved) {
            totalCoverage = completionLevel;
            break;
          }
        }
      }
      return totalCoverage;
    }
  };

  previewMedia = previewed => {
    this.setState({
      preview: true,
      previewElement: {
        type: previewed.type,
        source: previewed.source
      }
    });
  };

  closePreview = () => {
    this.setState({
      preview: false,
      previewElement: {
        type: "",
        source: ""
      }
    });
  };
  render() {
    const {
      loadProjectPayload = {},
      loadProjectPending,
      approvePostPending,
      userInfoPending,
      userInfoPayload
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
      media = [],
      unit = ""
    } = loadProjectPayload || {};
    const {
      reportModal,
      paymentModal,
      mergedList,
      sortedReports,
      sortedPayments,
      totalPayable,
      displayImages,
      submitButtonLoading,
      canCreateReports,
      canInitiatePayement,
      canEditReports
    } = this.state;
    return (
      <div>
        {userInfoPending || (loadProjectPending && !loadProjectPayload) ? (
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
                          <i className="icon-credit-card"> </i>{" "}
                          {formatter.format(cost)}
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
                        <span className="answer">{unit}</span>
                      </div>
                    </Grid>
                  </div>
                  <Aligner center>
                    <P>PAYMENTS</P>
                    <H4 className="paid">{`${
                      this.getPercentPaid() ? this.getPercentPaid() : 0
                    }%`}</H4>
                    <P>Of Project Cost has been approved for payment</P>
                    {canInitiatePayement ? (
                      <Button
                        onClick={() => this.setState({ paymentModal: true })}
                      >
                        Make New Payment
                      </Button>
                    ) : null}
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
                      {canCreateReports ? (
                        <PaleButton
                          color={Theme.PrimaryBlue}
                          onClick={() => this.setState({ reportModal: true })}
                        >
                          New Report
                        </PaleButton>
                      ) : null}
                    </Aligner>
                  </Grid>
                </div>
              </Panel>
            </LowerSection>
            <TimelineList
              approvePost={id => this.approvePost(id)}
              declinePost={id => this.declinePost(id)}
              mergedList={mergedList}
              canCreateReports={canCreateReports}
              canInitiatePayement={canInitiatePayement}
              canEditReports={canEditReports}
              media={media}
              approvePostPending={approvePostPending}
              previewer={this.previewMedia}
            />
            {reportModal ? (
              <ProjectReport
                preSubmitForm={this.preSubmitForm}
                submitForm={this.submitForm}
                coverageReported={this.getPercentCompleted}
                closeReportModal={this.closeReportModal}
                reportModal={reportModal}
                name={name}
                reporter={`${userInfoPayload.firstname} ${
                  userInfoPayload.lastname
                }`}
                canCreateReports={canCreateReports}
                canInitiatePayement={canInitiatePayement}
                canEditReports={canEditReports}
                submitButtonLoading={submitButtonLoading}
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
                reporter={`${userInfoPayload.firstname} ${
                  userInfoPayload.lastname
                }`}
                totalPayable={totalPayable}
                calculatePayable={this.calculatePayable}
                name={name}
                canCreateReports={canCreateReports}
                canInitiatePayement={canInitiatePayement}
                canEditReports={canEditReports}
                cost={cost}
                submitFormPay={this.submitFormPay}
                getFieldsProps={this.props.getFieldProps}
              />
            ) : null}

            <Modal open={this.state.preview} backDropOpacity={0.2}>
              <ModalBody
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
                width="90%"
              >
                <ModalClose
                  onClick={() => this.closePreview()}
                  style={{ color: "#ccc" }}
                />
                <ModalContent>
                  <Previewer>
                    <img src={this.state.previewElement.source} />
                  </Previewer>
                </ModalContent>
              </ModalBody>
            </Modal>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  loadProject,
  postCompletionStat,
  approvePost,
  declinePost,
  userInfo
}) => ({
  loadProjectPending: loadProject.pending,
  loadProjectError: loadProject.error,
  loadProjectPayload: loadProject.payload,
  postCompletionStatPending: postCompletionStat.pending,
  postCompletionStatError: postCompletionStat.error,
  postCompletionStatPayload: postCompletionStat.payload,
  approvePostPayload: approvePost.payload,
  approvePostPending: approvePost.pending,
  approvePostError: approvePost.error,
  declinePostPayload: declinePost.payload,
  declinePostPending: declinePost.pending,
  declinePostError: declinePost.error,
  userInfoPending: userInfo.pending,
  userInfoError: userInfo.error,
  userInfoPayload: userInfo.payload
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(Project)));
