import { UseJWT } from "./useJWT.mjs";

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
    levelDiv.textContent = "Level:" + " " + level
}