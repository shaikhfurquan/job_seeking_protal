import app from './app.js'
import cloudinary from 'cloudinary'
import connectDB from './db/connectDB.js'


// cloudinary config/setup
cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY , 
    api_secret : process.env.CLOUDINARY_SECRET ,
})

connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`Server running on the port ${process.env.PORT}`);
})