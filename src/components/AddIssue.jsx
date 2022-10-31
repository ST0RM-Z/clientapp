const AddIssue = ({AddSingleIssue}) => {


    function handleSubmit(event) {
        event.preventDefault();
        let form = document.forms.addForm;

        let issue = {
            Status: form.Status.value, 
            Owner: form.Owner.value,
            Effort: parseInt(form.Effort.value),
            Title: form.Title.value,
        }
        AddSingleIssue(issue);
       
        //form.reset();
    }
    
    return (
        <div>
            <h2>This is placeholder for AddIssue</h2>
            <form name="addForm" onSubmit={handleSubmit}>
            <select id="status" name="Status">
            {["New","Assigned","Fix","Closed"].map((e,key)=>
            <option  key={key}>{e}</option>
    )}
            </select>
               
                <input type="text" name="Owner" placeholder="Owner"/>
                <input type="number" name="Effort" placeholder="Effort"/>
                <input type="text" name="Title" placeholder="Title"/>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )} 

export default AddIssue;    