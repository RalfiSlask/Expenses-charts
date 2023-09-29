

const charts = document.querySelector(".charts");

const createChart = (data) => {
    const { amount, day } = data;
    let chart = document.createElement("div");
    chart.className = "chart";
    chart.innerHTML = 
    `<div class="amount hidden">$${amount}</div>
    <div class="body monday"></div>
    <div class="day">${day}</div>`
    charts.appendChild(chart);
};

const showAmountOnHover = (chartBodies, dailyAmounts) => {
    chartBodies.forEach((body, index) => {
        const dailyAmount = dailyAmounts[index];
        body.onmouseenter = () => {
            dailyAmount.classList.remove("hidden")
        };
        body.onmouseleave = () => {
            dailyAmount.classList.add("hidden")
        }
    })
};

const heightOffCharts = (chartBodies, jsonData) => {
    chartBodies.forEach((body, index) => {
        const data = jsonData[index]
        body.style.height = `${data.amount * 3}px`;
    })
};

const highlightCurrentDay = (currentDay, chartBodies) => {
    const date = Date();
    const dateArray = date.split(" ");
    let weekday = dateArray[0].toLowerCase();
   
    currentDay.forEach((day, index) => {
        const chartBody = chartBodies[index]
        if(weekday === day.innerHTML) {
            chartBody.classList.add("currentDay");
        };   
    })
}; 

const fetchJsonData = async ()  => {
    try {
        const response = await fetch("./data.json")
        if(response.ok) {
            const jsonData = await response.json();
            jsonData.forEach(data => {
                createChart(data)
            });

        let dailyAmounts = document.querySelectorAll(".amount");
        let chartBodies = document.querySelectorAll(".body");
        let currentDay = document.querySelectorAll(".day");

        heightOffCharts(chartBodies, jsonData)
        showAmountOnHover(chartBodies, dailyAmounts);
        highlightCurrentDay(currentDay, chartBodies);

        } else {
            throw new Error("response not okey")
        };
        
    } catch (error) {
        console.log(error)
    }
};

fetchJsonData(); 
