const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:root@cluster0.sdcn2mg.mongodb.net/?retryWrites=true');

mongoose.connection.on("connected", function(){
    console.log("Application is connected to Databse");
})