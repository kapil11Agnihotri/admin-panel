import React, { useEffect, useRef } from "react";
import styles from "./PieChart.module.css";

const PieChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchChartData();
  });

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "https://admin-panel-2b58f-default-rtdb.firebaseio.com/users.json"
      );
      const data = await response.json();
      const chartData = processData(data);
      drawChart(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const processData = (data) => {
    const chartData = {
      labels: [],
      data: [],
    };

    const roles = {};

    Object.values(data).forEach((user) => {
      const role = user.role;

      if (roles[role]) {
        roles[role] += 1; // Increment count for the same role
      } else {
        roles[role] = 1; // Initialize count for a new role
        chartData.labels.push(role); // Push role to labels array
      }
    });

    chartData.data = Object.values(roles);

    return chartData;
  };

  const drawChart = (chartData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const colors = ["purple", "green", "blue", "yellow", "red", "red"];
    const chartRadius = Math.min(canvas.width, canvas.height) / 4;
    const chartCenterX = canvas.width / 2;
    const chartCenterY = canvas.height / 2;
  
    // Calculate the total sum of data values
    const total = chartData.data.reduce((sum, value) => sum + value, 0);
  
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw pie slices
    let startAngle = 0;
    chartData.data.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total;
      const endAngle = startAngle + sliceAngle;
  
      context.beginPath();
      context.fillStyle = colors[index % colors.length];
      context.moveTo(chartCenterX, chartCenterY);
      context.arc(chartCenterX, chartCenterY, chartRadius, startAngle, endAngle);
      context.closePath();
      context.fill();
  
      startAngle = endAngle;
    });
  
    // Draw labels and counts
    let labelAngle = 0;
    const labelRadius = chartRadius + 30;
    chartData.labels.forEach((label, index) => {
      const sliceAngle = (2 * Math.PI * chartData.data[index]) / total;
      const midAngle = labelAngle + sliceAngle / 2; // Calculate the middle angle of the slice
  
      // Calculate the position of the label and count based on the middle angle
      const labelX = chartCenterX + Math.cos(midAngle) * labelRadius;
      const labelY = chartCenterY + Math.sin(midAngle) * labelRadius;
      const countX = chartCenterX + Math.cos(midAngle) * (labelRadius + 15);
      const countY = chartCenterY + Math.sin(midAngle) * (labelRadius + 15);
  
      // Draw labels
      context.fillStyle = "black";
      context.font = "12px Arial";
      context.textAlign = "center";
      context.fillText(label, labelX, labelY);
  
      // Draw counts
      context.font = "bold 12px Arial";
      context.fillText(chartData.data[index], countX, countY);
  
      labelAngle += sliceAngle;
    });
  };
  
  
  
  

  return (
    <div className={styles.pieChartContainer}>
      <h3 className={styles.chartTitle}>Pie Chart</h3>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default PieChart;
