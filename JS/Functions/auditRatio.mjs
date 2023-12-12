import { UseJWT } from "./useJWT.mjs";

export async function getAuditRatio(queryStringUp, queryStringDown) {
    let auditUpXp = 0;
    let auditDownXp = 0;

    const responseDataUp = await UseJWT(queryStringUp)
    const responseDataDown = await UseJWT(queryStringDown)

    responseDataUp.data.transaction.forEach(singleTransaction => {
        auditUpXp += singleTransaction.amount;
    });

    responseDataDown.data.transaction.forEach(singleTransaction => {
        auditDownXp += singleTransaction.amount
    })

    //Audit ratio
    const auditRatioDiv = document.querySelector(".auditRatio");

    auditRatioDiv.textContent = "Audit Ratio:" + " " + (auditUpXp / auditDownXp).toFixed(1)
}