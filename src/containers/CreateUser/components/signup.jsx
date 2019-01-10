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
  const options = [
    { value: "superuser", label: "Superuser" },
    { value: "administrator", label: "Administrator" },
    { value: "projectCreator", label: "Project Creator" },
    { value: "paymentCreator", label: "payment Creator" }
  ];
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
      {" "}
      <form
        ref={form}
        onSubmit={e => {
          e.preventDefault();
          // signup();
        }}
      >
        {" "}
        {/* <H2 className="mbottom">Create Users</H2> */}
        <Input
          label="email"
          placeholder="email"
          type="email"
          name={"username"}
          className="mbottom"
          onChange={e => updateInfo(e, "username")}
          forminput
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          className="mbottom"
          onChange={e => updateInfo(e, "password")}
          forminput
        />
        <Input
          label="Firstname"
          placeholder="First Name"
          type="text"
          className="mbottom"
          onChange={e => updateInfo(e, "firstname")}
          forminput
        />
        <Input
          label="Lastname"
          placeholder="Lastname"
          type="text"
          className="mbottom"
          onChange={e => updateInfo(e, "lastname")}
          forminput
        />
        <SimpleSelect
          options={options}
          type="select"
          name="group"
          className="mbottom"
          label="Select group of user"
          onChange={e => updateInfo(e, "group")}
          required
          forminput
        />
        {!signupPending ? (
          <Button onClick={() => submit(form)}> Create User</Button>
        ) : (
          <Button progress={true}> Loading ...</Button>
        )}
        {error ? <P>{errorText}</P> : null}
      </form>
    </React.Fragment>
  );
};
