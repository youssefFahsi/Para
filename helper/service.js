import axios from "axios";


export const getGammes = async (a) => {
  
    return await axios
      .get(`${process.env.API_URL}/gamme`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };