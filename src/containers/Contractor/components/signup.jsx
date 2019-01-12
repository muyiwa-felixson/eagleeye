import React from "react";
import { SimpleSelect } from "../../../components/flex/Forms/Select.components";
import { Input } from "../../../components/flex/Forms/Inputs.components";
import { Button } from "../../../components/flex/Buttons/Button.components";
import {
  P,
  H2
} from "../../../components/flex/Typography/Typography.components";
export const Signup = ({
  signup,
  error,
  updateInfo,
  signupPending,
  submit
}) => {
  const form = React.createRef();
  let errorText = "";
  const getError = error => {
    if (error) {
      const { status } = error;
      switch (status) {
        case status <= 400:
          return "";
        case status === 422:
          return "Sorry This account already exists can not recreate it";
        case status > 400 && status < 500 && status != 422:
          return "Sorry the information you entered is incomplete";
        case status >= 500:
          return "There was a server error please contact your site adminstrator";
        default:
          return "Sorry This account already exists can not recreate it";
      }
    } else {
      return "";
    }
  };
  if (error) {
    errorText = getError(error);
  }
  return (
    <React.Fragment>
      <form
        ref={form}
        onSubmit={e => {
          e.preventDefault();
          // signup();
        }}
      >
        {/* <H2 className="mbottom">Create Users</H2> */}
        <Input
          label="companyName"
          placeholder="Company Name"
          type="text"
          name={"companyName"}
          className="mbottom"
          onChange={e => updateInfo(e, "companyName")}
          forminput
        />
        <Input
          label="address"
          type="text"
          placeholder="address"
          className="mbottom"
          onChange={e => updateInfo(e, "address")}
          forminput
        />
        <Input
          label="phone Number"
          placeholder="Phone Number"
          type="phone"
          className="mbottom"
          onChange={e => updateInfo(e, "phoneNumber")}
          forminput
        />
        <Input
          label="RC Number"
          placeholder="RC Number"
          type="text"
          className="mbottom"
          onChange={e => updateInfo(e, "rcNumber")}
          forminput
        />
        <Input
          label="email"
          placeholder="email"
          type="email"
          className="mbottom"
          onChange={e => updateInfo(e, "email")}
          forminput
        />

        {!signupPending ? (
          <Button onClick={() => submit(form)}> Submit</Button>
        ) : (
          <Button progress={true}> Loading ...</Button>
        )}
        {error ? <P>{errorText}</P> : null}
      </form>
    </React.Fragment>
  );
};
