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
import moment from "moment";

export const ProjectReport = props => {
  const {
    reportModal,
    closeReportModal,
    preSubmitForm,
    submitForm,
    percentages,
    imageChanged,
    submitButtonLoading,
    name,
    reporter,
    displayImages,
    deleteImage,
    editingReport,
    formErrors,
    editImageChanged,
    canCreateReports,
    canInitiatePayment
  } = props;
  let ref = React.createRef();
  let mediaFile = React.createRef();
  if (editingReport && editingReport.media) {
    //  editImageChanged(editingReport.media);
  }
  const openFileSelect = ev => {
    ev.preventDefault();
    if (mediaFile) {
      mediaFile.current.click(); // dispatchEvent(new Event("click"));
    }
  };
  const base64MimeType = encoded => {
    var result = null;
    if (typeof encoded !== "string") {
      return result;
    }

    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
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
          {!submitButtonLoading ? (
            <Button onClick={() => preSubmitForm(ref)}>Save Report</Button>
          ) : (
            <Button progess={true}>Loading ...</Button>
          )}
        </div>
      }
      expandable
      fluid
    >
      <form ref={ref} onSubmit={submitForm}>
        Provide all the details of the report, please note that this will not be
        automatically be confirmed until an admin manually confirms
        <Boxed padVertical="30px">
          <input
            type="file"
            onChange={e => imageChanged(e, mediaFile)}
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
              defaultValue={
                editingReport
                  ? {
                      value: editingReport.completionLevel || 0,
                      label: `${editingReport.completionLevel || 0 }%`
                    }
                  : -1
              }
              name="completionLevel"
              label="Select Level of Completion"
              required
              forminput
            />
            <Input
              disabled
              placeholder="Submitted By"
              name="submittedBy"
              value={reporter}
              type="text"
              label="Submitted By"
              forminput
            />
            <Input
              disabled
              placeholder="Submitted On"
              value={moment(new Date()).format("dddd D MMMM YYYY LT")}
              type="text"
              label="Submitted By"
              forminput
            />
          </Grid>
          <p />
          <TextArea
            name="reportComment"
            label="Report Comment"
            defaultValue={editingReport ? editingReport.reportComment : ""}
          />
          <p>Upload project pictures and video.</p>
          <DragZone>
            <div className="file-region">
              {displayImages.map((image, index) => {
                let type;
                let isVideo = false;
                if (!editingReport) {
                  type = base64MimeType(image);
                  isVideo = type.indexOf("video") > -1;
                }
                if (!isVideo) {
                  return (
                    <Picture
                      onClick={() => deleteImage(index)}
                      key={index}
                      backgroundImage={image}
                    />
                  );
                } else {
                  return (
                    <Video onClick={() => deleteImage(index)}>
                      <video
                        type="video/mp4"
                        onClick={() => deleteImage(index)}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block"
                        }}
                        autoplay={false}
                        loop={false}
                        controls={false}
                        muted={true}
                        onClick={() => deleteImage(index)}
                      >
                        <source src={image} />
                      </video>
                    </Video>
                  );
                }
              })}
            </div>
            <div className="placeholder">
              <i className="icon-upload-cloud-outline" />
              <Button onClick={openFileSelect}>Choose files to Upload</Button>
              <P>Drag and drop files here to upload </P>
            </div>
          </DragZone>
        </Boxed>
        {formErrors ? "You need to fill all the required fields " : ""}
      </form>

    </ModalComponent>
  );
};
