import React from "react";
import { Input } from "../../../components/flex/Forms/Inputs.components";
import { Button } from "../../../components/flex/Buttons/Button.components";
import {
  P,
  H2
} from "../../../components/flex/Typography/Typography.components";
export const Login = ({ login, error, updateInfo, usersPending, submit }) => {
  const form = React.createRef();
  return (
    <React.Fragment>
      <form ref={form} onSubmit={login}>
        <H2 className="mbottom">Log in</H2>
        <Input
          label="email"
          className="mbottom"
          placeholder="email"
          name={"username"}
          onChange={e => updateInfo(e, "username")}
        />
        <Input
          label="password"
          className="mbottom"
          type="password"
          placeholder="password"
          onChange={e => updateInfo(e, "password")}
        />
        {!usersPending ? (
          <Button onClick={() => submit(form)} className="pull-left">
            {" "}
            Submit
          </Button>
        ) : (
          <Button className="pull-left" progress={true}>
            {" "}
            Loading ...
          </Button>
        )}
        {error ? <P>{error}</P> : null}
      </form>
    </React.Fragment>
  );
};
