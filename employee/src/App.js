import logo from "./logo.svg";
import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import * as ROUTES from "./Routes/routes";
const Employee = lazy(() => import("./Pages/Employee"));
const EachEmployee = lazy(() => import("./Pages/EachEmployee"));
const AddEmployee = lazy(() => import("./Pages/AddEmployee"));
const EditEmployee = lazy(() => import("./Pages/EditEmployee"));
const DeleteEmployee = lazy(() => import("./Pages/DeleteEmployee"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTES.EMPLOYEE} element={<Employee />} />
          <Route path={ROUTES.VIEWEMPLOYEE} element={<EachEmployee />} />
          <Route path={ROUTES.ADDEMPLOYEE} element={<AddEmployee />} />
          <Route path={ROUTES.EDITEMPLOYEE} element={<EditEmployee />} />
          <Route path={ROUTES.DELETEEMPLOYEE} element={<DeleteEmployee />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
