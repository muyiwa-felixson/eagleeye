import React from "react";
import {
  TopSection,
  LowerSection,
  TimeLine,
  TimeBox,
  TimeDate,
  TimeContent,
  TimeDiv,
  Picture,
  Video,
  PayContent,
  DragZone
} from "../components";
import {
  Button,
  Input,
  Grid,
  SimpleSelect,
  Label,
  Panel,
  PaleButton,
  Aligner,
  H4,
  H5,
  P,
  ModalComponent,
  Boxed,
  TextArea,
  InputWrapper
} from "../../../components/flex";

export const ProjectReport = props => {
  const { reportModal, closeReportModal, preSubmitForm, submitForm, percentages } = props;
  let ref = React.createRef();
  return (
    <ModalComponent
      title="Project Report"
      subTitle="Add A New"
      open={reportModal}
      onClose={closeReportModal}
      footer={
        <div>
          <PaleButton>Cancel</PaleButton>{" "}
          <Button onClick={() => preSubmitForm(ref)}>Save Report</Button>
        </div>
      }
      expandable
      fluid
    >
      <form ref={ref} onSubmit={submitForm}>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt.
        <Boxed padVertical="30px">
          <Input
            disabled
            placeholder="Project Name"
            value="name"
            name="name"
            type="text"
            label="Project"
            forminput
          />
          <p />
          <Grid pad="15px" default="1fr 1fr 1fr" tablet="1fr 1fr">
            <SimpleSelect
              // options={percentages()}
              // {...getFieldProps("option1", {
              //   onChange() {},
              //   rules: [{ required: true }]
              // })}
              // error={
              //   (errors = getFieldError("option1")) ? errors.join(",") : null
              // }
              type="select"
              name="completionLevel"
              label="Select Level of Completion"
              required
              forminput
            />
            <Input
              disabled
              placeholder="Submitted By"
              value="Damina Ibra"
              name="submittedBy"
              type="text"
              label="Submitted By"
              forminput
            />
            <Input
              disabled
              placeholder="Submitted On"
              value="Mon, 24th Dec 2018"
              name="submittedOn"
              type="text"
              label="Submitted By"
              forminput
            />
          </Grid>
          <p />
          <TextArea name="reportComment" label="Report Comment" />
          <p>Esunt in culpa qui officia deserunt.</p>
          <DragZone>
            <div className="file-region">
              <Picture />
              <Video />
            </div>
            <div className="placeholder">
              <i className="icon-upload-cloud-outline" />
              <Button>Choose files to Upload</Button>
              <P>Drag and drop files here to upload </P>
            </div>
          </DragZone>
        </Boxed>
      </form>
    </ModalComponent>
  );
};
