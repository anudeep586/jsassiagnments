import Joi = require('joi');
import * as Router from 'koa-router';
import { createBooks, deleteBook, getAllBooks, getAllBooksBYPage, getAllSearchResult, getBook, updateBook } from "../controllers/book";
import { verifyToken } from '../middleware/verifyTokenMiddleware';
const router=new Router({ prefix: '/book' })
// .param('id', (id, ctx, next) => {
//     ctx.params.id=id;
//     return next();
// })


router.get('/', verifyToken, async (ctx) => {
    if (ctx.request.query.query !== undefined) {
        await getAllSearchResult(ctx);
    }
    else {await getAllBooks(ctx) }
})
const schema = Joi.object({
    bookName: Joi.string()
        .min(1)
        .max(300)
        .required(),

    authorName: Joi.string()
        .min(1)
        .max(300)
        .required(),
    bookImage: Joi.string()
        .min(1)
        .max(300)
        .required(),
    pages: Joi.number()
        .integer()
        .min(200)
        .max(1400000),
    description: Joi.string()
        .min(1)
        .max(300)
        .required(),

})
router.get('/:bookId', verifyToken, getBook);
router.post('/', verifyToken, async (ctx:any,next:any)=>{
    const { error, value } = schema.validate(ctx.request.body)
    if(error){
        ctx.status=400;
        ctx.body="Invalid Input"
    }
    else{
        await next()
    }
},createBooks);
router.put('/:bookId', verifyToken, updateBook);
router.delete('/:bookId', verifyToken, deleteBook);
router.get('/page/:pageNo/:limitNo', verifyToken,getAllBooksBYPage)
export default router;