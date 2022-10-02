import * as Router from "koa-router";
import { createUser, deleteUser, getAllUsers, gettingReviews, getUser, getUserDetails, login, updateUser } from "../controllers/user";
import Joi = require("joi");
import { verifyToken } from "../middleware/verifyTokenMiddleware";


const userRouter = new Router();
const schema = Joi.object({

    firstname: Joi.string()
        .min(1)
        .max(300)
        .required(),
    lastname: Joi.string()
        .min(1)
        .max(300)
        .required(),
    mail: Joi.string()
        .min(1)
        .max(300)
        .required(),
    password: Joi.string()
        .min(1)
        .max(300)
        .required(),
})
const schemaForLogin=Joi.object({
    username: Joi.string()
        .min(1)
        .max(300),
    mail: Joi.string()
        .min(1)
        .max(300)
        .required(),
    password: Joi.string()
        .min(1)
        .max(300)
        .required(),
})
userRouter.post("/signup",async (ctx:any,next:any)=>{
    const { error, value } = schema.validate(ctx.request.body)
    if(error){
        console.log("hello")
        ctx.status=400;
        ctx.body="Invalid Input"
    }
    else{
        await next()
    }
},createUser)
userRouter.get("/users", verifyToken,getAllUsers);
userRouter.get("/users/:id",verifyToken,getUser);
userRouter.put("/users", verifyToken,updateUser);
userRouter.delete("/users", verifyToken,deleteUser);
userRouter.post("/login",async (ctx:any,next:any)=>{
    const { error, value } = schemaForLogin.validate(ctx.request.body)
    if(error){
        console.log(error)
        ctx.status=400;
        ctx.body=error.message
    }
    else{
        await next()
    }
}, login);

userRouter.post('/usersDetails',verifyToken,getUserDetails)
userRouter.post('/reviewDetails',verifyToken,gettingReviews)
export { userRouter };
