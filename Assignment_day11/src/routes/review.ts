import Joi = require('joi');
import * as Router from 'koa-router';
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/review";
import { verifyToken } from '../middleware/verifyTokenMiddleware';

const router = new Router({ prefix: '/review/:bookId' })

const schema = Joi.object({
    description: Joi.string()
        .min(1)
        .max(300)
        .required(),
})
router.post("/", verifyToken, async (ctx: any, next: any) => {
    const { error } = schema.validate(ctx.request.body)
    if (error) {
        ctx.status = 400;
        ctx.body = "Invalid Input"
    }
    else {
       await next()
    }
}, createReview);
router.get('/', verifyToken, getAllReviews);
router.put('/:reviewId', verifyToken, updateReview);
router.delete('/:reviewId', verifyToken, deleteReview);
router.get('/:reviewId',verifyToken,getReviewById)


export default router;