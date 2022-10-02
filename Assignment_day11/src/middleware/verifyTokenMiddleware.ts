const jwt = require('jsonwebtoken');
import { aError } from "../errorHandlers/CustomError";

export const verifyToken = async (ctx: any, next: any) => {
    try {
        if (!ctx.header.token) {
            throw new aError('Token should not be empty', 403)
        }
        const token = ctx.request.header.token.split(' ')[1]
        jwt.verify(token, "secret",  (err: any, userObjdata: any) => {
            if (err) {
                throw new aError("Invalid Signature", 401)
            }
            ctx.state.userPayload = userObjdata;
        })
    } catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
    await next();

}