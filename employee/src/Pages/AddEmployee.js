import React, { useState, useEffect, Suspense } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../Services/employee";
import * as ROUTES from "../Routes/routes";

const AddEmployee = () => {
  let navigate = useNavigate();
  const [empData, setempData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    reg: "",
    address: "",
  });

  const create = () => {
    addEmployee(empData)
      .then((data) => {
        navigate(ROUTES.EMPLOYEE);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.title = "Add Employee";
  }, []);

  return (
    <>
      <div className="model-box-view">
        <Modal show="true">
          <Modal.Header>
            <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter First Name"
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
                  onChange={(e) => {
                    setempData({ ...empData, address: e.target.value });
                  }}
                />
              </div>
              <Button
                type="submit"
                className="btn primary mt-4"
                onClick={create}
              >
                Add Employee
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AddEmployee;
