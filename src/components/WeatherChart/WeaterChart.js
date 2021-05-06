import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WeatherChart = ({ chartData }) => {
  let data;
  if (chartData) {
    data = chartData.map(chart => {
      return { ...chart, dt: new Date(chart.dt * 1000).getHours() };
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomToolTip>
          <p className="time">{`${payload[0].payload.dt}:00`}</p>
          <div className="time-and-condition">
            <p className="temp">{`${payload[0].value}`}&#176;C</p>
            <img
              src={`https://openweathermap.org/img/w/${payload[0].payload.weather[0].icon}.png`}
              alt="icon of weather"
            />
          </div>
        </CustomToolTip>
      );
    }

    return null;
  };

  const renderTimeTick = ({ x, y, payload }) => {
    let result = null;

    switch (payload.value) {
      case (0, 6, 12, 18):
        result = payload.value;
        break;
      default:
        result = null;
    }
    return <p>{result}</p>;
  };

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          className="theChart"
        >
          <Line
            type="natural"
            dataKey="temp"
            stroke="#f00606"
            dot={true}
            animationDuration={4000}
          />
          <CartesianGrid stroke="rgba(5, 5, 5, 0)" />
          <XAxis
            tick={{ strokeWidth: 6 }}
            dy={11}
            dataKey="dt"
            stroke="#60a5fa"
            label={{
              value: 'Time',
              position: 'top',
              stroke: '#60a5fa',
            }}
          />
          <YAxis stroke="#60a5fa" />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled(motion.div)`
  width: 600px;
  margin: 10px;
  @media screen and (max-width: 900px) {
    padding-right: 2.5rem;
  }
  @media screen and (max-width: 650px) {
    width: 80vw;
  }
`;

const CustomToolTip = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    color: black;
  }
  .time-and-condition {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export default WeatherChart;
