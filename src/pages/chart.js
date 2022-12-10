import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {format} from "date-fns";
import {filterNonVideos} from "../util/videoUtil";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
    },
};

function generateLabels(firstTime, lastTime) {
    const firstYear = Number(format(new Date(firstTime), "yyyy"));
    const firstMonth = Number(format(new Date(firstTime), "MM"));
    const lastYear = Number(format(new Date(lastTime), "yyyy"));
    const lastMonth = Number(format(new Date(lastTime), "MM"));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const labels = [];
    for (let i = firstYear; i <= lastYear; i++) {
        if (i === firstYear) {
            for (let j = firstMonth; j <= 12; j++) {
                labels.push(months[j - 1] + ' ' + i);
            }
        } else if (i === lastYear) {
            for (let j = 1; j <= lastMonth; j++) {
                labels.push(months[j - 1] + ' ' + i);
            }
        } else {
            for (let j = 1; j <= 12; j++) {
                labels.push(months[j - 1] + ' ' + i);
            }
        }
    }
    return labels;
}

export function VideoChart(json, channel, shortFilter) {
    json = filterNonVideos(json);
    const firstTime = json[json.length - 1].time;
    const lastTime = json[0].time;
    const labels = generateLabels(firstTime, lastTime);
    const watchCount = [];
    for (let i = 0; i < labels.length; i++) {
        watchCount.push(0);
    }
    const firstYear = Number(format(new Date(firstTime), "yyyy"));
    const firstMonth = Number(format(new Date(firstTime), "MM"));
    for (let i = 0; i < json.length; i++) {
        const year = Number(format(new Date(json[i].time), "yyyy"));
        const month = Number(format(new Date(json[i].time), "MM"));
        const index = (year - firstYear) * 12 + month - firstMonth;
        if (channel === "" || (json[i].subtitles !== undefined && json[i].subtitles[0].name === channel)) {
            if (shortFilter) {
                if (!json[i].title.includes("#shorts") && !json[i].title.includes("#Shorts")) {
                    watchCount[index]++;
                }
            } else {
                watchCount[index]++;
            }
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Videos watched',
                data: watchCount,
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
        ],
    };
    return <Line options={options} data={data} />;
}
