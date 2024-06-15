import mongoose from 'mongoose'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide the Name"],
        minLength: [3, "Name at least contains 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide the Email"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide the Phone Number"],

    },
    password: {
        type: String,
        required: [true, "Please provide the password"]
    },
    role: {
        type: String,
        required: [true, "Please provide your role"],
        enum: ["Job seeker", "Employer"],
    }

}, { timestamps: true })


// Hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Comparing the password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generating the JWT token
userSchema.methods.getJwtToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

const UserModel = mongoose.model('User', userSchema)


export default UserModel 

