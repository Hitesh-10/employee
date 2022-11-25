const express = require("express");
const logger = require("morgan");
const { nanoid } = require("nanoid");
const slugify = require("slugify");
const Employee = require("../models/Employee");

const app = express.Router();
app.use(logger("dev"));

app.post("/employee", async (req, res) => {
  let randomString = nanoid(5);
  let response = { success: false, message: "" };

  const { firstName, lastName, email, number, reg, address } = req.body;

  try {
    let Emp = new Employee({
      firstName: firstName,
      slug: randomString + "-" + slugify(firstName, { lower: true }),
      lastName: lastName,
      email: email,
      number: number,
      reg: reg,
      address: address,
    });
    await Emp.save()
      .then((result) => {
        if (result) {
          response.success = true;
          response.message = "Employee Added Successfully";
          return res.status(201).json(response);
        }
      })
      .catch((err) => {
        response.message = `Error in adding employee`;
        return res.status(400).json(response);
      });
  } catch (err) {
    response.message = "Employee can't be added";
    res.status(400).json(response);
  }
});

app.get("/employee", async (req, res) => {
  let response = {
    success: false,
    result: "",
    message: "",
  };

  try {
    let Emp = await Employee.find({});

    if (Emp.length > 0) {
      response.success = true;
      response.message = "Employee Details";
      response.result = Emp;
      res.status(200).json(response);
    } else {
      response.result = undefined;
      response.message = "Employees not found";
      return res.status(400).json(response);
    }
  } catch (err) {
    response.message = "Something went wrong. Please try again.";
    res.status(400).json(response);
  }
});

app.get("/employee/:slug", async (req, res) => {
  let { slug } = req.params;
  let response = {
    success: false,
    result: "",
    message: "",
  };

  try {
    let Emp = await Employee.findOne({ slug: slug });

    if (Emp) {
      response.success = true;
      response.message = "Single Employee";
      response.result = Emp;
      res.status(200).json(response);
    } else {
      response.result = undefined;
      response.message = "Employee not found";
      return res.status(200).json(response);
    }
  } catch (err) {
    response.message = "Something went wrong. Please try again.";
    res.status(400).json(response);
  }
});

app.put("/updateemployee/:slug", async (req, res) => {
  const { slug } = req.params;
  let randomString = nanoid(5);
  let newSlug;

  let response = { success: false, message: "" };
  let { firstName, lastName, email, number, reg, address } = req.body;

  await Employee.findOne({ slug })
    .then((data) => {
      if (data.firstName != firstName) {
        newSlug = randomString + "-" + slugify(firstName, { lower: true });
      } else {
        newSlug = slug;
      }
    })
    .catch((err) => {
      response.message = "Failed to update Query , please try again";
      return res.status(400).json(response);
    });

  let Emp = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    number: number,
    reg: reg,
    address: address,
    slug: newSlug,
  };

  await Employee.findOneAndUpdate({ slug: slug }, { $set: Emp }, { new: true })
    .then((result) => {
      response.success = true;
      response.message = "Employee Updated Successfully";
      return res.status(201).json(response);
    })
    .catch((err) => {
      response.message = "Failed to Update Employee";
      res.status(400).json(response);
    });
});

app.delete("/deleteemployee/:slug", async (req, res) => {
  const { slug } = req.params;
  let response = {
    success: false,
    message: "",
  };
  await Employee.findOneAndDelete({ slug })
    .then((results) => {
      if (results) {
        response.success = true;
        response.message = "Employee deleted successfully";
        res.status(200).json(response);
      } else {
        response.message = "Employee not found";
        return res.status(400).json(response);
      }
    })
    .catch((err) => {
      response.message = "Please try again , failed to delete employee";
      return res.status(400).json(response);
    });
});

module.exports = app;
