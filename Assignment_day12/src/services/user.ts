import axios from "axios";
import { aError } from "../errorHandlers/CustomError";

export const user = async (token: string, authorIddata: any) => {
    const usersArray=await axios.post('http://localhost:3030/usersDetails', authorIddata, {
        headers: {
            'token': `bearer ${token}`
        }
    })
    return usersArray.data

}


