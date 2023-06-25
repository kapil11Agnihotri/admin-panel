import React, { useEffect, useRef } from 'react';

const PieChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Sample data for pie chart
    const data = [5, 10, 25];
    const labels = ['Admin', 'Moderator', 'User'];
    const colors = ['red', 'green', 'blue'];
    const chartRadius = 100;
    const chartCenterX = canvas.width / 2;
    const chartCenterY = canvas.height / 2;

    // Calculate the total sum of data values
    const total = data.reduce((sum, value) => sum + value, 0);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pie slices
    let startAngle = 0;
    data.forEach((value, index) => {
      const sliceAngle = (Math.PI * 2 * value) / total;
      const endAngle = startAngle + sliceAngle;

      context.beginPath();
      context.fillStyle = colors[index];
      context.moveTo(chartCenterX, chartCenterY);
      context.arc(chartCenterX, chartCenterY, chartRadius, startAngle, endAngle);
      context.closePath();
      context.fill();

      // Draw labels
      const labelX = chartCenterX + Math.cos(startAngle + sliceAngle / 2) * (chartRadius + 20);
      const labelY = chartCenterY + Math.sin(startAngle + sliceAngle / 2) * (chartRadius + 20);
      context.fillStyle = 'black';
      context.font = '12px Arial';
      context.textAlign = 'center';
      context.fillText(labels[index], labelX, labelY);

      startAngle = endAngle;
    });
  }, []);

  return (
    <div>
      <h3>Pie Chart</h3>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default PieChart;
