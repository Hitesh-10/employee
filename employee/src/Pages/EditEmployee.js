import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployee, getAEmployee } from "../Services/employee";
import Loader from "../Components/Loader";
import * as ROUTES from "../Routes/routes";
import Form from "react-bootstrap/Form";

const EditEmployee = () => {
  let navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [empData, setempData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    reg: "",
    address: "",
  });

  const update = () => {
    updateEmployee(empData, slug)
      .then((data) => {
        navigate(ROUTES.EMPLOYEE);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.title = "Add Employee";
    setLoading(true);
    getAEmployee(slug)
      .then((result) => {
        setempData(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [slug]);

  return (
    <>
      {loading && <Loader />}
      <div className="model-box-view">
        {empData ? (
          <Modal show="true">
            <Modal.Header>
              <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter First Name"
                    value={empData.firstName}
                    onChange={(e) => {
                      setempData({ ...empData, firstName: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter Last Name"
                    value={empData.lastName}
                    onChange={(e) => {
                      setempData({ ...empData, lastName: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Please enter email"
                    value={empData.email}
                    onChange={(e) => {
                      setempData({ ...empData, email: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter Number"
                    value={empData.number}
                    onChange={(e) => {
                      setempData({ ...empData, number: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter Employee Id"
                    value={empData.reg}
                    onChange={(e) => {
                      setempData({ ...empData, reg: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter Address"
                    value={empData.address}
                    onChange={(e) => {
                      setempData({ ...empData, address: e.target.value });
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className="btn primary mt-4"
                  onClick={update}
                >
                  Edit Employee
                </Button>
              </div>
            </Modal.Body>
          </Modal>
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

export default EditEmployee;
