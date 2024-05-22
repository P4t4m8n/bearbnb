// // pages/chart.js
// import React from "react";

// const BarChart = ({ data }:{data:any}) => {
//   const maxValue = Math.max(...data.map((item:any) => item.value));
//   const chartWidth = 500;
//   const chartHeight = 300;
//   const barWidth = chartWidth / data.length;

//   return (
//     <svg width={chartWidth} height={chartHeight}>
//       {data.map((item, index) => {
//         const barHeight = (item.value / maxValue) * chartHeight;
//         return (
//           <rect
//             key={index}
//             x={index * barWidth}
//             y={chartHeight - barHeight}
//             width={barWidth - 2} // Subtract 2 for some spacing between bars
//             height={barHeight}
//             fill="blue"
//           />
//         );
//       })}
//     </svg>
//   );
// };


// const ChartPage = () => {
//   const data = [
//     { label: "A", value: 30 },
//     { label: "B", value: 80 },
//     { label: "C", value: 45 },
//     { label: "D", value: 60 },
//     { label: "E", value: 20 },
//     { label: "F", value: 90 },
//     { label: "G", value: 55 },
//   ];

//   return (
//     <div>
//       <h1>Bar Chart</h1>
//       <BarChart data={data} />
//     </div>
//   );
// };

// export default ChartPage;
