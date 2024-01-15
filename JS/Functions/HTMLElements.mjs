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

    // Removed, didn't work on a level 9 account for some reason
    // const levelDiv = document.createElement("div")
    // levelDiv.classList.add("level")
    // loadedProfile.appendChild(levelDiv)

    const xpDiv = document.createElement("div")
    xpDiv.classList.add("xp")
    loadedProfile.appendChild(xpDiv)

    const skillsDiv = document.createElement("div");
    skillsDiv.classList.add("skills");
    createBarChartsDivs(skillsDiv)
    loadedProfile.appendChild(skillsDiv)
}

// adds a logout button to the.... 
function addLogoutButtonToContainer(container) {
    const logoutButton = document.createElement("button");
    
    logoutButton.classList.add("logoutButton");
    logoutButton.innerText = "logout";
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("jwt")
        window.location.reload();
    });
    container.appendChild(logoutButton);
}

function createBarChartsDivs(skillsDiv) {
    const technicalSkillsDiv = document.createElement("div")
    technicalSkillsDiv.classList.add("technicalSkills")
    skillsDiv.appendChild(technicalSkillsDiv)

    // const technicalSkillsChart = document.createElement("svg")
    // technicalSkillsChart.classList.add("technicalSkillsChart")
    // technicalSkillsDiv.appendChild(technicalSkillsChart)

    const technologiesDiv = document.createElement("div")
    technologiesDiv.classList.add("technologies")
    skillsDiv.appendChild(technologiesDiv)

//     const technologiesChart = document.createElement("svg")
//     technologiesChart.classList.add("technologiesChart")
//     technologiesDiv.appendChild(technologiesChart)
}
