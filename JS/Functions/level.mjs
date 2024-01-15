import { UseJWT } from "./useJWT.mjs";

// Doesn't work for every user; merely most..
// Not sure why since I only have easy access to my own data
export async function getLevel(levelQuery) {
    let level = 0;
    const responseData = await UseJWT(levelQuery)

    responseData.data.transaction.forEach(transaction => {

        if (level < transaction.amount) {
            level = Number(transaction.amount)
        }
    })
    //Level
    const levelDiv = document.querySelector(".level");
    levelDiv.innerHTML = `Level: <span style="color: #01FF70;">${level}</span>`;

}