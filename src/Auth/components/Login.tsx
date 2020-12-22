import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import { authSelector } from "../reducer";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

function Login() {
  const { loading } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="emailForm">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="john.wick@mail.com"
            onChange={handleEmailChange}
            value={email}
          />
        </Form.Group>

        <Form.Group controlId="passwordForm">
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </Form.Group>
        <Button variant="outline-info" type="submit" disabled={loading}>
          Se connecter
        </Button>
      </Form>
    </>
  );
}

export default Login;
