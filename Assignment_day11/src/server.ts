import * as Koa from 'koa';
import * as Router from 'koa-router';
import logger = require('koa-logger');
import bodyparser = require('koa-bodyparser')
import { userRouter } from './routes/user';
import bookRoutes from './routes/book';
import reviewRoutes from './routes/review';
require("dotenv").config();


const port = process.env.PORT || 8080;

const app = new Koa();

const router = new Router();

app.use(logger());
app.use(bodyparser());
app.use(router.routes());
app.use(userRouter.routes());
app.use(bookRoutes.routes());
app.use(reviewRoutes.routes());


console.log(` My koa server is up and listening on port ${port}`)

app.listen(port)
export default app;