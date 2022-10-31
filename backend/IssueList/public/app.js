const IssueFilter = () => {
  return /*#__PURE__*/React.createElement("h2", null, "This is placeholder for IssueFilter");
};

const IssueRow = props => {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.Id), /*#__PURE__*/React.createElement("td", null, props.Status), /*#__PURE__*/React.createElement("td", null, props.Owner), /*#__PURE__*/React.createElement("td", null, props.Effort), /*#__PURE__*/React.createElement("td", null, props.Created.toString()), /*#__PURE__*/React.createElement("td", null, props.Due.toString()), /*#__PURE__*/React.createElement("td", null, props.Title));
};

const IssueTable = ({
  issues
}) => {
  /*
  const tempIssues = [
      {Id: 1, Status: "Assigned", Owner: "Person-A", Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is First Issue"}, 
      {Id: 2, Status: "Resolved", Owner: "Person-B", Created: new Date("2022-09-10"), Due: new Date("2022-09-20"), Title: "This is Second Issue"}];
    const newIssue = {Status: "Assigned", Owner: "Person-A", Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is Third Issue"}; 
  const [issues, setIssues] = React.useState(tempIssues);
  */

  /*setTimeout(()=>{
      setIssues(tempIssues);
  }, 1000);
  */

  /*
  setTimeout(()=>{
      tempIssues.push(newIssue);
      setIssues(tempIssues);
  }, 3000);
  */

  /*let counter = 0;
  React.useEffect(() => {        
      console.log("Hello", counter);
      //Add Single Issue to the state variable
      setTimeout(() => {
          AddSingleIssue(newIssue);
      }, 1000)        
      counter++; 
  }, [issues]);
    const AddSingleIssue = (newIssue) => {
      newIssue.Id = issues.length + 1;
      let IssueList = issues.slice(); 
      IssueList.push(newIssue);
      console.log(IssueList);
      setIssues(IssueList);
  }*/
  const issueRows = issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.Id,
    Id: issue.Id,
    Status: issue.Status,
    Owner: issue.Owner,
    Effort: issue.Effort,
    Created: issue.Created,
    Due: issue.Due,
    Title: issue.Title
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "This is placeholder for IssueTable"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "STATUS"), /*#__PURE__*/React.createElement("th", null, "OWNER"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "CREATED"), /*#__PURE__*/React.createElement("th", null, "DUE"), /*#__PURE__*/React.createElement("th", null, "TITLE"))), /*#__PURE__*/React.createElement("tbody", null, issueRows)));
};

const AddIssue = ({
  AddSingleIssue
}) => {
  /*const newIssue = {Status: "Assigned", Owner: "Person-A", Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is Third Issue"};
  React.useEffect(() => {        
      //console.log("Hello", counter);
      //Add Single Issue to the state variable
      setTimeout(() => {
          AddSingleIssue(newIssue);
      }, 1000)        
    }, []);*/
  function handleSubmit(event) {
    event.preventDefault();
    let form = document.forms.addForm;
    let issue = {
      Status: form.Status.value,
      Owner: form.Owner.value,
      Effort: parseInt(form.Effort.value),
      //Created: new Date(form.Created.value),
      //Due: new Date(form.Due.value),
      Title: form.Title.value
    };
    AddSingleIssue(issue); //form.reset();
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "This is placeholder for AddIssue"), /*#__PURE__*/React.createElement("form", {
    name: "addForm",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Status",
    placeholder: "Status"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Owner",
    placeholder: "Owner"
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "Effort",
    placeholder: "Effort"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit")));
};

const IssueList = () => {
  /*
  const tempIssues = [
      {Id: 1, Status: "Assigned", Owner: "Person-A", Effort: 10, Created: new Date("2022-09-18"), Due: new Date("2022-09-25"), Title: "This is First Issue"}, 
      {Id: 2, Status: "Resolved", Owner: "Person-B", Effort: 20, Created: new Date("2022-09-10"), Due: new Date("2022-09-20"), Title: "This is Second Issue"}];
  */
  const [issues, setIssues] = React.useState([]);
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

  function fetchIssue() {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(async function (response) {
      let issueData = await response.json();
      setIssues(issueData.data.issueList);
    });
  }

  React.useEffect(() => {
    fetchIssue();
  }, []);

  const AddSingleIssue = async issue => {
    let singleIssue = issue; //issue = {issue}; 

    console.log(issue);
    const query = `
        mutation addSingleIssue {
            addSingleIssue(singleIssue: {Status: "${singleIssue.Status}", Owner: "${singleIssue.Owner}", Effort: ${singleIssue.Effort}, Title: "${singleIssue.Title}"}) {
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
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    });
    const data = await response.text();

    if (data) {
      fetchIssue();
    }

    console.log("DATA", data);
    /*
    const Status = issue.Status;
    const Owner = issue.Owner;
    const Title = issue.Title;
    const Effort = issue.Effort;
    console.log(Status, Owner, Title, Effort);      
    const query = `
    mutation addSingleIssue {
        addSingleIssue(Status: "${Status}", Owner: "${Owner}", Effort: ${Effort}, Title: "${Title}") {
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
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query
        })
    })
    const data = await response;
    console.log("DATA", data)
    */

    /*let message = issue;
    console.log(issue);
    const query = `mutation setAboutMessage {
        setAboutMessage(message: "${message}")
      }`;
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({query, issue})
    })
    const data = await response;
    console.log("DATA", data)*/
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "issueList"
  }, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
    issues: issues
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddIssue, {
    AddSingleIssue: AddSingleIssue,
    issues: issues
  }));
};

const App = () => {
  return /*#__PURE__*/React.createElement("div", {
    id: "greet"
  }, /*#__PURE__*/React.createElement(GreetMessage, null));
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(IssueList, null));