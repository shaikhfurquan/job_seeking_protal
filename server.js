import app from './app.js'



app.listen(process.env.PORT , ()=>{
    console.log(`Server running on the port ${process.env.PORT}`);
})