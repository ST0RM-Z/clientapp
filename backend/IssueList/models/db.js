const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:root@cluster0.sdcn2mg.mongodb.net/?retryWrites=true&w=majorityrs');
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Databse");
})