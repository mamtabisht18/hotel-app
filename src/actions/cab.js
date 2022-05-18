import axios from "axios";

export const bookCab = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/book-cab`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });