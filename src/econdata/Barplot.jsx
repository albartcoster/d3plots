import { useMemo } from 'react';
import * as d3 from 'd3';

function Barplot({ data, title, subtitle,source }) {
  const width = 500;
  const height = 400;
  const marginLeft = 5;
  const marginRight = 0;
  const marginTop = title ? subtitle ? 60 : 40 : 20;
  const marginBottom = source ? 30 : 20;

  const groups = data.map((d) => d.name).reverse();
  const chartHeight = height - marginTop - marginBottom;

  const yScale = useMemo(() => {
    return d3.scaleBand()
      .domain(groups)
      .range([0, chartHeight])
      .padding(0.1);
  }, [data, chartHeight]);


  // Create scales using D3
  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([0, width]);
  }, [data, width]);

  const grid = xScale
    .ticks(12)
    .slice(0,55)
    .map((count, i) => (
      <g key={i}>
        <line
          x1={xScale(count)+marginLeft}
          x2={xScale(count)+marginLeft}
          y1={marginTop}
          y2={marginTop + chartHeight}
          stroke={i === 0 ? 'black' : '#605d5d'}
          strokeWidth={i===0?"1px":"0.5px"}
          opacity={0.2}
        />
        <text
          x={xScale(count)+marginLeft }
          y={marginTop -5}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
          fill={i==0?"black":"#524f4f"}
          opacity={1}
        >
          {count}
        </text>
      </g>
    ));
 

  return (
    <svg width={width} height={height}>
      <line
        x1={marginLeft}
        y1={2}
        x2={width - marginRight}
        y2={2}
        stroke="red"
        width="2px"
      />
      <rect
        x={marginLeft}
        y={2}
        width={20}
        height={4}
        fill="red"
        stroke="red"
        strokeWidth="1px"
      />

      {title && (
        <text
          x={0}
          y={20}
          textAnchor="right"
          fontSize="16px"
          fontWeight="bold"
          fill="black" 
        >
          {title}
        </text>
      )}
      {subtitle && (
        <text
          x={0}
          y={35}
          textAnchor="right"
          fontSize="14px"
          fill="black"
        >
          {subtitle}
        </text>
      )}
      {grid}
      {data.map((d) => (
        <g key={d.name}>
          <rect
            x={marginLeft}
            y={marginTop + yScale(d.name)}
            width={xScale(d.count)+marginLeft}
            height={yScale.bandwidth()}
            opacity={1}
            stroke="#076fa2"
            fill="#076fa2"
          />
          {d.count>7?(
          <text
            x={marginLeft + 5}
            y={marginTop + yScale(d.name) + yScale.bandwidth() / 2 + 4}
            textAnchor="start"
            fontSize="12px"
            fill="white"
          >
            {d.name}
          </text>
          ):(
          <text
            x={xScale(d.count) + marginLeft + 5}
            y={marginTop + yScale(d.name) + yScale.bandwidth() / 2 + 4}
            textAnchor="start"
            fontSize="12px"
            fill="black"
          > 
            {d.name}
          </text>
          )}
          </g>
      ))}
      {source && (
        <text
          x={marginLeft}
          y={height - marginBottom + 15}
          textAnchor="left"
          fontSize="5px"
          fill="#666"
          fontStyle="italic"
        >
          Source: {source}
        </text>
      )}
    </svg>
  );
}

export default Barplot;
