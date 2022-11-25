import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAEmployee } from "../Services/employee";
import Loader from "../Components/Loader";
import Form from "react-bootstrap/Form";

const EachEmployee = () => {
  const { slug } = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    reg: "",
    address: "",
  });

  useEffect(() => {
    document.title = "Employee Details";
    setLoading(true);
    getAEmployee(slug)
      .then((data) => {
        setResponse(data.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setResponse(null);
        setLoading(false);
        console.log(err);
      });
  }, [slug]);

  return (
    <>
      {loading && <Loader />}
      <div>
        {response ? (
          <div className="model-box-view">
            <Modal show="true">
              <Modal.Header>
                <Modal.Title>Employee Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter First Name"
                      value={response.firstName}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter Last Name"
                      value={response.lastName}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Please enter email"
                      value={response.email}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter Number"
                      value={response.number}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter Employee Id"
                      value={response.reg}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter Address"
                      value={response.address}
                      readOnly
                    />
                  </div>
                  <Button
                    type="submit"
                    className="btn primary mt-4"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>No response</Form.Label>
            </Form.Group>
          </Form>
        )}
      </div>
    </>
  );
};

export default EachEmployee;
