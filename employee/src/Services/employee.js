const axios = require("axios").default;

export const getEmployee = async () => {
    return axios({
      method: "GET",
      url: `http://localhost:8000/employee`,
    });
};

export const getAEmployee = async (slug) => {
    return axios({
      method: "GET",
      url: `http://localhost:8000/employee/${slug}`,
    });
};

export const addEmployee = async (form) => {
    return axios({
      method: "POST",
      url: `http://localhost:8000/employee`,
      data: form,
    });
};

export const updateEmployee = async (form, slug) => {
  return axios({
    method: "PUT",
    url: `http://localhost:8000/updateemployee/${slug}`,
    data: form,
  });
};

export const deleteEmployee = async (slug) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8000/deleteemployee/${slug}`,
  });
};