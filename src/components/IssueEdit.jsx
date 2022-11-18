import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const IssueEdit = () => {
  const id = useParams();
  const [issues, setIssues] = useState({});
  // console.log(id);
  const search = useLocation.search();
  const value = new URLSearchParams(search).get("Owner");
  console.log("value", value);

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

  function fetchIssue() {
    fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then(async function (response) {
      let issueData = await response.json();
      // console.log(issueData.data.SingleIssue);
      setIssues(issueData.data.SingleIssue);
    });
  }

  useEffect(() => {
    fetchIssue();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    let form = document.forms.addForm;

    let issue = {
      _id: id._id,
      Status: form.Status.value,
      Owner: form.Owner.value,
      Effort: parseInt(form.Effort.value),
      Title: form.Title.value,
    };
    const query = `
    mutation {
        UpdateIssue(modifyIssue:{_id:"${issues._id}",Status:${issues.Status},Owner:"${issues.Owner}",Effort:${issues.Effort},Title:"${issues.Title}"}) 
       
    }`;
    fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then(async function (response) {
      let value = await response.json();
      console.log(value);
    });
  };
  return (
    <>
      <h2>This is placeholder for IssueEdit</h2>

      <form name="addForm" onSubmit={handleUpdate}>
        <select id="status" name="Status">
          {["New", "Assigned", "Fix", "Closed"].map((e, key) => {
            return e === issues.Status ? (
              <option key={key} selected={e}>
                {e}
              </option>
            ) : (
              <option key={key}>{e}</option>
            );
          })}
        </select>

        <input
          type="text"
          name="Owner"
          placeholder="Owner"
          defaultValue={issues.Owner}
        />
        <input
          type="number"
          name="Effort"
          placeholder="Effort"
          defaultValue={parseInt(issues.Effort)}
        />
        <input
          type="text"
          name="Title"
          placeholder="Title"
          defaultValue={issues.Title}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default IssueEdit;
