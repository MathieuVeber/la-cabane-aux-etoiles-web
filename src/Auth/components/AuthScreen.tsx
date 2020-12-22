import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Tabs, Tab } from "react-bootstrap";

function AuthScreen() {
  const defaultKey = "login";
  const [key, setKey] = useState(defaultKey);
  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key || defaultKey)}>
      <Tab eventKey="login" title="Se connecter">
        <Login />
      </Tab>
      <Tab eventKey="register" title="S'inscrire">
        <Register />
      </Tab>
    </Tabs>
  );
}

export default AuthScreen;
