import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RescueChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3'],
          datasets: [{
            label: 'Progress',
            data: [30, 60, 90],
            backgroundColor: ['#1E3A8A', '#2563EB', '#FACC15'],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default RescueChart;