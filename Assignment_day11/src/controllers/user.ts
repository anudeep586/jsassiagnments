import knex from '../database/db';
import koa = require("koa");
import { User } from "../models/user";
import {  _review } from "../services/reviewServices";
import { createUserService, deleteUserService, gettingReviewsService, getUserDetailsService, getUserService, loginService, updateUserService } from "../services/userService";


const _user: User[] = []


export const createUser = async (ctx:any) => {
    try {
        const user = <User>ctx.request.body;
        const newUser = await createUserService(user)
        console.log(newUser,"hello");
        ctx.status = 202;
        ctx.body = newUser;
    } catch (err) {
        ctx.status = 400;
        ctx.body = "Bad request";
    }
}
export const getAllUsers = async(ctx: any) => {
    try {
        ctx.status = 201;
        console.log("hello")
        ctx.body = await knex('users').select('*');
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }
}
export const getUser = async(ctx: any) => {
    try {
        const userId = ctx.request.params.id;
        const getUserById = await getUserService(userId)
        ctx.status = 201;
        ctx.body = getUserById;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }
}
export const updateUser = async(ctx: any) => {
    try {
        const userId = ctx.state.userPayload.id;
        const user = ctx.request.body;
        const UpdatingUser = await updateUserService(user, userId);
        ctx.status = 201;
        ctx.body = UpdatingUser;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }

}
export const deleteUser = async (ctx: any) => {
    try {
        const userId = ctx.state.userPayload.id;
        const deleteUserr = await deleteUserService(userId);
        ctx.status = 201;
        ctx.body = deleteUserr;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }
}

export const login = async(ctx: any) => {
    try {
        const mail = ctx.request.body.mail;
        const password = ctx.request.body.password;
        const generatedToken = await loginService(mail, password)
        ctx.status = 202;
        ctx.body = generatedToken;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }



}

export const getUserDetails=async (ctx:any)=>{
    try{
        const getUserDeta=await getUserDetailsService(ctx.request.body)        
        ctx.status=200
        ctx.body=getUserDeta;
    }
    catch(err){
        ctx.status = err.status;
        ctx.body = err.message;
    }
}
export const gettingReviews=async (ctx:any)=>{
    try{
        const reviews=await gettingReviewsService(ctx.request.body)        
        ctx.status=200;
        ctx.body=reviews;
    }
    catch(err){
        ctx.status = 400;
        ctx.body = err.message;
    }
}
export default _user