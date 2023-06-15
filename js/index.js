//Initial Render
//Get Data and Render our users to the DOM
const init = () => {
    const form = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const reposList = document.querySelector("#repos-list");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        userList.innerHTML = "";
        reposList.innerHTML = "";
        
        fetch(`https://api.github.com/search/users?q=${event.target.search.value}`)
        .then(response => response.json())
        .then(data => data.items.forEach(renderUser))
    })

    //DOM Render functions
    function renderUser(userData) {
        let card = document.createElement('li');
        card.className = 'card'
        card.innerHTML = `
        <h2>${userData.login}</h2>
        <img 
            src="${userData.avatar_url}"
            alt="${userData.login} avatar"
            />
        <div class="content">
            <a>${userData.html_url} Profile</a>
            </div>
        `
        card.querySelector("a").addEventListener('click', (e) => handleClick(userData));

        userList.appendChild(card);

    }
    
    function handleClick(userData) {
        fetch(`https://api.github.com/users/${userData.login}/repos`)
        .then(response => response.json())
        .then(userRepos => {
            userList.innerHTML = "";
            renderUser(userData);
            userRepos.forEach(renderRepos)
        })
    }
    
    function renderRepos(user) {
        const li = document.createElement('li');
        li.innerHTML = user.full_name;
        reposList.append(li);
    }

};

document.addEventListener("DOMContentLoaded", init);
