import React from "react";
import IssueFilter from "./IssueFilter";
import IssueTable from "./IssueTable";
import AddIssue from "./AddIssue";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const { handle } = useParams();
  const search = useLocation().search;
  const value = new URLSearchParams(search).get("Owner");
  const query = `
        query {
            issueList (Owner:"${value}") {
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
  function fetchIssue() {
    fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then(async function (response) {
      let issueData = await response.json();
      console.log(issueData);
      setIssues(issueData.data.issueList);
    });
  }

  useEffect(() => {
    fetchIssue();
  }, [value]);

  const AddSingleIssue = async (issue) => {
    let singleIssue = issue;
    //issue = {issue};
    console.log(issue);
    const query = `
        mutation addSingleIssue {
            addSingleIssue(singleIssue: { Owner: "${singleIssue.Owner}", Effort: ${singleIssue.Effort}, Title: "${singleIssue.Title}"}) {
              _id
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
    const response = await fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });
    const data = await response.text();
    if (data) {
      fetchIssue();
    }
    console.log("DATA", data);
  };

  return (
    <div id="issueList">
      <IssueFilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <AddIssue AddSingleIssue={AddSingleIssue} issues={issues} />
    </div>
  );
};
export default IssueList;
