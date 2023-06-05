import axios from "axios";


export const getGammes = async () => {
  
    return await axios
      .get(`/api/gBase/gamme`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };