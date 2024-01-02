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
    let svgParentContainer = undefined
    let bottomPosition = undefined
    let svg = undefined
    let containerWidth = undefined

    const data = {
        labels: Array.from(skillAmounts.keys()),
        values: Array.from(skillAmounts.values())
    };

    if (dataName == "technicalSkillsData") {
        svgParentContainer = document.querySelector('.technicalSkills');
        bottomPosition = svgParentContainer.getBoundingClientRect().bottom;
        svg = document.querySelector(".technicalSkillsChart");
        containerWidth = (window.innerWidth * 0.25);

    } else if (dataName == "technologiesData") {
        svgParentContainer = document.querySelector('.technologies');
        bottomPosition = svgParentContainer.getBoundingClientRect().bottom;
        svg = document.querySelector(".technologiesChart")
        containerWidth = (window.innerWidth * 0.75);
    }

    const height = 200;

    // Calculate bar width based on data length
    const barWidth = 40;

    // Calculate the maximum value for scaling
    const maxValue = Math.max(...data.values);


    // Create bars
    for (let i = 0; i < data.labels.length; i++) {
        // Calculate the adjusted x position for centering
        const x = (containerWidth - (barWidth * data.labels.length/2)) + (i * barWidth);

        // Use document.createElement to create HTML elements
        const rect = document.createElement('div');
        rect.style.position = 'absolute';
        rect.style.left = x + 'px';
        rect.style.bottom = '100px';
        rect.style.width = barWidth + 'px';
        rect.style.height = (data.values[i] / maxValue) * height + 'px';
        rect.style.backgroundColor = '#01FF70';

        svg.appendChild(rect);

        // Add labels inside the bars
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.left = '25%';
        label.style.top = '100%';
        label.style.transform = 'translate(-50%, 50%) rotate(-45deg)'; // Rotate the text vertically and center it
        label.style.transformOrigin = 'bottom center'; // Set the rotation origin
        label.style.textAlign = 'center';
        label.style.whiteSpace = 'nowrap';
        label.textContent = data.labels[i]
        // + ":" + data.values[i];
        rect.appendChild(label);

        const values = document.createElement('div');
        values.classList.add("graphValues")
        values.style.position = 'absolute';
        values.style.left = '10%';
        values.style.bottom = '110%';
        values.style.transformOrigin = 'bottom center'; // Set the rotation origin
        values.style.textAlign = 'center';
        values.textContent = data.values[i] + '%'
      
        rect.appendChild(values);
    }
}


