/**
 * @file print
 */
import React, { Component } from "react";
import { Button, ModalComponent , PaleButton} from "../../components/flex";

export const PrintPage = ({
  data,
  page,
  printModal,
  togglePrintModal,
  printing,
  printAction
}) => {
  // THIS IS THE REPORT OBJECT YOU WANT TO PRINT COULD BE ANYTHING JUST PASS IT HERE
  // Data is the data to print it is an object which contains everything we want to print 
  // While page contains the description of the pages we will like to print 
  // Possible values are " project, payment, report "
  // Project contains both repots and payment within its fields
  // please check the console 
  console.log('Here is your data to print ', data , '======================+> please not this is from page ' + page );
  if (data && page) {
    return (
      <ModalComponent
        title={`Print ${page}`}
        // subTitle= you can add anything here from the data
        open={printModal}
        onClose={togglePrintModal}
        footer={
          <div>
            <PaleButton>Cancel</PaleButton>{" "}
            <Button
              onClick={
                //print action goes here
                // NB - Find the print action on the Project/index component please follow the direction to perform prints 
                // Edit the print actions there please so we can set state 

                printAction
              }
            >
              {" "}
              {printing ? "Print" : "Printing ..."}
            </Button>
          </div>
        }
        expandable
        fluid
      />
    );
  } else {
    return <div> No data passed in </div>;
  }
};
