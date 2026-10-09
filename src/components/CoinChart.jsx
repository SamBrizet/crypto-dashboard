import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export default function CoinChart({ data, label }) {
  const green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#61d6a1'
  const chartData = {
    labels: data.map((_, index) => `D${index + 1}`),
    datasets: [
      {
        label,
        data: data.map((point) => point.y),
        borderColor: green,
        backgroundColor: `${green}1f`,
        fill: true,
        tension: 0.35,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  }

  return <Line data={chartData} options={options} />
}