import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import AuthScreen from "./Auth/components/AuthScreen";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentParent, currentParentSelector } from "./Parent/reducer";

function AppLayout() {
  const cookieName = process.env.REACT_APP_COOKIE_NAME || "cookie";
  // For TS purpose, we manually take the 3rd elements, as we don't use previous one
  const removeCookie = useCookies([cookieName])[2];
  const dispatch = useDispatch();
  const currentParent = useSelector(currentParentSelector);

  const handleLogout = () => {
    removeCookie(cookieName);
    dispatch(resetCurrentParent());
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        {currentParent && (
          <Navbar.Text>
            Bonjour {currentParent.firstName} {currentParent.lastName}
          </Navbar.Text>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            {currentParent ? (
              <Nav.Item>
                <Button color="outlined-error" onClick={handleLogout}>
                  Se déconnecter
                </Button>
              </Nav.Item>
            ) : (
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/login">
          <AuthScreen />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default AppLayout;
