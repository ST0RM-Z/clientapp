require('./db');
const Issue = require('./issues')

const tempIssues = [
    {Id: 1, Status: "Assigned", Owner: "Person-A", Effort: 10, Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is First Issue"}, 
    {Id: 2, Status: "Resolved", Owner: "Person-B", Effort: 20, Created: new Date("2022-09-10"), Due: new Date("2022-09-20"), Title: "This is Second Issue"}
];

Issue.insertMany(tempIssues)
    .then(function(data){
        console.log("Data", data)
})


// const query = Issue.find({});
// query.count(function(err, count){
//     console.log(count)
// })

/*
Issue.find({})
    .then(function(data){
        console.log(data)
    })
    */