import React from "react";
import IssueFilter from "./IssueFilter";
import IssueTable from "./IssueTable";
import AddIssue from "./AddIssue";
import { useEffect,useState } from "react";


const IssueList = () => {

    const [issues, setIssues] = useState([]);

    const query = `
        query {
            issueList {
            Id
            Status
            Owner
            Effort
            Created
            Due
            Title
            }
        }`;
    function fetchIssue(){
      
            fetch('http://localhost:3002/graphql', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query })
                }).then(async function(response){
                    let issueData = await response.json();
                    setIssues(issueData.data.issueList);
                })
 
        

    }
 
    useEffect(()=>{
        fetchIssue();
                });


    const AddSingleIssue = async (issue) => { 
        let singleIssue = issue;
        //issue = {issue}; 
        console.log(issue);
        const query = `
        mutation addSingleIssue {
            addSingleIssue(singleIssue: { Owner: "${singleIssue.Owner}", Effort: ${singleIssue.Effort}, Title: "${singleIssue.Title}"}) {
              Id
              Status
              Owner
              Effort
              Created
              Due
              Title
            }
          }
        `;
        const response = await fetch('http://localhost:3002/graphql', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        })
        const data = await response.text();
        if(data){
            fetchIssue();
        }
        console.log("DATA", data)
        
      
    }

    return (
        <div id="issueList">    
            <IssueFilter/>
            <hr/>
            <IssueTable issues={issues}/>
            <hr/>
            <AddIssue AddSingleIssue={AddSingleIssue} issues={issues}/>        
        </div>
    )}
export default IssueList;