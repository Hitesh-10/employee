import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getEmployee } from "../Services/employee";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../Routes/routes";
import Loader from "../Components/Loader";

const Employee = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    document.title = "Employee";
    setLoading(true);
    getEmployee()
      .then((data) => {
        setResponse(data.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setResponse(null);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div className="row w-75 m-auto">
        <div className="mt-5 mb-4">
          <Button
            variant="primary"
            onClick={() =>
              navigate(`${ROUTES.ADDEMPLOYEE}`, { replace: false })
            }
          >
            <i className="fa fa-plu"></i>
            Add New Employee
          </Button>
        </div>
      </div>
      <div className="row w-75 m-auto">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Employee Id</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {response.map((item) => (
                <tr key={item._id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.reg}</td>
                  <td>{item.address}</td>
                  <td style={{ minWidth: 190 }}>
                    <Button
                      className="mx-1"
                      size="sm"
                      variant="info"
                      onClick={() =>
                        navigate(
                          `${ROUTES.EDITEMPLOYEE.split(":")[0]}${item.slug}`,
                          { replace: false }
                        )
                      }
                    >
                      Update
                    </Button>
                    <Button
                      className="mx-1"
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        navigate(
                          `${ROUTES.DELETEEMPLOYEE.split(":")[0]}${item.slug}`,
                          { replace: false }
                        )
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      className="mx-1"
                      size="sm"
                      variant="info"
                      onClick={() =>
                        navigate(
                          `${ROUTES.VIEWEMPLOYEE.split(":")[0]}${item.slug}`,
                          { replace: false }
                        )
                      }
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
