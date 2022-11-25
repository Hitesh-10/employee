import React, { useState, useEffect } from "react";
import { deleteEmployee } from "../Services/employee";
import { useNavigate, useParams } from "react-router-dom";
import * as ROUTES from "../Routes/routes";
import Loader from "../Components/Loader";

const DeleteEmployee = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    document.title = "Delete Employee";
    deleteEmployee(slug)
      .then((result) => {
        setLoading(false);
        navigate(ROUTES.EMPLOYEE);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [slug]);

  return <>{loading && <Loader />}</>;
};

export default DeleteEmployee;
