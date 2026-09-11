import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SkillRadarChart() {
    const data = {
        labels: [
            'Web Development\nReact/Next.js',
            'Backend\nNode/Python',
            'Databases\nSQL/NoSQL',
            'Testing\nJest/TDD',
            'DevOps\nGit/CI/CD',
            'Data Structures\nStructures'
        ],
        datasets: [
            {
                label: "Skills Profile",
                data: [92, 75, 70, 85, 65, 80],
                backgroundColor: 'rgba(168, 85, 247, 0.25)',
                borderColor: '#c084fc',
                borderWidth: 2,
                pointBackgroundColor: '#a855f7',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#a855f7',
                pointRadius: 4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: { display: false },
                grid: { color: 'rgba(255, 255, 255, 0.08)' },
                angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
                pointLabels: {
                    color: '#94a3b8',
                    font: { size: 9, family: 'Plus Jakarta Sans', weight: 600 }
                }
            }
        }
    };

    return (
        <div className="radar-chart-wrap">
            <Radar data={data} options={options} />
        </div>
    );
}