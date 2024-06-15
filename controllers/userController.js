
import { catchAsyncError } from '../middlewares/catchAsycError.js'
import ErrorHandler from '../middlewares/errorHandler.js'
import UserModel from '../models/userModel.js'

export const registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, phone, role, password } = req.body
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("All fields are required😊"))
    }

    // cheching if the user is already exists
    const existsUser = await UserModel.findOne({ email })
    if (existsUser) {
        return next(new ErrorHandler("User already exists", 400))
    }

    // if there is no user with this emal then we will create the new use
    const user = await UserModel.create({
        name,
        email,
        password,
        phone,
        role
    })

    // sending the response of the created user
    res.status(201).json({
        success : false,
        message : "user registered successfully",
        user : user
    })

})