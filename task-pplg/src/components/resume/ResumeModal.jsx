import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskStatusChart({ completed = 0, pending = 0 }) {
    const data = {
        labels: ['Selesai', 'Belum Selesai'],
        datasets: [
            {
                data: [completed, pending],
                backgroundColor: ['#10b981', '#6366f1'],
                borderWidth: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#94a3b8', usePointStyle: true }
            }
        }
    };

    return (
        <div className="chart-wrapper">
            <Doughnut data={data} options={options} />
        </div>
    );
}