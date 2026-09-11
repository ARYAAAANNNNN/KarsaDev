import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { competencyAxes } from '../../data/curriculumData';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SkillRadarChart({ scores = [82, 76, 80, 74, 88, 79] }) {
  const normalizedScores = Array.isArray(scores) && scores.length === competencyAxes.length
    ? scores
    : [82, 76, 80, 74, 88, 79];

  const data = {
    labels: competencyAxes,
    datasets: [
      {
        label: 'Kompetensi Siswa',
        data: normalizedScores,
        backgroundColor: 'rgba(168, 85, 247, 0.25)',
        borderColor: '#c084fc',
        borderWidth: 2,
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#a855f7',
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed.r}%`,
        },
      },
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
          font: { size: 9, family: 'Plus Jakarta Sans', weight: 600 },
        },
      },
    },
  };

  return (
    <div className="radar-chart-wrap">
      <Radar data={data} options={options} />
    </div>
  );
}