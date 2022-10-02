import _user from "../controllers/user";
import { notFoundError } from "../errorHandlers/CustomError";
import { _review } from "./reviewServices";
import knex from '../database/db';

const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken');




export const createUserService = async (user: any) => {
    const id = uuidv4()
    const newUser = await knex('users').insert({id: id,firstname: user.firstname,lastname: user.lastname,mail: user.mail,password: user.password}).returning(`*`)
    return newUser;
}

export const getUserService = async (userId: string) => {
    const user = await knex('users').where({ id: userId }).select("*");
    if (user === []) {
        throw new Error("Not found")
    }
    return user[0];
}

export const updateUserService = async (user: any, userId: string) => {
    const updateUser = await knex("users").where({ id: userId }).select("*")
    if (updateUser === []) {
        throw new Error("Unauthorized")
    }
    const updated = await knex("users").where({ id: userId }).update({ firstname: user.firstname, lastname: user.lastname, mail: user.mail, password: user.password }).returning("*");
    return updated;
}

export const deleteUserService = async (userId: string) => {
    const index = await knex("users").where({ id: userId }).select("*");
    if (index === []) {
        throw new notFoundError("Not found", 404)
    }
    const user = await knex("users").where({ id: userId }).del().returning("*")
    return user
}

export const loginService = async (mail: string, password: string) => {
    const verifyingUser = await knex('users').where({ mail: `${mail}`, password: `${password}` }).select('*')
    if (verifyingUser === undefined) {
        throw new notFoundError("UnAuthorized", 401)
    }
    else {
        const generatedToken = jwt.sign(verifyingUser[0], "secret")
        return generatedToken;
    }
}

export const getUserDetailsService = async (data: any) => {
    const records=await knex.select('*').from('users').havingIn('id',data).groupBy('id');
    return records

}
export const gettingReviewsService = async (data: any) => {
     const reviewArray = await Promise.all(Object.keys(data).map(async (item) => {
        const review = await knex("reviews").where({ bookId: data[item] }).select("*").limit(2).offset(0);
        let reviews: any = []
        await Promise.all(Object.keys(review).map(async (item: any) => {
            const author = await knex("users").where({ id: review[item].userId }).select("*");            
            review[item].reviewerDetails = author[0]
            reviews.push(review[item])
        }))
        return reviews
    }))
    return reviewArray
}

