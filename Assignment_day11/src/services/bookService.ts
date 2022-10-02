import _user from "../controllers/user";
import { notFoundError } from "../errorHandlers/CustomError";
import { v4 as uuidv4 } from 'uuid';
import { Book } from "../models/book";
import knex from '../database/db';


export const _book: Book[] = [];

export const createBookService = async (userId: string, book: any) => {
    const id = uuidv4()
    const authorId =userId
    const newBook = await knex('books').insert({
        bookName: book.bookName,
        authorName: book.authorName,
        pages: book.pages,
        description: book.description,
        id: id,
        bookImage: book.bookImage,
        authorId: authorId
    }).returning(`*`)
    return newBook
}

export const getAllSearchResultService = async (userId: string, firstname: string) => {
    const index = await knex("users").where({id:userId}).select("*");
    if (index ===[]) {
        throw new notFoundError("Wrong credentials", 404)
    }
    else {
        const titleresults = knex('books').where('bookName', 'like', `%${firstname}%`)
        return titleresults
    }
}

export const getAllBooksService = async (UserId: string) => {
    const index = await knex("users").where({id:UserId}).select("*");
    if (index ===[]) {
        throw new notFoundError("Wrong credentials ello", 404)
    }
    else {
        const books=knex("books").where({authorId:UserId}).select("*");
        return books
    }
}

export const getBookService = async(userId: string, bookId: string) => {
    const index = await knex('users').where({id:userId}).select("*");
    if (index === []) {
        throw new notFoundError("Wrong credentials", 404)

    } else {
        const getbook = await knex('books').where({id:bookId}).select("*");
        if(getbook===[]){
            throw new notFoundError("Not Found", 404)
        }
        else{
        return getbook
    }}
}

export const deleteBookService = async (userId: string, bookId: string) => {
    const index = await knex('books').where({authorId:userId,id:bookId}).select("*");
    if (index === undefined) {
        throw new notFoundError("Not found", 404)
    }
    else {
        const deleteBook=await knex('books').where({id:bookId}).del().returning("*");
        return deleteBook
    }
}

export const updateBookService = async (book: any, userId: string, bookId: string) => {
    const index = await knex('books').where({authorId:userId,id:bookId}).select("*");
    if (index === []) {
        throw new notFoundError("Wrong credentials", 404)
    }
    else {
        const Updateuser = await knex('books').where({id:bookId}).update({bookName:book.bookName,authorName:book.authorName,description:book.description,pages:book.pages}).returning("*")
        return Updateuser
    }
}

export const getAllBooksByPageService=async(pageNo:number,limitNo:number,userId:string)=>{
    const index = await knex('users').where({id:userId}).select("*");
    if (index === []) {
        throw new notFoundError("Wrong credentials", 404)
    }
   const paging=(pageNo-1)*limitNo;
   const books=knex.select('*').from('books').limit(2).offset(paging)
   return books
}