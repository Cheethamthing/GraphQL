import { UseJWT } from "./useJWT.mjs";

export async function getSkills(skillsQuery) {
    try {
        const responseData = await UseJWT(skillsQuery);
        const skillAmounts = processTransactions(responseData.data.transaction);

        // renderSkills(skillAmounts);
        createBarChart(skillAmounts)
    } catch (error) {
        console.error("Error fetching skills:", error);
    }
}

function processTransactions(transactions) {
    const skillAmounts = new Map();

    transactions.forEach(singleTransaction => {
        if (singleTransaction.type.indexOf("skill_") !== -1) {
            const skillType = singleTransaction.type.substring('skill_'.length);
            let currentSkillAmount = skillAmounts.get(skillType);

            if (currentSkillAmount !== undefined) {
                if (singleTransaction.amount > currentSkillAmount) {
                    skillAmounts.set(skillType, singleTransaction.amount);
                }
            } else {
                skillAmounts.set(skillType, singleTransaction.amount);
            }
        }
    });

    return skillAmounts;
}

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

function createBarChart(skillAmounts) {
    const data = {
        labels: Array.from(skillAmounts.keys()),
        values: Array.from(skillAmounts.values())
    };

    const svg = document.querySelector(".technicalSkillsChart");

    // Dynamically calculate the container width
    const containerWidth = svg.clientWidth || window.innerWidth;

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
        rect.style.overflow = 'hidden'; // Hide overflow to keep the label inside the bar

        svg.appendChild(rect);

        // Add labels inside the bars
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.left = '10';
        label.style.bottom = '95';
        // label.style.transform = 'translate(-50%, 50%) rotate(-90deg)'; // Rotate the text vertically and center it
        // label.style.transformOrigin = 'bottom center'; // Set the rotation origin
        label.style.textAlign = 'center';
        label.textContent = data.labels[i] 
        // + ":" + data.values[i];
        rect.appendChild(label);
    }
}


