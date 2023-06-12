const init = () => {
    const form = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const reposList = document.querySelector("#repos-list");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        userList.textContent = "";
        reposList.textContent = "";
        
        fetch(`https://api.github.com/search/users?q=${event.target.search.value}`)
        .then(response => response.json())
        .then(data => data.items.forEach(renderUser))
    })
    
    function renderUser(userData) {
        const userName = document.createElement('li');
        userName.textContent = userData.login;
        
        const avatar = document.createElement('img');
        avatar.src = userData.avatar_url;
        avatar.alt = `${userData.login} avatar`;
        
        avatar.addEventListener('click', (e) => handleClick(userData));
        
        const profileLink = document.createElement('a');
        profileLink.href = userData.html_url;
        profileLink.textContent = "Profile";
        
        userList.append(userName, avatar, profileLink);
    }
    
    function handleClick(userData) {
        fetch(`https://api.github.com/users/${userData.login}/repos`)
        .then(response => response.json())
        .then(userRepos => {
            userList.textContent = "";
            renderUser(userData);
            userRepos.forEach(renderRepos)
        })
    }
    
    function renderRepos(user) {
        const li = document.createElement('li');
        li.textContent = user.full_name;
        reposList.append(li);
    }

};

document.addEventListener("DOMContentLoaded", init);
