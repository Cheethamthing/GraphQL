const DOMAIN = 'https://learn.01founders.co/api/graphql-engine/v1/graphql/';
const responseDataDiv = document.getElementById('response-data');
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

    console.log("usernameOrEmail:", usernameOrEmail)
    console.log("password:", password)

    try {
        // Make a POST request to the authentication endpoint
        const response = await fetch("https://learn.01founders.co/api/auth/signin", {
            method: "POST",
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
            // Parse the response JSON to get the JWT data
            const jwtData = await response.json();

            // Log the JWT data to the console (you might want to handle it differently)
            console.log("JWT Data:", jwtData);

            // Save the JWT to localStorage for future use
            localStorage.setItem("jwt", jwtData);

            await useJWT()
        } else {
            // Display an error message or handle unsuccessful login
            responseDataDiv.textContent = "It didn't work!!"
            console.error("Error during login:", response.statusText);
        }
    } catch (error) {
        // Handle errors that occur during the fetch
        console.error("Error during login:", error);
    }
}

async function useJWT() {

    const jwtToken = localStorage.getItem("jwt");

    const response = await fetch(DOMAIN, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
            query {
                user {
                    id
                    login
                }
                transaction {
                    id
                    type
                    amount
                    userId
                }
                progress {
                    id
                    userId
                    objectId
                    grade
                }
                result {
                    id
                    objectId
                    userId
                    grade
                }
                object {
                    id
                    name
                    type
                    attrs
                }
            }
        `
        }),
    });


    const responseData = await response.json();

    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";

    const logoutButton = document.createElement("button");
    logoutButton.classList.add("logoutButton");
    logoutButton.innerText = "logout";
    logoutButton.addEventListener("click", function () {
        window.location.reload();
    });
    mainContainer.appendChild(logoutButton);

    const loadedProfile = document.createElement("div")
    loadedProfile.classList.add("loadedProfile")
    mainContainer.appendChild(loadedProfile)

    const username = document.createElement("div")
    username.classList.add("username")
    username.textContent = responseData.data.user[0].login
    loadedProfile.appendChild(username)

    let level = 0;
    let xpUp = 0;
    let xpDown = 0;

    const transactionsDiv = document.createElement("div");
    transactionsDiv.classList.add("transactions");
    responseData.data.transaction.forEach(transaction => {
        const transactionsElement = document.createElement("div");
        const transactionIdElement = document.createElement("span");
        transactionIdElement.textContent = "Transaction ID: " + transaction.id;
        transactionsElement.appendChild(transactionIdElement);

        const transactionsTypeElement = document.createElement("span");
        transactionsTypeElement.textContent = "Transaction Type: " + transaction.type;
        transactionsElement.appendChild(transactionsTypeElement);
        if (transaction.type == "level") {

            level += Number(transaction.amount)
        } else if(transaction.type == "up") {
            xpUp += Number(transaction.amount)

        }  else if(transaction.type == "down") {
            xpDown += Number(transaction.amount)

        }

        const transactionsAmountElement = document.createElement("span");
        transactionsAmountElement.textContent = "Transaction Amount: " + transaction.amount;
        transactionsElement.appendChild(transactionsAmountElement);

        const transactionsUserIdElement = document.createElement("span");
        transactionsUserIdElement.textContent = "Transaction User ID: " + transaction.userId;
        transactionsElement.appendChild(transactionsUserIdElement);

        transactionsDiv.appendChild(transactionsElement);
    });

    // Append the transactions div to your main container
    loadedProfile.appendChild(transactionsDiv);
    console.log("level:", level)
    console.log("xpUp:", xpUp)
    console.log("xpDown:", xpDown)



    // Update the content of the response-data div

    responseDataDiv.textContent = JSON.stringify(responseData, null, 2);





}