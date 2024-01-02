import { UseJWT } from "./useJWT.mjs";

export async function getSkills(skillsQuery) {
    try {
        const responseData = await UseJWT(skillsQuery);
        const [technicalSkillsData, technologiesData] = processTransactions(responseData.data.transaction);

        // renderSkills(skillAmounts);
        createBarChart(technicalSkillsData, "technicalSkillsData")
        createBarChart(technologiesData, "technologiesData")
    } catch (error) {
        console.error("Error fetching skills:", error);
    }
}

function processTransactions(transactions) {
    const technicalSkills = new Map();
    const technologies = new Map();
    let currentSkillAmount = undefined;

    transactions.forEach(singleTransaction => {
        if (singleTransaction.type.indexOf("skill_") !== -1) {
            const skillType = singleTransaction.type.substring('skill_'.length);
            if (skillType === "prog"
                || skillType === "algo"
                || skillType === "sys-admin"
                || skillType === "front-end"
                || skillType === "back-end"
                || skillType === "stats"
                || skillType === "game") {
                currentSkillAmount = technicalSkills.get(skillType);
                if (currentSkillAmount !== undefined) {
                    if (singleTransaction.amount > currentSkillAmount) {
                        technicalSkills.set(skillType, singleTransaction.amount);
                    }
                } else {
                    technicalSkills.set(skillType, singleTransaction.amount);
                }
            } else {
                currentSkillAmount = technologies.get(skillType);
                if (currentSkillAmount !== undefined) {
                    if (singleTransaction.amount > currentSkillAmount) {
                        technologies.set(skillType, singleTransaction.amount);
                    }
                } else {
                    technologies.set(skillType, singleTransaction.amount);
                }
            }
        }
    });

    return [technicalSkills, technologies];

}

// writes out the skills and their numbers
// function renderSkills(skillAmounts) {
//     const skillsDiv = document.querySelector(".skills");

//     for (const [skillType, transactionAmount] of skillAmounts) {
//         // Create a div for each skillType and add the transaction amount to it
//         const subDiv = document.createElement("div");
//         subDiv.classList.add(skillType);
//         subDiv.textContent = `Skill: ${skillType}: ${transactionAmount}`;
//         skillsDiv.appendChild(subDiv);
//     }


// }

function createBarChart(skillAmounts, dataName) {
    let svg = undefined
    let containerWidth = undefined
    const data = {
        labels: Array.from(skillAmounts.keys()),
        values: Array.from(skillAmounts.values())
    };

    if (dataName == "technicalSkillsData") {
        svg = document.querySelector(".technicalSkillsChart");
         containerWidth = svg.clientWidth || window.innerWidth;
    } else if (dataName == "technologiesData") {
        svg = document.querySelector(".technologiesChart")
         containerWidth = (svg.clientWidth || window.innerWidth) + 500;
    }

    // Dynamically calculate the container width
    // const containerWidth = svg.clientWidth || window.innerWidth;

    const width = 400;
    const height = 200;

    // Calculate bar width based on data length
    const barWidth = 25;

    // Calculate the maximum value for scaling
    const maxValue = Math.max(...data.values);

    // Calculate the center position for the graph
    const center = (containerWidth - width) / 2;

    // Create bars
    for (let i = 0; i < data.labels.length; i++) {
        // Calculate the adjusted x position for centering
        const x = center + i * barWidth;

        // Use document.createElement to create HTML elements
        const rect = document.createElement('div');
        rect.style.position = 'absolute';
        rect.style.left = x + 'px';
        rect.style.bottom = '0';
        rect.style.width = barWidth + 'px';
        rect.style.height = (data.values[i] / maxValue) * height + 'px';
        rect.style.backgroundColor = '#01FF70';
        // rect.style.overflow = 'hidden'; // Hide overflow to keep the label inside the bar

        svg.appendChild(rect);

        // Add labels inside the bars
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.left = '90%';
        label.style.bottom = '90%';
        label.style.transform = 'translate(-50%, 50%) rotate(-90deg)'; // Rotate the text vertically and center it
        label.style.transformOrigin = 'bottom center'; // Set the rotation origin
        label.style.textAlign = 'center';
        label.textContent = data.labels[i]
        // + ":" + data.values[i];
        rect.appendChild(label);

        const values = document.createElement('div');
        values.classList.add("graphValues")
        values.style.position = 'absolute';
        values.style.left = '90%';
        values.style.bottom = '12%';
        values.style.transform = 'translate(-50%, 50%) rotate(-90deg)'; // Rotate the text vertically and center it
        values.style.transformOrigin = 'bottom center'; // Set the rotation origin
        values.style.textAlign = 'center';
        values.textContent = data.values[i]
        // + ":" + data.values[i];
        rect.appendChild(values);
    }
}


