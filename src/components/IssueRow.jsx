const IssueRow = (props) => {    
    return (
        <tr>
            <td>{props.Id}</td>
            <td>{props.Status}</td>
            <td>{props.Owner}</td>
            <td>{props.Effort}</td>
            <td>{new Date(parseInt(props.Created)).toLocaleDateString()}</td>
            <td>{new Date(parseInt(props.Due)).toLocaleDateString()}</td>
            <td>{props.Title}</td>
        </tr>
    )
} 
export default IssueRow;