import axios from "axios";
import { aError } from "../errorHandlers/CustomError";

export const review = async (token: string, data: any) => {
  
  let res = await axios.post(`http://localhost:3030/reviewDetails`, data, {
    headers: {
      'token': `bearer ${token}`
    }
  }
  );

  let data1 = res.data;
  return data1
}


