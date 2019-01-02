import React from "react";
import { SimpleSelect } from "../../../components/flex/Forms/Select.components";
import { Input } from "../../../components/flex/Forms/Inputs.components";
import { Button } from "../../../components/flex/Buttons/Button.components";
import { P, H2 } from "../../../components/flex/Typography/Typography.components";
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
  return (
    <React.Fragment>
      <form ref={form} onSubmit={signup}>
      <H2 className="mbottom">Create Users</H2>
        <Input
          label="email"
          placeholder="email"
          type="text"
          name={"username"}
          className="mbottom"
          onChange={e => updateInfo(e, "username")}
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
          placeholder="Password"
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

        { !signupPending ? (
          <Button  onClick={()=>submit(form)}> CreatUser</Button>
        ) : (
          <Button progress={true}>
            {" "}
            Loading ...
          </Button>
        )}
        {error ? <P>{error}</P> : null}
      </form>
    </React.Fragment>
  );
};
