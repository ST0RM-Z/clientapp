import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IssueEdit = () => {
    const id = useParams();
    const [issue,setIssues] = useState({});
    // console.log(id);
  
    const query = `
    mutation {
        SingleIssue(_id:"${id._id}") {
        _id
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
                // console.log(issueData);
                setIssues(issueData.data.issueList);
            })

    

}

useEffect(()=>{
    fetchIssue();
            });
    return (
        <h2>This is placeholder for IssueEdit</h2>
    )}
export default IssueEdit;    