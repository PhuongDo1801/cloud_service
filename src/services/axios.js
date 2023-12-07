import axios from "axios";

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://localhost:44325/api/v1/";
const instances = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// instances.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     throw error.response.data.ErrorMsgs;
//   }
// );

export default instances;   