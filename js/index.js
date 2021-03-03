document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
            .then((response) => response.json())
            .then((data) => {
                userList.innerHTML = "";
                data.items.forEach((account) => {
                    let newUser = document.createElement("li");
                    newUser.data = account.login;

                    let newUserName = document.createElement("h3");
                    newUserName.append(account.login);
                    newUserName.style.display = "inline";
                    newUserName.addEventListener("click", getUserRepo);
                    newUser.append(newUserName);

                    let userImg = document.createElement("img");
                    userImg.src = account.avatar_url;
                    userImg.style.width = "50px";
                    userImg.style.height = "50px";
                    userImg.style.paddingLeft = "10px";
                    userImg.style.paddingRight = "10px";
                    userImg.addEventListener("click", getUserRepo);
                    newUser.append(userImg);

                    let userLink = document.createElement("a");
                    userLink.href = account.html_url;
                    userLink.target = "_blank";
                    userLink.rel = "noopener noreferrer";
                    userLink.innerHTML = "Link to GitHub Page";
                    newUser.append(userLink);

                    userList.append(newUser);
                });
            });
    });

    function getUserRepo(e) {
        const repoListElement = document.getElementById("repos-list");
        fetch(`https://api.github.com/users/${e.target.parentElement.data}/repos`)
            .then((response) => {
                return response.json();
            })
            .then((repoList) => {
                repoListElement.innerHTML = "";
                repoList.forEach((repo) => {
                    let newRepo = document.createElement("li");
                    newRepo.style.width = "50vw";

                    let repoLink = document.createElement("a");
                    repoLink.href = repo.html_url;
                    repoLink.target = "_blank";
                    repoLink.rel = "noopener noreferrer";

                    let repoName = document.createElement("h2");
                    repoName.append(repo.name, ":   ");
                    repoName.style.display = "inline";

                    let repoDesc = document.createElement("h4");
                    repoDesc.append(repo.description);
                    repoDesc.style.display = "inline";

                    repoLink.append(repoName, repoDesc);

                    newRepo.append(repoLink);
                    repoListElement.append(newRepo);
                });
                console.log(repoList);
            });
    }
});
