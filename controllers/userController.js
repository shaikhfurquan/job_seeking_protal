
import { catchAsyncError } from '../middlewares/catchAsycError.js'
import ErrorHandler from '../middlewares/errorHandler.js'
import UserModel from '../models/userModel.js'
import { sendToken } from '../utils/jwtToken.js'

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

    // // sending the response of the created user
    // res.status(201).json({
    //     success: false,
    //     message: "user registered successfully",
    //     user: user
    // })

    sendToken(user, 201, res , "user registered successfully")

})


export const loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return next(new ErrorHandler("All fields are required", 400))
    }

    // check if user exists or not
    const user = await UserModel.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Credentials", 404))
    }

    // checking the role
    if (user.role !== role) {
        return next(new ErrorHandler("User with this role not found", 404))
    }

    sendToken(user, 200, res, `Welcom ${user.name}`)
})