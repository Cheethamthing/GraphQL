import { auditUpQuery, auditDownQuery } from "./queries.mjs";
import { DOMAIN } from "./graphQL.mjs";

export async function getAuditRatio() {
    let auditUpXp = 0;
    let auditDownXp = 0;


    const jwtToken = localStorage.getItem("jwt");

    let upResponse = await fetch(DOMAIN, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // argument query
            query: auditUpQuery
            // argument query
        }),
    });
    const responseDataUp = await upResponse.json();

    if (Array.isArray(responseDataUp.data.transaction)) {
        console.log("I'm an array!!")
    }

    console.log("responseDataUp", responseDataUp)

    responseDataUp.data.transaction.forEach(singleTransaction => {
        auditUpXp += singleTransaction.amount;
        console.log("singleTransactionU", singleTransaction)
    });

    let downResponse = await fetch(DOMAIN, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // argument query
            query: auditDownQuery
            // argument query
        }),
    });
    const responseDataDown = await downResponse.json();

console.log("responseDataDown", responseDataDown)
    responseDataDown.data.transaction.forEach(singleTransaction => {
        console.log("singleTransactionD", singleTransaction)
        auditDownXp += singleTransaction.amount
    })

    //Audit ratio
    const auditRatioDiv = document.querySelector(".auditRatio");

    auditRatioDiv.textContent = "Audit Ratio:" + " " + (auditUpXp / auditDownXp).toFixed(1)
}