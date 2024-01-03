import { UseJWT } from "./useJWT.mjs";

export async function getUsername(usernameQuery) {

    const responseData = await UseJWT(usernameQuery)
    const username = responseData.data.user[0].login;

    const usernameDiv = document.querySelector(".username");
    if (usernameDiv) {
        usernameDiv.innerHTML = `Username: <span style="color: #01FF70;">${username}</span>`;
    }
}
