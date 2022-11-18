import { Link } from "react-router-dom";

const IssueFilter = () => {
  return (
    <div>
      <h2>This is placeholder for IssueFilter</h2>
      <div>
        <Link to={"/"}>Display All Issues</Link>
        {"  |  "}
        <Link to={"/?Owner=Person-A"}>Issue with Person-A</Link>
        {"  |  "}
        <Link to={"/?Owner=Person-B"}>Issue with Person-B</Link>
      </div>
    </div>
  );
};
export default IssueFilter;
