import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../reducer";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { register } from "../actions";
import { Spinner } from "react-bootstrap";

function Register() {
  const { loading, error, success } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      register({
        email,
        password,
        firstName,
        lastName,
        street,
        complement,
        zipCode,
        city,
      })
    );
  };

  type RegisterFlowState = "basicInfo" | "address";
  const [state, setState] = useState<RegisterFlowState>("basicInfo");
  const handleNextTransition = (event: React.FormEvent) => {
    event.preventDefault();
    setState("address");
  };
  const handlePreviousTransition = (event: React.FormEvent) => {
    event.preventDefault();
    setState("basicInfo");
  };

  const debugComp = (
    <div>
      loading: {`${loading}`} - error: {`${error}`} - success: {`${success}`}
    </div>
  );

  if (state === "basicInfo") {
    return (
      <>
        {debugComp}
        <Form>
          <Form.Group controlId="firstNameForm">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              placeholder="Prénom"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
            />
          </Form.Group>

          <Form.Group controlId="lastNameForm">
            <Form.Label>Nom de famille</Form.Label>
            <Form.Control
              placeholder="Nom"
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />
          </Form.Group>
          <Form.Group controlId="emailForm">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="john.wick@mail.com"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group controlId="passwordForm">
            <Form.Label>Mot de Passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </Form.Group>
          <Button
            variant="outline-info"
            type="button"
            disabled={loading}
            onClick={handleNextTransition}
          >
            Suivant
          </Button>
        </Form>
      </>
    );
  } else {
    return (
      <>
        {debugComp}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="streetForm">
            <Form.Label>Rue</Form.Label>
            <Form.Control
              placeholder="Numéro et nom de rue"
              onChange={(event) => setStreet(event.target.value)}
              value={street}
            />
          </Form.Group>

          <Form.Group controlId="complementForm">
            <Form.Label>Complément d'adresse</Form.Label>
            <Form.Control
              placeholder="Batiment, Appartement ..."
              onChange={(event) => setComplement(event.target.value)}
              value={complement}
            />
          </Form.Group>
          <Form.Group controlId="zipCodeForm">
            <Form.Label>Code Postal</Form.Label>
            <Form.Control
              placeholder="Code Postal"
              onChange={(event) => setZipCode(event.target.value)}
              value={zipCode}
            />
          </Form.Group>
          <Form.Group controlId="cityForm">
            <Form.Label>Ville</Form.Label>
            <Form.Control
              placeholder="Ville"
              onChange={(event) => setCity(event.target.value)}
              value={city}
            />
          </Form.Group>

          <Button
            variant="outline-secondary"
            type="button"
            disabled={loading}
            onClick={handlePreviousTransition}
          >
            Precédent
          </Button>
          <Button variant="outline-info" type="submit" disabled={loading}>
            {loading ? (
              <span className="align-items-center">
                <Spinner
                  className="my-auto mr-1"
                  animation="border"
                  size="sm"
                  role="status"
                />
                Loading
              </span>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </Form>
      </>
    );
  }
}

export default Register;
