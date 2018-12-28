import React from "react";
import { Picture, Video, DragZone } from "../components";
import {
  Button,
  Input,
  Grid,
  SimpleSelect,
  PaleButton,
  P,
  ModalComponent,
  Boxed,
  TextArea
} from "../../../components/flex";

export const ProjectReport = props => {
  const {
    reportModal,
    closeReportModal,
    preSubmitForm,
    submitForm,
    percentages,
    imageChanged,
    name,
    displayImages
  } = props;
  let ref = React.createRef();
  let mediaFile = React.createRef();
  const openFileSelect = ev => {
    ev.preventDefault();
    if (mediaFile) {
      mediaFile.current.click(); // dispatchEvent(new Event("click"));
    }
  };
  return (
    <ModalComponent
      title="Project Report"
      subTitle="Add A New"
      open={reportModal}
      onClose={closeReportModal}
      footer={
        <div>
          <PaleButton onClick={closeReportModal}>Cancel</PaleButton>{" "}
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
          <input
            type="file"
            onChange={(e) => imageChanged(e, mediaFile)}
            ref={mediaFile}
            name="media"
            multiple={true}
            style={{ display: "none" }}
            accept="image/*, video/*"
          />
          <Input
            disabled
            placeholder="Project Name"
            value={name}
            name="name"
            type="text"
            label="Project"
            forminput
          />
          <p />
          <Grid pad="15px" default="1fr 1fr 1fr" tablet="1fr 1fr">
            <SimpleSelect
              options={percentages("reports", true)}
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
              {displayImages.map((image, index) => {
                return <Picture key={index} backgroundImage={image} />;
              })}

              <Video />
            </div>
            <div className="placeholder">
              <i className="icon-upload-cloud-outline" />
              <Button onClick={openFileSelect}>Choose files to Upload</Button>
              <P>Drag and drop files here to upload </P>
            </div>
          </DragZone>
        </Boxed>
      </form>
    </ModalComponent>
  );
};
