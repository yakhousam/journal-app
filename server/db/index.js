const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== "production";
const URI = dev ? 'mongodb://localhost/journal' : process.env.URI 

mongoose.connect(URI, {useNewUrlParser: true}, (err)=>{
    if(err){
       return console.error(err)
    }
    console.log('mongoose is connected to: ', URI)
})