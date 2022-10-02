import _user from "./user";
import { _book } from '../services/bookService';
import { createReviewService, deleteReviewService, getAllReviewsService, getReviewByIdService, gettingReviewsService, updateReviewService } from '../services/reviewServices';

export const createReview=async (ctx: any)=>{
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const review = ctx.request.body;
        const ReviewCreated = await createReviewService(userId, bookId, review)
        ctx.status = 202;
        ctx.body = ReviewCreated
    }
    catch (err: any) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}

export const getAllReviews=async (ctx: any)=> {
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const Reviews =await getAllReviewsService(userId, bookId)
        ctx.status = 200;
        ctx.body = Reviews;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message
    }
}

export const updateReview=async (ctx: any)=>{
    try {
        const userId = ctx.state.userPayload.id;
        const reviewId = ctx.request.params.reviewId;
        const reviewbody = ctx.request.body;
        const updatedReview = await updateReviewService(userId, reviewId, reviewbody)
        ctx.status = 202;
        ctx.body = updatedReview;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message
    }

}
export const deleteReview=async (ctx: any)=>{
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const reviewId = ctx.request.params.reviewId;
        const deletedReviewId =await deleteReviewService(userId, bookId, reviewId)
        ctx.status = 202;
        ctx.body = deletedReviewId;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message
    }
}

export const getReviewById=async (ctx:any)=>{
    try{
        console.log("helo")
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const reviewId = ctx.request.params.reviewId;
        const  getReviewById= await getReviewByIdService(userId, bookId, reviewId)
        ctx.status = 202;
        ctx.body = getReviewById;
    }
    catch(err){
        ctx.status = err.status;
        ctx.body = err.message
    }
    
}


