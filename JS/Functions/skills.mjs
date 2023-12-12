import { UseJWT } from "./useJWT.mjs";



export async function getSkills(skillsQuery) {
    const skillAmounts = new Map()

    const responseData = await UseJWT(skillsQuery)
    console.log("skillsRD", responseData)

    responseData.data.transaction.forEach(singleTransaction => {
        if (singleTransaction.type.indexOf("skill_") !== -1) {

            const skillType = singleTransaction.type.substring('skill_'.length);

            let currentSkillAmount = skillAmounts.get(skillType)

            if (currentSkillAmount !== undefined) {
                if (singleTransaction.amount > currentSkillAmount) {
                    skillAmounts.set(skillType, singleTransaction.amount);
                }
            } else {
                skillAmounts.set(skillType, singleTransaction.amount)
            }

        }

    });

    const skillsDiv = document.querySelector(".skills");
    for (const [skillType, transactionAmount] of skillAmounts) {
        // Create a div for each skillType and add the transaction amount to it
        const subDiv = document.createElement("div");
        subDiv.classList.add(skillType);
        subDiv.textContent = `Skill: ${skillType}: ${transactionAmount}`;
        skillsDiv.appendChild(subDiv);
        console.log(subDiv)
    }
}
