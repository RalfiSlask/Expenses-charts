

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
    let weekday;

    dateArray.forEach(date => {
        weekday = date.toLowerCase();
    });

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
        highlightCurrentDay(currentDay, chartBodies);
        showAmountOnHover(chartBodies, dailyAmounts);

        } else {
            throw new Error("response not okey")
        };
        
    } catch (error) {
        console.log(error)
    }
};

/* fetchJsonData(); */

fetch("./data.json")
.then(response => {
    return response.json();
})
.then(json => {
    for(let i = 0; i < json.length; i++) {
    let amount = json[i].amount;
    let day = json[i].day;
    let chart = document.createElement("div");
    chart.className = "chart";
    chart.innerHTML = 
    `<div class="amount hidden">$${json[i].amount}</div>
    <div class="body monday"></div>
    <div class="day">${json[i].day}</div>`
    charts.appendChild(chart);
    }

    let dailyAmounts = document.querySelectorAll(".amount");
    let chartBodies = document.querySelectorAll(".body");
    let currentDay = document.querySelectorAll(".day");

    const showAmountOnHover = () => {
        for(let i = 0; i < chartBodies.length; i++) {
            chartBodies[i].onmouseenter = () => {
            dailyAmounts[i].classList.remove("hidden");
         }
            chartBodies[i].onmouseleave = () => {
            dailyAmounts[i].classList.add("hidden");
         }
        }
    }

    const heightOffCharts = () => {
        for(let i = 0; i < chartBodies.length; i++) {
            chartBodies[i].style.height = `${json[i].amount * 3}px`;
        }
    }

    const highlightCurrentDay = () => {
        const date = Date();
        const dateArray = date.split(" ");
        let weekday;
        for(let i = 0; i < dateArray.length; i++) {
            weekday = dateArray[0].toLowerCase();
        }
        for(let i = 0; i < currentDay.length; i++) {
            if(weekday == currentDay[i].innerHTML) {
               chartBodies[i].classList.toggle("currentDay"); 
            }
        }
    } 

    highlightCurrentDay();
    showAmountOnHover();
    heightOffCharts();
});


