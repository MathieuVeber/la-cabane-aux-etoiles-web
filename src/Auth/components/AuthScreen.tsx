import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import { authSelector } from "../reducer";
import { teapot } from "../../api/auth";

function AuthScreen() {
  const { loading, error, success } = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <>
      <div>loading: {`${loading}`}</div>
      <div>error: {`${error}`}</div>
      <div>success: {`${success}`}</div>

      <button
        onClick={() =>
          dispatch(login({ email: "vincent", password: "vincent" }))
        }
      >
        Login as Vincent
      </button>
      <button onClick={() => teapot()}>Are you a teapot ?</button>
    </>
  );
}

export default AuthScreen;
