import { useMemo } from 'react';
import * as d3 from 'd3';

function Barplot({ data, title, source }) {
  const width = 500;
  const height = 400;
  const marginLeft = 120;
  const marginRight = 20;
  const marginTop = title ? 40 : 20;
  const marginBottom = source ? 30 : 20;

  // Create scales using D3
  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d.students)])
      .range([0, width]);
  }, [data, width]);

  const chartHeight = height - marginTop - marginBottom;

  const yScale = useMemo(() => {
    return d3.scaleBand()
      .domain(data.map(d => d.country))
      .range([0, chartHeight])
      .padding(0.1);
  }, [data, chartHeight]);

  return (
    <svg width={width + marginLeft + marginRight} height={height}>
      {title && (
        <text
          x={(width + marginLeft + marginRight) / 2}
          y={marginTop - 5}
          textAnchor="middle"
          fontSize="16px"
          fontWeight="bold"
          fill="black"
        >
          {title}
        </text>
      )}
      {data.map((d) => (
        <g key={d.country}>
          <rect
            x={marginLeft}
            y={marginTop + yScale(d.country)}
            width={xScale(d.students)}
            height={yScale.bandwidth()}
            fill="#69b3a2"
          />
          <text
            x={marginLeft + xScale(d.students) + 5}
            y={marginTop + yScale(d.country) + yScale.bandwidth() / 2 + 4}
            textAnchor="start"
            fontSize="12px"
            fill="black"
          >
            {d.students}
          </text>
          <text
            x={marginLeft - 5}
            y={marginTop + yScale(d.country) + yScale.bandwidth() / 2 + 4}
            textAnchor="end"
            fontSize="12px"
            fill="black"
          >
            {d.country}
          </text>
        </g>
      ))}
      {source && (
        <text
          x={(width + marginLeft + marginRight) / 2}
          y={height - marginBottom + 15}
          textAnchor="middle"
          fontSize="12px"
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
