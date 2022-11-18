const express = require("express");
const fs = require("fs");
require("./model/db");
const Issue = require("./model/issues");
/***This GraphQL Code */
const { ApolloServer } = require("apollo-server-express");
// {Id: 1, Status: "Assigned", Owner: "Person-A", Effort: 10, Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is First Issue"},
const typeDefs = `
    enum StatusType {
        New
        Assigned
        Fix
        Closed
    }
    input inputIssue {
        Status: StatusType = New
        Owner: String
        Effort: Int
        Title: String
    }
    input modifyIssue {
        _id:String!
        Status: StatusType = New
        Owner: String
        Effort: Int
        Title: String
    }

    type issue {
        _id:String!
        Id: String!
        Status: StatusType
        Owner: String
        Effort: Int
        Created: String
        Due: String
        Title: String
    }
    
    type Query {
        about: String!
        issueList(Owner:String) : [issue]
        
    }
    type Mutation {
        setAboutMessage(message: String!): String
        addSingleIssue(singleIssue: inputIssue): issue
        SingleIssue(_id:String!):issue
        UpdateIssue(modifyIssue: modifyIssue) : Boolean
        
    }
`;
//addSingleIssue(Status: String, Owner: String, Effort: Int, Title: String): issue
let aboutMessage = "Hello I am just a variable";
const tempIssues = [
  {
    Id: 1,
    Status: "Assigned",
    Owner: "Person-A",
    Effort: 10,
    Created: new Date("2022-09-18"),
    Due: new Date("2022-09-25"),
    Title: "This is First Issue",
  },
  {
    Id: 2,
    Status: "Resolved",
    Owner: "Person-B",
    Effort: 20,
    Created: new Date("2022-09-10"),
    Due: new Date("2022-09-20"),
    Title: "This is Second Issue",
  },
];

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    addSingleIssue,
    SingleIssue,
    UpdateIssue,
  },
};
async function issueList(_, { Owner }) {
  // let Owner = 'Person-A'
  console.log(Owner);
  let query = Issue.find({});
  if (Owner !== "null") {
    query.or({ Owner: Owner });
  }
  // console.log("query", query);
  return await query.exec();
}
async function UpdateIssue(_, { modifyIssue }) {
  console.log(modifyIssue);
  await Issue.findByIdAndUpdate(modifyIssue._id, modifyIssue);

  return true;
}
async function SingleIssue(_, { _id }) {
  console.log(_id);
  return await Issue.findById(_id);
}
async function addSingleIssue(_, { singleIssue }) {
  //console.log("SINGLE",singleIssue.Status);
  const query = Issue.find({});
  query.count(function (err, count) {
    let issue = {};
    issue.Id = count + 1;
    issue.Status = singleIssue.Status;
    issue.Owner = singleIssue.Owner;
    issue.Effort = singleIssue.Effort;
    issue.Created = new Date();
    issue.Due = new Date();
    issue.Title = singleIssue.Title;
    Issue.create(issue);
    console.log("SINGLE", issue);

    return issue;
  });
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

function setAboutMessage(_, { message }) {
  console.log(message);
  return (aboutMessage = message);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/***This GraphQL Code */

const app = express();
const port = "3002";

app.use(express.static("./public"));

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

app.listen(port, function () {
  console.log("Great....Webserver is Running....");
});

app.get("/", function (req, res) {
  //res.send("Hello")
  res.render("./index.html");
});

//https://www.apollographql.com/docs/apollo-server/schema/schema/
