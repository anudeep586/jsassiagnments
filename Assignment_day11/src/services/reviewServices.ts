import {_book} from "./bookService";
import {notFoundError } from "../errorHandlers/CustomError";
import { v4 as uuidv4 } from 'uuid';
import _user from "../controllers/user";
import { review } from "../models/review";
import knex from '../database/db';

export const _review: review[] = [];




export const createReviewService=async (userId:string,bookId:string,review:any)=>{
    const [getBook,getUser] :any[]= await Promise.all([knex("books").where({ id: bookId }).select("*"),knex("users").where({id:userId}).select("*")])
    if (getBook !== []) {
        const id = uuidv4()
        const authorId = userId;
        const newreview = await knex('reviews').insert({
            reviewId: id,
            userId: authorId,
            bookId: bookId,
            description: review.description,
            reviewerName: getUser[0].firstname
        }).returning(`*`)
        return newreview
}
}

export const getAllReviewsService=async (userId:string,bookId:string)=>{
    const index = await knex('users').where({id:userId}).select('*');
        if (index === []) {
            throw new notFoundError("Wrong credentials", 404)
        }
        else {
            const Allresults = await knex('reviews').where({bookId:bookId}).select("*");
            return Allresults
        }
}

export const updateReviewService=async (userId:string,reviewId:string,reviewbody:any)=>{
    const updateReview = await knex('users').where({id:userId}).select('*');
    if (updateReview === []) {
        throw new notFoundError("Wrong credentials", 400)
    }
    else {
        const updated=await knex('reviews').where({reviewId:reviewId}).update({description:reviewbody.description}).returning("*")
        return updated
    }
}

export const deleteReviewService=async(userId:string,bookId:string,reviewId:string)=>{
    const index=await knex("reviews").where({reviewId:reviewId}).select("*")
    if (index === []) {
            throw new notFoundError("Wrong credentials", 404)
        }
        else {
            const deleteReview=await knex("reviews").where({reviewId:reviewId}).del().returning("*")
            return deleteReview
        }
}




export const gettingReviewsService=(data:any)=>{
    let reviews:any={}
    data.forEach((bookId: any)=>{
        const data1=_review.filter(obj=>{
            if(obj.bookId===bookId){
                const data2=_user.find(objInside=>objInside.id===obj.userId)
                console.log(bookId,data1,data2)
            }
        })
    })
}


export const getReviewByIdService=async (userId:string,bookId:string,reviewId:string)=>{
    const review=await knex("reviews").where({reviewId:reviewId,userId:userId,bookId:bookId}).select("*");
    if (review === []) {
            throw new notFoundError("Wrong credentials", 404)
        }
        else {
            return review
        }
}