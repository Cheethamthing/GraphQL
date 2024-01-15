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

function createBarChart(skillAmounts, dataName) {

    const technicalSkillsElement = document.querySelector('.technicalSkills');
    const technicalSkillsWidth = technicalSkillsElement.offsetWidth;

    let svgContainer = undefined;
    let SVGTitle = undefined
    let containerWidth = technicalSkillsWidth

    const data = {
        labels: Array.from(skillAmounts.keys()),
        values: Array.from(skillAmounts.values())
    };

    if (dataName == "technicalSkillsData") {
        svgContainer = technicalSkillsElement
        SVGTitle = "technicalSkillsChart"

    } else if (dataName == "technologiesData") {
        svgContainer = document.querySelector(".technologies");
        SVGTitle = "technologiesChart"
    }

    const chartHeight = 400;
    const chartWidth = containerWidth
    const barWidth = 40;
    const maxValue = 100;

    // Create SVG element
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("height", chartHeight);
    svgElement.setAttribute("width", chartWidth);


    const titleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
    titleElement.textContent = SVGTitle

    svgElement.appendChild(titleElement);


    // Append SVG to parent container
    svgContainer.appendChild(svgElement);

    // Create bars
    for (let i = 0; i < data.labels.length; i++) {

        const barHeight = (data.values[i] / maxValue) * chartHeight;

        const x = (i * barWidth) + (chartWidth / 2 - (data.labels.length * barWidth) / 2);
        const y = ((chartHeight * 0.75) - barHeight);

        // Create rect element
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("fill", '#01FF70');
        rect.setAttribute("stroke", "black");
        rect.setAttribute("stroke-width", "1");

        svgElement.appendChild(rect);

        // Add values inside the bars
        const values = document.createElementNS("http://www.w3.org/2000/svg", "text");
        values.setAttribute("fill", 'white');
        values.setAttribute("x", x + barWidth / 2);
        values.setAttribute("y", y - 15); // Adjust the y position for values
        values.setAttribute("text-anchor", "middle");
        values.textContent = data.values[i] + '%';
        svgElement.appendChild(values);

        // Add labels inside the bars
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("fill", 'white');
        label.setAttribute("x", x + barWidth / 2);
        label.setAttribute("y", y + barHeight + 15); // Adjust the y position for labels
        label.setAttribute("text-anchor", "end");
        label.setAttribute("transform", `rotate(-45 ${x + barWidth / 2} ${y + barHeight + 15})`);
        label.textContent = data.labels[i];
        svgElement.appendChild(label);
    }



}



