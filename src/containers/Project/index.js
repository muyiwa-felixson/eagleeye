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
import { projectFields } from "../../config/form-fields";
import { EditProject } from "./presentation/edit-project";
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
  payFormErrors: false,
  reportFormErrors: false,
  projectCost: 34500200,
  expectedCost: 0,
  mergedList: null,
  totalPayable: 0,
  image: [],
  displayImages: [],
  cotractors: [],
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
  canInitiatePayment: false,
  canEditReports: false,
  editingReport: null,
  projectModal: false,
  editingProject: null,
  submitButtonLoading: false,
  locations: [],
  postData: {},
  LGA: "",
  STATE: "",
  TOWN: "",
  contractors: [],
  locationsEdit: [],
  printModal: false,
  data: null,
  fromComponent: "",
  printing: false
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
    const proxygetContractors = () => {
      return getData({ url: urls.getContractors });
    };
    this.props.dispatchActions("GET_CONTRACTORS", {
      func: proxygetContractors
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;
    const nextState = this.state;
    console.log(" What is");
    if (!prevState.postData && nextState.postData) {
      this.resetPostData();
    }
    if (prevProps.userInfoPending && nextProps.userInfoPayload) {
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
    if (
      nextProps.approvePostPayload &&
      prevProps.approvePostPending &&
      !prevProps.approvePostPayload
    ) {
      this.resetPostData();
    }
    if (nextProps.declinePostPayload && prevProps.declinePostPending) {
      this.resetPostData();
    }
    if (prevState.reportModal !== nextState.reportModal) {
      this.resetImage();
    }
    if (prevProps.getContractorsPending && nextProps.getContractorsPayload) {
      this.setContractors();
    }
    if (prevState.submitButtonLoading && !nextState.submitButtonLoading) {
      this.resetPostData();
    }
    if (!prevState.reportModal && nextState.reportModal) {
      this.setFormErrors("report");
    }
    if (!prevState.paymentModal && nextState.paymentModal) {
      this.setFormErrors("payment");
    }
  }
  setFormErrors = context => {
    if (context === "report") {
      this.setState(() => {
        return { reportFormErrors: false };
      });
    } else {
      this.setState(() => {
        return { payFormErrors: false };
      });
    }
  };
  toggleProjectModal = () => {
    const { projectModal } = this.state;
    this.setState(() => {
      return {
        projectModal: !projectModal
      };
    });
  };
  setContractors = () => {
    const { getContractorsPayload = [] } = this.props;
    if (getContractorsPayload) {
      const contractors = getContractorsPayload.map(contractor => {
        return {
          name: contractor.doc.companyName,
          id: contractor.doc._id || contractor.id
        };
      });
      this.setState({ contractors });
    }
  };
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
          canInitiatePayment: indexPayment > -1
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
      sortedPayments,
      editingProject: this.props.loadProjectPayload,
      locationsEdit: this.props.loadProjectPayload.locations || []
    });
  };

  submitProjectEdits = ev => {
    ev.preventDefault();
    const {
      submitButtonLoading,
      dateOfAward,
      locationsEdit,
      editingProject
    } = this.state;
    const formElements = ev.target.elements;
    let obj = {};
    projectFields.map(field => {
      obj = {
        ...obj,
        [field]: formElements[field].value
      };
    });

    obj = {
      ...editingProject,
      ...obj,
      locations: locationsEdit
    };

    this.setState(
      () => {
        return {
          submitButtonLoading: true
        };
      },
      () => {
        if (!editingProject) {
          getData({
            url: urls.postProject,
            inputData: {
              doc: obj,
              dbname: "project",
              token: this.props.userInfoPayload.token,
              intent: "createProject"
            },
            context: "POST"
          })
            .then(data => {
              this.setState(() => {
                this.form.reset();
                return {
                  postData: "loading",
                  submitButtonLoading: false,
                  projectModal: false,
                  editingProject: null
                };
              });
            })
            .catch(err => {
              this.setState(() => {
                return {
                  postData: {},
                  submitButtonLoading: false,
                  projectModal: false,
                  editingProject: null
                };
              });
            });
        } else {
          getData({
            url: urls.postProject,
            inputData: {
              doc: obj,
              dbname: "project",
              id: this.state.editingProject._id,
              rev: this.state.editingProject._rev,
              _id: this.state.editingProject._id,
              _rev: this.state.editingProject._rev,
              token: this.props.userInfoPayload.token,
              intent: "createProject"
            },
            context: "PATCH"
          })
            .then(data => {
              this.setState(() => {
                return {
                  postData: "loading",
                  submitButtonLoading: false,
                  projectModal: false,
                  editingProject: null
                };
              });
            })
            .catch(err => {
              this.setState(() => {
                this.form.reset();
                return {
                  postData: {},
                  submitButtonLoading: false,
                  projectModal: false,
                  editingProject: null
                };
              });
            });
          // editing project
        }
      }
    );
  };

  printPage = (subdata, fromComponent, project) => {
    const printPageReact = window.open("/print", "Print Payment");
    localStorage.setItem(
      "fromPage",
      JSON.stringify({
        page: fromComponent,
        data: subdata,
        project,
        mergedList: this.state.mergedList
      })
    );
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
  editReport = report => {
    this.setState(() => {
      return {
        editingReport: report,
        reportModal: true
      };
    });
  };
  deleteImage = index => {
    let { image, displayImages } = this.state;
    image = image.filter((im, ind) => ind !== index);
    displayImages = displayImages.filter((im, ind) => ind !== index);
    this.setState(() => {
      return {
        image,
        displayImages
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
  editImageChanged = img => {
    let { image = [], displayImages = [] } = this.state;
    if (image.length < 1 || displayImages.length < 1) {
      displayImages = img;
      image = img;
      this.setState(() => {
        return {
          image,
          displayImages
        };
      });
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
        displayImage: [],
        editingReport: [],
        image: []
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
  submitEdits = form => {
    if (form) {
      form.dispatchEvent(new Event("submit"));
    }
  };

  handleLocChange = (e, name) => {
    let target;
    let value;
    try {
      target = e.target;
      value = target.value;
    } catch (error) {
      value = e.value;
    }
    if (value) {
      this.setState({
        [name]: value
      });
    }
  };
  deleteLocations = locationObject => {
    let { locationsEdit } = this.state;
    locationsEdit = locationsEdit.filter(location => {
      return (
        location.STATE !== locationObject.STATE &&
        location.LGA !== locationObject.LGA &&
        location.TOWN !== locationObject.TOWN
      );
    });
    this.setState(() => {
      return {
        locationsEdit
      };
    });
  };
  addLocations = locationObject => {
    const { locationsEdit } = this.state;
    const newLocations = [...locationsEdit, locationObject];
    this.setState(() => {
      return {
        locationsEdit: newLocations,
        TOWN: ""
      };
    });
  };
  submitState = () => {
    const { LGA, STATE, TOWN } = this.state;
    if (LGA && STATE && TOWN) {
      this.addLocations({ TOWN, LGA, STATE });
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
    let { reports = [] } = loadProjectPayload;
    projectReportFields.map(field => {
      try {
        obj2[field] = formElements[field].value;
      } catch (err) {
        // Do nothing
      }
    });
    const reportId = guid();
    delete loadProjectPayload._id;
    delete loadProjectPayload._rev;
    obj2.category = "reports";
    let media;
    obj2.approved = false;
    obj2.submittedOn = new Date();
    if (!this.state.editingReport) {
      obj2.id = reportId;
    } else {
      reports = reports.filter(report => {
        return report.id !== this.state.editingReport.id;
      });
      obj2.edittedOn = new Date();
      obj2.edittedBy = `${this.props.userInfoPayload.firstname} ${
        this.props.userInfoPayload.lastname
      }`;
      obj2.media = this.state.editingReport.media || [];
    }
    const obj = {
      ...loadProjectPayload,
      reports: [...reports, obj2]
    };
    if (obj2.completionLevel) {
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
              if (image && image.length > 0 && !this.state.editingReport) {
                let url = "";
                let m = image;
                if (m.length && m.length > 1) {
                  url = urls.postMultipleMedia;
                  m.map(f => {
                    try {
                      dataF.append("photos[]", f, f.filename || guid());
                    } catch (err) {
                      //
                    }
                  });
                } else {
                  url = urls.postSingleMedia;
                  try {
                    dataF.append("reports", m[0], m[0].filename || guid());
                  } catch (err) {
                    //
                  }
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
                  reportModal: false,
                  editingReport: null
                };
              });
            });
        }
      );
    } else {
      this.setState(() => {
        return {
          reportFormErrors: true
        };
      });
    }
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
    obj2.submittedOn = new Date();
    obj2.category = "payments";
    obj2.id = guid();
    let obj = {
      ...loadProjectPayload,
      payments: [...payments, obj2]
    };
    if (obj2.percentage) {
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
    } else {
      this.setState(() => {
        return {
          payFormErrors: true
        };
      });
    }
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
  getState = () => {
    let filters = Object.assign(require("../../utils/levels").locations);
    let locationOptions = [];
    filters.map(elem =>
      locationOptions.push({
        value: elem.state.name,
        label: elem.state.name,
        data: elem.state.locals
      })
    );
    return locationOptions;
  };
  getLGA = selectedState => {
    const locations = require("../../utils/levels").locations;
    if (selectedState) {
      const stateValue = [...locations].filter(
        item => item.state.name === selectedState
      )[0];
      console.log(stateValue, "statevalue");
      let locationOptions = stateValue.state.locals.map(elem => {
        return { value: elem.name, label: elem.name };
      });
      return locationOptions;
    }
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
      canInitiatePayment,
      canEditReports
    } = this.state;
    const locations = loadProjectPayload
      ? loadProjectPayload.locations || []
      : [];
    let { STATE, LGA, TOWN, editingProject } = this.state;
    let locButtonDisabled = true;
    if (STATE !== "" && LGA !== "" && TOWN !== "") locButtonDisabled = false;
    return (
      <div>
        {userInfoPending || (loadProjectPending && !loadProjectPayload) ? (
          <Loader />
        ) : (
          <React.Fragment>
            <ProjectAdd
              fromPage={"project"}
              clickAction={this.toggleProjectModal}
              canInitiatePayment={canInitiatePayment}
              canCreateReports={canCreateReports}
              canEditReports={canEditReports}
            />
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

                    {locations.map((location, index) => {
                      return (
                        <Grid default="repeat(4,1fr)" className="minibox">
                          <div>
                            <Label>State</Label>
                            <span className="answer">{location.STATE}</span>
                          </div>
                          <div>
                            <Label>LGA</Label>
                            <span className="answer">{location.LGA}</span>
                          </div>
                          <div>
                            <Label>Town</Label>
                            <span className="answer">{location.TOWN}</span>
                          </div>
                          <div>
                            <Label>Target Unit</Label>
                            <span className="answer">{unit}</span>
                          </div>
                        </Grid>
                      );
                    })}
                  </div>
                  <Aligner center>
                    <P>PAYMENTS</P>
                    <H4 className="paid">{`${
                      this.getPercentPaid() ? this.getPercentPaid() : 0
                    }%`}</H4>
                    <P>Of Project Cost has been approved for payment</P>
                    {canInitiatePayment ? (
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
                          <Label>Approved Reports</Label>
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
              editReport={this.editReport}
              mergedList={mergedList}
              project={loadProjectPayload}
              canCreateReports={canCreateReports}
              canInitiatePayment={canInitiatePayment}
              canEditReports={canEditReports}
              media={media}
              approvePostPending={approvePostPending}
              previewer={this.previewMedia}
              printPage={this.printPage}
            />
            {reportModal ? (
              <ProjectReport
                editingReport={this.state.editingReport}
                editImageChanged={this.editImageChanged}
                preSubmitForm={this.preSubmitForm}
                submitForm={this.submitForm}
                coverageReported={this.getPercentCompleted}
                closeReportModal={this.closeReportModal}
                formErrors={this.state.reportFormErrors}
                reportModal={reportModal}
                name={name}
                deleteImage={this.deleteImage}
                reporter={`${userInfoPayload.firstname} ${
                  userInfoPayload.lastname
                }`}
                canCreateReports={canCreateReports}
                canInitiatePayment={canInitiatePayment}
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
                formErrors={this.state.payFormErrors}
                reporter={`${userInfoPayload.firstname} ${
                  userInfoPayload.lastname
                }`}
                totalPayable={totalPayable}
                calculatePayable={this.calculatePayable}
                name={name}
                canCreateReports={canCreateReports}
                canInitiatePayment={canInitiatePayment}
                canEditReports={canEditReports}
                cost={cost}
                submitFormPay={this.submitFormPay}
                getFieldsProps={this.props.getFieldProps}
              />
            ) : null}
            {this.state.projectModal ? (
              <EditProject
                projectModal={this.state.projectModal}
                toggleProjectModal={this.toggleProjectModal}
                submitProjectEdits={this.submitProjectEdits}
                submitEdits={this.submitEdits}
                editingProject={this.state.editingProject}
                handleLocChange={this.handleLocChange}
                declinePostError={this.deleteLocations}
                deleteLocations={this.deleteLocations}
                submitState={this.submitState}
                locations={this.state.locationsEdit}
                getState={this.getState}
                getLGA={this.getLGA}
                contractors={this.state.contractors}
                STATE={this.state.STATE}
                LGA={this.state.LGA}
                TOWN={this.state.TOWN}
                locButtonDisabled={locButtonDisabled}
              />
            ) : null}

            {/* {this.state.printModal ? (
              <PrintPage
                printModal={this.state.printModal}
                togglePrintModal={this.togglePrintModal}
                data={this.state.data}
                page={this.state.fromComponent}
                printing={this.state.printing}
                printAction={this.printAction}
              />
            ) : null} */}

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
  userInfo,
  getContractors
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
  userInfoPayload: userInfo.payload,
  getContractorsPending: getContractors.pending,
  getContractorsPayload: getContractors.payload,
  getContractorsError: getContractors.error
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withCookies(Project)));
