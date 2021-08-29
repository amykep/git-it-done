var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmissionHandler = function (event)
{
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username)
    {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else
    {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var getUserRepos = function (user)
{
    // var user = "amykep"
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function (response)
    {
        if (response.ok)
        {
            response.json().then(function (data)
            {
                displayRepo(data, user);
                console.log(data);
            });
        }
        else
        {
            alert("Error: GitHub User Not Found");
        }
    })
        .catch(function (error)
        {
            alert("Unable to connect to GitHub");
        })

};



var displayRepo = function (repos, searchTerm)
{
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if (repos.length == 0)
    {
        repoContainerEl.textContent = "No Repositories found.";
        return;
    }

    for (var i = 0; i < repos.length; i++)
    {
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.appendChild(titleEl);


        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0)
        {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else
        {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }



        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }


    console.log(repos);
    console.log(searchTerm);
};

userFormEl = addEventListener("submit", formSubmissionHandler);

