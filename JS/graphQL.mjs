import { createHTMLElements } from "./Functions/HTMLElements.mjs";
import { UseJWT } from "./Functions/useJWT.mjs";
import { getUsername } from "./Functions/username.mjs";
import { getAuditRatio } from "./Functions/auditRatio.mjs";
import { getLevel } from "./Functions/level.mjs";
import { getSkills } from "./Functions/skills.mjs";
import { usernameQuery, auditUpQuery, auditDownQuery, levelQuery, skillsQuery, transactionQuery } from "./Functions/queries.mjs";


const errorDiv = document.getElementById('errorsGoHere');
// Gitea Access Token = 9fd40d4a6a1776854d2171f943ab2f254b8da113

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
            // Save the JWT to localStorage for future use
            localStorage.setItem("jwt", jwtData);

            await createHTMLElements()
            //nested query
            await getUsername(usernameQuery)
            // arguments queries
            await getAuditRatio(auditUpQuery, auditDownQuery)
            // simple query
            await getLevel(levelQuery)
            // simple query
            await getSkills(skillsQuery)
        } else {
            // Display an error message or handle unsuccessful login
            errorDiv.textContent = "Failed to sign in.  Hopefully you're the problem here"
            console.error("Error during login:", response.statusText);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

