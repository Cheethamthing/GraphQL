import { UseJWT } from "./useJWT.mjs";

async function calculateXP() {
    let XPData = await fetchData(queryXP)
    //does the calculation to add all XP values together and round the total
    const totalAmount = XPData.data.transaction.reduce((total, entry) => total + entry.amount, 0);
    const roundedTotal = Math.round(totalAmount / 1000) * 1000;
    console.log("Total XP (rounded):", roundedTotal);
    return roundedTotal
}



export async function getXP(xpQuery) {
    const responseData = await UseJWT(xpQuery)

    const totalAmount = responseData.data.transaction.reduce((total, entry) => total + entry.amount, 0);
    const roundedTotal = Math.round(totalAmount / 1000) * 1000;
    console.log("Total XP (rounded):", roundedTotal);
    const xpDiv = document.querySelector(".xp");
    xpDiv.innerHTML = `XP: <span style="color: #01FF70;">${roundedTotal}</span>`;

}