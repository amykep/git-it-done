var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
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

var buttonClickHandler = function (event)
{
    // get the language attribute from the clicked element
    var language = event.target.getAttribute("data-language");

    if (language)
    {
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    }
};

function getFeaturedRepos(language)
{
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function (response)
    {
        if (response.ok)
        {
            response.json().then(function (data)
            {
                displayRepo(data.items, language)
                console.log(data.items, language)
            })

        } else
        {
            alert("Error: GitHub User Not Found")
        }
    })
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

        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
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


    console.log("repos", repos);
    console.log("searchterm", searchTerm);
};

userFormEl = addEventListener("submit", formSubmissionHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

