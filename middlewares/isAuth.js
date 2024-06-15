import UserModel from "../models/userModel.js";
import { catchAsyncError } from "./catchAsycError.js";
import ErrorHandler from "./errorHandler.js";
import JWT from 'jsonwebtoken'

export const isAuthorized = catchAsyncError(async (req, res, next) => {

    // getting the token from the req.cookies
    const { token } = req.cookies || req.headers['authorization'].split(" ")[1]
    if (!token) {
        return next(new ErrorHandler("User not authorized", 400))
    }

    // if token is there then we will decode the token
    const decoded = JWT.verify(token , process.env.JWT_SECRET_KEY)

    req.user = await UserModel.findById(decoded._id)
    next()
})