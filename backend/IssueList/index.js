const express = require("express")
require('./models/db');
const Issue = require('./models/issues')
/***This GraphQL Code */
const { ApolloServer } = require('apollo-server-express');
// {Id: 1, Status: "Assigned", Owner: "Person-A", Effort: 10, Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is First Issue"}, 
const typeDefs = `
    input inputIssue {
        Status: String
        Owner: String
        Effort: Int
        Title: String
    }

    type issue {
        Id: String!
        Status: String!
        Owner: String
        Effort: Int
        Created: String
        Due: String
        Title: String
    }
    
    type Query {
        about: String!
        issueList: [issue]
    }
    type Mutation {
        setAboutMessage(message: String!): String
        addSingleIssue(singleIssue: inputIssue): issue
        
    }
`;
//addSingleIssue(Status: String, Owner: String, Effort: Int, Title: String): issue
let aboutMessage = "Hello I am just a variable";
const tempIssues = [
    {Id: 1, Status: "Assigned", Owner: "Person-A", Effort: 10, Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is First Issue"}, 
    {Id: 2, Status: "Resolved", Owner: "Person-B", Effort: 20, Created: new Date("2022-09-10"), Due: new Date("2022-09-20"), Title: "This is Second Issue"}
];

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage,
        addSingleIssue
    },
};
async function addSingleIssue(_, {singleIssue}) {
    //console.log("SINGLE",singleIssue.Status);
    const query = Issue.find({});
    query.count(function(err, count){
        let issue = {};
        issue.Id = count+ 1;
        issue.Status = singleIssue.Status;
        issue.Owner = singleIssue.Owner;
        issue.Effort = singleIssue.Effort;
        issue.Created = new Date();
        issue.Due = new Date();
        issue.Title = singleIssue.Title;
        Issue.create(issue);
        console.log("SINGLE",issue);

        return issue;
    })   
}


/*
async function addSingleIssue(_, variables) {
    console.log(variables);
    const query = Issue.find({});
    query.count(function(err, count){
        let issue = {}
        issue.Id = count + 1;
        issue.Created = new Date();
        issue.Due = new Date();

        //Issue.create(issue);
        //console.log(issue)
        return issue;
    })   
}
*/

async function issueList() {
    return await Issue.find({});    
}

function setAboutMessage(_, { message }) {
    console.log(message)
    return aboutMessage = message;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

/***This GraphQL Code */


const app = express();
const port = '3002';

app.use(express.static('./public'));

server.start().then(()=>{
    server.applyMiddleware({ app, path: '/graphql', cors: true});
});


app.listen(port, function(){
    console.log("Great....Webserver is Running....")
})

app.get('/', function(req, res) {
    //res.send("Hello")
    res.render('./index.html')
})

//https://www.apollographql.com/docs/apollo-server/schema/schema/
