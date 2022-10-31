const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    Id: Number,
    Title: String,
    Status: String,
    Effort: Number,
    Owner: String,
    Created: {type: Date, default: new Date()},
    Due: {type: Date, default: new Date(new Date().getTime() + 1000*60*60*24*10)}    

});

const Issue = mongoose.model('Issue', IssueSchema, "issues");
module.exports = Issue;