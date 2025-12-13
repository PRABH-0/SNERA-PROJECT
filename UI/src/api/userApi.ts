import API from "./api";

const userApi = {
  register: (data: any) => API.post("/Users/register", data),
  login: (data: any) => API.post("/Users/login", data),
  getAll: () => API.get("/Users/getall"),
};

export default userApi;
