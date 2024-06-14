class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


// creating the custom error middlewares
export const errorMiddleware = (err, req, res, next) =>{

    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    // Handeling the cast error
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid ${err.path}`
        err = new ErrorHandler(message , 400)
    }
    
    // Handeling the duplicate key error
    if(err.name === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message , 400)
    }
    
    // Handeling the json web token error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is Invalid, Try Agarin 😒`
        err = new ErrorHandler(message , 400)
    }
 
    // Handeling the json web token expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json web token is expired. Try Again 😒`
        err = new ErrorHandler(message , 400)
    }

    return res.status(statusCode).json({
        success : false,
        message : err.message
    })
}


export default ErrorHandler