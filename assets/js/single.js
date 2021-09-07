var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
// var repo = "facebook/react";

function getRepoName()
{
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    console.log(repoName);
    if (repoName)
    {
        // repoNameEl.textContent = repoName;
        // processRepoIssues(repoName);
        return repoName
    }
    else
    {
        document.location.replace("./index.html");
    }

}

function processRepoIssues()
{
    var repoName = getRepoName()
    var apiUrl = "https://api.github.com/repos/" + repoName + "/issues?direction=asc";

    fetch(apiUrl).then(function (response)
    {
        // request was successful
        if (response.ok)
        {
            response.json().then(function (data)
            {
                // pass response data to dom function
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link"))
                {
                    displayWarning(repoName);
                }
            });
        }
        else
        {
            console.log("response", response);
            // alert("There was a problem with your request!");
            document.location.replace("./index.html");
        }
    });

};

function displayIssues(issues)
{
    console.log(issues)
    console.log(issues.length)
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

function displayWarning()
{
    var repoName = getRepoName()

    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repoName + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

processRepoIssues()