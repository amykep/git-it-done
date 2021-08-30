var issueContainerEl = document.querySelector("#issues-container");
var repo = "facebook/react";

var getRepoIssue = function (repo)
{
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response)
    {
        // request was successful
        if (response.ok)
        {
            response.json().then(function (data)
            {
                // pass response data to dom function
                displayIssues(data);
            });
        }
        else
        {
            alert("There was a problem with your request!");
        }
    });

};


var displayIssues = function (issues)
{
    if (issues.length == 0)
    {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++)
    {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-centern";
        issueEl.setAttribute = ("href", issues[i].html_url);
        issueEl.setAttribute = ("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");
        if (issues[i].pull_request)
        {
            typeEl.textContent = "(Pull Request)";
        }
        else
        {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssue("amykep/run-buddy");