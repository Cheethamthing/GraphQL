import { usernameQuery } from "./queries.mjs";
import { DOMAIN } from "./graphQL.mjs";

export async function getUsername() {
    const jwtToken = localStorage.getItem("jwt");

    const response = await fetch(DOMAIN, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: usernameQuery,
        }),
    });

    const responseData = await response.json();
    console.log("usernameRD", responseData)
    const username = responseData.data.user[0].login;  // Extract username from response
    console.log("usernameRDu", responseData.data.user.login)
    // Update the content of the usernameDiv
    const usernameDiv = document.querySelector(".username");
    if (usernameDiv) {
        usernameDiv.textContent = `Username: ${username}`;
    }
}
