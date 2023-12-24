import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL_API;
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