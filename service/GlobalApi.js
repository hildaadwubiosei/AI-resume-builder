import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data) => axiosClient.post("/resume-details", data);
const getUsersResume = (userEmail) => axiosClient.get("/resume-details?filters[userEmail][$eq]=" + userEmail);
const UpdateResumeDetail = (id,data) => axiosClient.put("/resume-details/"+id, data);
export default {
  createNewResume,
  getUsersResume,
  UpdateResumeDetail,
};
