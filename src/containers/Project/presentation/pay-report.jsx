import React from "react";
import {
  Button,
  Input,
  Grid,
  SimpleSelect,
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
import { CurrencyFormat } from "react-currency-format";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});
export const PayReport = props => {
  const {
    paymentModal,
    closePaymentModal,
    preSubmitFormPay,
    submitFormPay,
    percentages,
    getFieldProps,
    name,
    cost
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
          <PaleButton onClick={closePaymentModal}>Cancel</PaleButton>{" "}
          <Button onClick={() => preSubmitFormPay(ref)}>Approve</Button>
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
            value={name}
            name="name"
            type="text"
            label="Project"
            forminput
          />

          <SimpleSelect
            options={percentages()}
            type="select"
            label="Select Payment Percentage"
            name="percentage"
            required
            forminput
          />
        </Grid>
        <p />
        <TextArea name="reportComment" label="Report Comment" />
        <p>Esunt in culpa qui officia deserunt.</p>
        <Grid default="1fr 1fr 1fr" pad="20px">
          <Input
            disabled
            placeholder="Project Cost"
            value={`${formatter.format(cost)}`}
            type="text"
            name="cost"
            label="Project Cost"
            forminput
          />

          {/* <Input
            disabled
            placeholder="Project Cost"
            value={`${formatter.format(cost)}`}
            type="text"
            name={"payableAmount"}
            label="Payment Amount"
            forminput
          /> */}
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
