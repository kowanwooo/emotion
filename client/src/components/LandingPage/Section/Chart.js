import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



function Chart(props) {
    
    ChartJS.register(ArcElement, Tooltip, Legend);

    const Data = {
        labels: ['행복','공포','놀람','화남','슬픔','중립','혐오'],
        datasets: [
            {
                // label: '# of Votesdasdasdddddddddd',
                // data : {'슬픔':12, '슬픔':12, '슬픔':12, '슬픔':12, '슬픔':12, '슬픔':12, '슬픔':12,},
                data: props.count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    '#ffffff',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    '#ffffff',
                ],
                borderWidth: 1,


            },
        ],
    };
    const options = {
        legend: { // 범례삭제
            display: false
        },
        // responsive 속성을 false로 지정한다.
        responsive: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },

        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return tooltipItem.yLabel;
                }
            }
        }
    }

    return <Doughnut data={Data} count={props.count} options={options} style={props.style} />;
};

export default Chart  
