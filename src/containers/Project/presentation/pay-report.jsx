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
import { CurrencyFormat } from 'react-currency-format';
export const PayReport = props => {
  const {
    paymentModal,
    closePaymentModal,
    preSubmitFormPay,
    submitFormPay,
    percentages,
    getFieldProps
  } = props;
  let ref = React.createRef();
  return (
    <ModalComponent
      title="Approve Payment"
      subTitle="Select a percentage and"
      open={paymentModal}
      onClose={closePaymentModal}
      footer={
        <div>
          <PaleButton>Cancel</PaleButton>{" "}
          <Button onClcik={() => preSubmitFormPay(ref)}>Approve</Button>
        </div>
      }
      expandable
      width="1000px"
    >
      <form ref={ref} onSubmit={submitFormPay}>
        <Grid default="4fr 1fr" tablet="3fr 1fr" pad="20px">
          <Input
            disabled
            placeholder="Project Name"
            value="Very Long Project Name, Thats Spans Multiple Lines Like State Names And Local Government Names and Much More."
            name="dddname"
            type="text"
            label="Project"
            forminput
          />

          <SimpleSelect
            options={percentages}
            type="select"
            label="Select Payment Percentage"
            name="percentage"
            required
            forminput
          />
        </Grid>
        <Grid default="1fr 1fr 1fr" pad="20px">
          <CurrencyFormat
            // value={this.state.projectCost}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"N"}
            renderText={value => (
              <Input
                disabled
                placeholder="Project Cost"
                value={value}
                type="text"
                name="cost"
                label="Project Cost"
                forminput
              />
            )}
          />
          <CurrencyFormat
            // value={this.state.expectedCost}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"N"}
            renderText={value => (
              <Input
                disabled
                placeholder="Project Cost"
                value={value}
                type="text"
                name={"payableAmount"}
                label="Payment Amount"
                forminput
              />
            )}
          />

          <Input
            placeholder="Enter Password"
            type="password"
            name={"password"}
            label="Enter Password"
            forminput
          />
        </Grid>
      </form>
    </ModalComponent>
  );
};
