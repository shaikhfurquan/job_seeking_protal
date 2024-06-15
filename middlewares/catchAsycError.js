
export const catchAsyncError = (acceptFunction) =>{
    return (req, res, next) =>{
        Promise.resolve(acceptFunction(req,res,next)).catch(next)
    }
}