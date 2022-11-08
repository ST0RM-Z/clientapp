import IssueRow from "./IssueRow";

const IssueTable = ({issues}) => {       


    const issueRows = issues.map(issue => (
        <IssueRow key={issue.Id} Id={issue.Id} Status={issue.Status} Owner={issue.Owner} Effort={issue.Effort} Created={issue.Created} Due={issue.Due} Title={issue.Title}/>
    ))    
    return (
        <div>
            <h2>This is placeholder for IssueTable</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>STATUS</th>
                        <th>OWNER</th>
                        <th>Effort</th>
                        <th>CREATED</th>
                        <th>DUE</th>
                        <th>TITLE</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        </div>

    )} 

export default IssueTable;  