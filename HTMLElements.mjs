export async function createHTMLElements() {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";

    addLogoutButtonToContainer(mainContainer)

    const loadedProfile = document.createElement("div")
    loadedProfile.classList.add("loadedProfile")
    mainContainer.appendChild(loadedProfile)

    const usernameDiv = document.createElement("div")
    usernameDiv.classList.add("username")
    loadedProfile.appendChild(usernameDiv)

    const auditRatioDiv = document.createElement("div")
    auditRatioDiv.classList.add("auditRatio")
    loadedProfile.appendChild(auditRatioDiv)

    const levelDiv = document.createElement("div")
    levelDiv.classList.add("level")
    loadedProfile.appendChild(levelDiv)

    const skillsDiv = document.createElement("div");
    skillsDiv.classList.add("skills");
    loadedProfile.appendChild(skillsDiv)

    const transactionsDiv = document.createElement("div");
    transactionsDiv.classList.add("transactions");
    loadedProfile.appendChild(transactionsDiv);
}

// adds a logout button to the.... 
function addLogoutButtonToContainer(container) {
    const logoutButton = document.createElement("button");
    logoutButton.classList.add("logoutButton");
    logoutButton.innerText = "logout";
    logoutButton.addEventListener("click", function () {
        window.location.reload();
    });
    container.appendChild(logoutButton);
}