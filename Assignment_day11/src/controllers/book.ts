import _user from "./user";
import { createBookService, deleteBookService, getAllBooksByPageService, getAllBooksService, getAllSearchResultService, getBookService, updateBookService } from "../services/bookService";
import koa = require("koa");



export const createBooks=async (ctx:koa.Context) =>{
    try {
        const userId = ctx.state.userPayload.id;
        const book = ctx.request.body;
        const newBook =await createBookService(userId, book)
        ctx.status = 201;
        ctx.body = newBook;
    } catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}
export const getAllSearchResult=async (ctx: koa.Context)=> {
    try {
        const userId = ctx.state.userPayload.id;
        const firstname = ctx.request.query.query;
        const SearchResult = await getAllSearchResultService(userId, String(firstname))
        ctx.status = 200;
        ctx.body = SearchResult;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}

export const getAllBooks = async (ctx: koa.Context) => {
    try {
        const UserId = ctx.state.userPayload.id;
        const AllBooksById =await getAllBooksService(UserId)
        ctx.status = 200;
        ctx.body = AllBooksById
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}

export const getBook = async(ctx: koa.Context) => {
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.params.bookId;
        const fetchedBook =await getBookService(userId, bookId)
        ctx.status = 200;
        ctx.body = fetchedBook
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}
export const deleteBook = async (ctx: any) => {
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const deletedBook = await deleteBookService(userId, bookId)
        ctx.status = 202;
        ctx.body = deletedBook
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}
export const updateBook = async (ctx: any) => {
    try {
        const userId = ctx.state.userPayload.id;
        const book = ctx.request.body;
        const bookId = ctx.request.params.bookId
        const updatedBook = await updateBookService(book, userId, bookId)
        ctx.status = 202;
        ctx.body = updatedBook;
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}
export const getAllBooksBYPage=async (ctx:any)=>{
    try {
        const pageNo=ctx.request.params.pageNo;
        const limitNo=ctx.request.params.limitNo
        const userId = ctx.state.userPayload.id;
        const AllBooksById = await getAllBooksByPageService(pageNo,limitNo,userId)
        ctx.status = 200;
        ctx.body = AllBooksById
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}