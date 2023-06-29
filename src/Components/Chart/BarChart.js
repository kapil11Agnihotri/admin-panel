import React, { useEffect, useRef } from "react";
import styles from "./BarChart.module.css"

const BarChart = () => {
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

    const usersByDate = {};

    Object.values(data).forEach((user) => {
      const date = user.date.slice(0, 10); // Extract date from ISO string

      if (usersByDate[date]) {
        usersByDate[date] += 1; // Incrementing count for the same date registered users
      } else {
        usersByDate[date] = 1; // Initialize count for a new date
        chartData.labels.push(date); // Now pushing date to labels array
      }
    });

    chartData.data = Object.values(usersByDate);

    return chartData;
  };

  const drawChart = (chartData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const barWidth = 40;
    const chartHeight = 200;
    const chartMargin = 20;

    // logic for clearing the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Now calculating the height scale
    const maxDataValue = Math.max(...chartData.data);
    const heightScale = (chartHeight - chartMargin) / maxDataValue;

    // Drawing bars
    chartData.data.forEach((value, index) => {
      const x = (barWidth + chartMargin) * index;
      const y = chartHeight - value * heightScale;
      const barHeight = value * heightScale;

      context.fillStyle = "blue";
      context.fillRect(x, y, barWidth, barHeight);

      //Now drawing labels
      context.fillStyle = "black";
      context.fillText(`${value} Users`, x, y - 10);
      context.fillText(chartData.labels[index], x, chartHeight + 15);
    });
  };

  return (
    <div className={styles.barChartContainer}>
      <h3 className={styles.chartTitle}>Bar Chart</h3>
      <canvas ref={canvasRef} width={400} height={250} />
    </div>
  );
};

export default BarChart;
