import { createHTMLElements } from "./Functions/HTMLElements.mjs";
import { UseJWT } from "./Functions/useJWT.mjs";
import { getUsername } from "./Functions/username.mjs";
import { getAuditRatio } from "./Functions/auditRatio.mjs";
import { getLevel } from "./Functions/level.mjs";
import { getSkills } from "./Functions/skills.mjs";
import { usernameQuery, auditUpQuery, auditDownQuery, levelQuery, skillsQuery, transactionQuery } from "./Functions/queries.mjs";


const responseDataDiv = document.getElementById('response-data');
// Gitea Access Token = 9fd40d4a6a1776854d2171f943ab2f254b8da113
let justXp = 0;

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
            await processTransactions(transactionQuery)
        } else {
            // Display an error message or handle unsuccessful login
            responseDataDiv.textContent = "It didn't work!!"
            console.error("Error during login:", response.statusText);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

async function processTransactions(transactionQuery) {

    const responseData = await UseJWT(transactionQuery)

    responseData.data.transaction.forEach(transaction => {
        const transactionsElement = document.createElement("div");

        const transactionIdElement = document.createElement("span");
        transactionIdElement.textContent = "Transaction ID: " + transaction.id;
        transactionsElement.appendChild(transactionIdElement);

        const transactionsTypeElement = document.createElement("span");
        transactionsTypeElement.textContent = " Transaction Type: " + transaction.type;
        transactionsElement.appendChild(transactionsTypeElement);

        const transactionsAmountElement = document.createElement("span");
        transactionsAmountElement.textContent = " Transaction Amount: " + transaction.amount;
        transactionsElement.appendChild(transactionsAmountElement);

        const transactionsPathElement = document.createElement("span");
        transactionsPathElement.textContent = " Transaction Path: " + transaction.path;
        transactionsElement.appendChild(transactionsPathElement);

        const transactionsDiv = document.getElementsByClassName("transactions")[0]
        transactionsDiv.appendChild(transactionsElement);

        

        if (transaction.type == "xp") {
            justXp += Number(transaction.amount)
        }
    }
    );


    




    // Update the content of the response-data div
    responseDataDiv.textContent = JSON.stringify(responseData, null, 2);

}

