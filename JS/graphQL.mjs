import { createHTMLElements } from "./Functions/HTMLElements.mjs";
import { getUsername } from "./Functions/username.mjs";
import { getAuditRatio } from "./Functions/auditRatio.mjs";
// import { getLevel } from "./Functions/level.mjs";
import { getSkills } from "./Functions/skills.mjs";
import { getXP } from "./Functions/experience.mjs";
import { usernameQuery, auditUpQuery, auditDownQuery, skillsQuery, xpQuery} from "./Functions/queries.mjs";


const errorDiv = document.getElementById('errorsGoHere');

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        handleLogin();
    });
});

async function handleLogin() {

    const usernameOrEmail = document.getElementById("usernameOrEmail").value;
    const password = document.getElementById("password").value;

    // Base64 encode the credentials for Basic Authentication
    const authHeader = "Basic " + btoa(`${usernameOrEmail}:${password}`);


    try {
        const response = await fetch("https://learn.01founders.co/api/auth/signin", {
            method: "POST",
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });


        if (response.ok) {

            const jwtData = await response.json();

            console.log("jwdata", jwtData)
            // Save the JWT to localStorage for future use
            localStorage.setItem("jwt", jwtData);

            await createHTMLElements()
            //nested query
            await getUsername(usernameQuery)
            // arguments queries
            await getAuditRatio(auditUpQuery, auditDownQuery)
            // argument query
            await getXP(xpQuery)
            // simple query
            await getSkills(skillsQuery)
        } else {
            // Display an error message or handle unsuccessful login
            errorDiv.textContent = `Failed to sign in. Hopefully you're the problem here`
            console.error("Error during login:", response.statusText);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

