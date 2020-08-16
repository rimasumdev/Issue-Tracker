document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const desc = document.getElementById("issueDescription").value;
  const assTo = document.getElementById("issueAssignedTo").value;
  if (desc == "" || assTo == "") {
    alert("Fill The Description and AssignedTo Please!");
  }
  else {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
  }
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();

}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  let closed = 0;
  let open = 0;
  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    if (status == "Closed") {
      closed++;
    }
    if (status == "Open") {
      open++;
    }
    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  document.getElementById("issue").textContent = issues.length + " ";
  document.getElementById("closed").textContent = " Closed : " + closed + " ";
  document.getElementById("open").textContent = " Open : " + open + " ";

}

function totalIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));
  document.getElementById(id).textContent = issues.length + " ";
}

