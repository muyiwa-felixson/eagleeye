import React from "react";

import {
  Button,
  Input,
  Grid,
  SimpleSelect,
  Label,
  ModalComponent,
  PaleButton,
  Boxed,
  TextArea,
  P,
  Loader,
  InputWrapper
} from "../../../components/flex";
import { LocTable } from "../../Projects/components/index";
import { Theme } from "../../../components/flex/theme";
import DatePicker from "react-datepicker";
import {
  getOptions,
  sourceOfFunding,
  natureOfProject,
  projectTypes,
  targetUnits,
  numberList,
  contractors,
  getMonth
} from "../../../utils/utils";
// import Autosuggest from 'reac
export const EditProject = ({
  projectModal,
  toggleProjectModal,
  submitProjectEdits,
  submitButtonLoading,
  submitEdits,
  editingProject,
  handleLocChange,
  deleteLocations,
  submitState,
  STATE,
  LGA,
  contractors,
  TOWN,
  locButtonDisabled,
  locations = [],
  getState,
  getLGA
}) => {
  let forme = React.createRef();
  let locForm = React.createRef();
  return (
    <ModalComponent
      title="Project"
      subTitle="Add A New"
      open={projectModal}
      onClose={toggleProjectModal}
      footer={
        <div>
          <PaleButton>Cancel</PaleButton>{" "}
          <Button onClick={() => submitEdits(forme)}>
            {" "}
            {!submitButtonLoading ? "Save Report" : "Loading ..."}
          </Button>
        </div>
      }
      expandable
      fluid
    >
      <form ref={el => (forme = el)} onSubmit={submitProjectEdits}>
        Add a new Project , please endeavour to add all the required fields
        <Boxed padVertical="30px">
          <Grid pad="15px" default="3fr 1fr" tablet="2fr 1fr">
            <Input
              placeholder="Project Name"
              type="text"
              label="Project"
              forminput
              name="name"
              defaultValue={editingProject ? editingProject.name : ""}
            />

            <Input
              placeholder="File Number"
              type="text"
              label="File Number"
              forminput
              name="fileNumber"
              defaultValue={editingProject ? editingProject.fileNumber : ""}
            />
          </Grid>
          <p />
          <TextArea name="description" label="Project Description" />
          <p />
          <Grid pad="15px" default="1fr 1fr 1fr 1fr" tablet="1fr 1fr 1fr">
            <SimpleSelect
              type="select"
              label="Project Nature"
              name="nature"
              options={getOptions(natureOfProject)}
              defaultValue={
                editingProject
                  ? {
                      value: editingProject.nature,
                      label: editingProject.nature
                    }
                  : -1
              }
              required
              forminput
            />
            <SimpleSelect
              type="select"
              label="Source of Funding"
              required
              forminput
              name="funding"
              options={getOptions(sourceOfFunding)}
              defaultValue={
                editingProject
                  ? {
                      value: editingProject.funding,
                      label: editingProject.funding
                    }
                  : -1
              }
            />

            <SimpleSelect
              type="select"
              label="Project Type"
              required
              forminput
              name="type"
              options={getOptions(projectTypes)}
              defaultValue={
                editingProject
                  ? {
                      value: editingProject.type,
                      label: editingProject.type
                    }
                  : -1
              }
            />

            <Input
              type="text"
              placeholder="Target Unit"
              label="Target Unit"
              required
              forminput
              name="unit"
              defaultValue={editingProject ? editingProject.unit : ""}
            />

            <Input
              placeholder="Project Cost"
              type="number"
              label="Project Cost"
              forminput
              name="cost"
              defaultValue={editingProject ? editingProject.cost : ""}
            />
            <div style={{ paddingTop: "10px" }}>
              <InputWrapper required>
                <Label>Date of Award</Label>
                <DatePicker
                  name="dateOfAward"
                  selected={
                    editingProject ? editingProject.dateOfAward : new Date()
                  }
                />
              </InputWrapper>
            </div>

            <SimpleSelect
              type="select"
              label="Contractor"
              required
              forminput
              name="contractor"
              options={contractors}
              defaultValue={
                editingProject
                  ? {
                      value: editingProject.contractor,
                      label: editingProject.contractor
                    }
                  : -1
              }
            />
            <Grid
              default="1fr 2fr"
              tablet="1fr 2fr"
              mobile="1fr 2fr"
              pad="15px"
            >
              <SimpleSelect
                options={numberList()}
                type="select"
                label="Duration"
                required
                forminput
                name="duration"
                defaultValue={
                  editingProject
                    ? {
                        value: editingProject.duration,
                        label: editingProject.duration
                      }
                    : -1
                }
              />
              <SimpleSelect
                options={[
                  { value: "days", label: "days" },
                  { value: "weeks", label: "weeks" },
                  { value: "months", label: "months" },
                  { value: "years", label: "years" }
                ]}
                type="select"
                label="Duration Type"
                defaultValue={
                  editingProject
                    ? {
                        value: editingProject.durationType,
                        label: editingProject.durationType
                      }
                    : -1
                }
                name="durationType"
                required
                forminput
              />
            </Grid>
          </Grid>
          <h3>Location</h3>
          <Grid
            pad="15px"
            default="1fr 1fr 1fr 1fr 2fr"
            tablet="1fr 1fr 1fr 1fr"
            mobile="1fr 1fr"
          >
            <SimpleSelect
              type="select"
              label="State"
              name="state"
              options={getState()}
              onChange={e => handleLocChange(e, "STATE")}
              forminput
            />

            <SimpleSelect
              type="select"
              label="State"
              name="state"
              forminput
              onChange={e => handleLocChange(e, "LGA")}
              options={getLGA(STATE)}
            />

            <Input
              placeholder="Ward/Town"
              type="text"
              label="Location"
              forminput
              name="ward"
              onChange={e => handleLocChange(e, "TOWN")}
            />
            <Button
              disabled={locButtonDisabled}
              onClick={e => {
                e.preventDefault();
                submitState();
              }}
              style={{ marginTop: "10px" }}
            >
              Add Location
            </Button>
          </Grid>
          <Grid pad="0" default="4fr 2fr" tablet="1fr" mobile="1fr">
            <LocTable>
              <thead>
                <th>State</th>
                <th>LGA</th>
                <th>Location</th>
                <th />
              </thead>
              <tbody>
                {locations.map((location, index) => {
                  const { STATE, LGA, TOWN } = location;
                  return (
                    <tr key={index}>
                      <td>{STATE}</td>
                      <td>{LGA}</td>
                      <td>{TOWN}</td>
                      <td>
                        <PaleButton
                          onClick={e => {
                            e.preventDefault();
                            deleteLocations({ STATE, TOWN, LGA });
                          }}
                          small
                          icon
                          color={Theme.PrimaryRed}
                        >
                          <i className="icon-cancel" />
                        </PaleButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </LocTable>
          </Grid>
          <p />
        </Boxed>
      </form>
    </ModalComponent>
  );
};
