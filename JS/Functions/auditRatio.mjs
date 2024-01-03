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

    auditRatioDiv.innerHTML = `Audit Ratio: <span style="color: #01FF70;">${(auditUpXp / auditDownXp).toFixed(1)}</span>`;

}