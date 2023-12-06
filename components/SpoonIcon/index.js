import React from 'react';

const SVGComponent = ({ color = '#FCDA9A', ...props }) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 612 792"
    style={{
      enableBackground: 'new 0 0 612 792'
    }}
    xmlSpace="preserve"
    {...props}
  >
    <style type="text/css">{`\n\t.st0{fill-rule:evenodd;clip-rule:evenodd;}\n`}</style>
    <g>
      <path
        className="st0"
        style={{ fill: color }}
        d="M250.8,276.6c0.2-19.5,0.3-40.8-11.5-55.4C215.2,191.7,133.4,91.8,127,83.7c-1.8-2.3-4.5-0.4-3,2   c21.3,33.5,51.8,78.8,73.1,112.3c4.2,6.6-1.3,9-5.5,3.8c-25.8-30.2-58.6-74.1-84.4-104.4c-1.9-2.2-4.3-0.3-2.8,2   c21.7,33.2,50,80.3,71.6,113.7c3.6,5.6-2.6,9.9-6.6,4.6c-23.9-31.7-58.5-74.4-82.3-106.2c-1.7-2.2-4.3-0.6-2.9,1.9   c19.6,34.6,49.6,80.4,69.2,115c3.5,5.7-0.7,10-5.5,3.9c-24.2-31.5-56.3-75.6-80.5-107.1c-1.7-2.2-4.4-0.4-2.9,2.1   c5.4,8.8,71.3,119.9,90.8,152.6c9.6,16.1,29.7,23.3,48.1,29.8c25.2,8.8,38,23.3,53,45.2c68.2,99.8,115.8,202.5,180.8,305.8   c58.9,93.7,131.3,43,63.4-44.4c-74.9-96.4-155-176.2-225.5-274.5C259.6,320.3,250.5,303.3,250.8,276.6L250.8,276.6z"
      />
      <path
        className="st0"
        style={{ fill: color }}
        d="M455.3,96.5c56.5-21.4,91.5,3.1,90.7,63.5c-0.8,57.6-35.9,124-95.2,139.5c-18.1,4.7-35.3,5.2-52.2,12   c-11.1,4.4-20.5,11.5-27.4,21.3C297,437.5,247.8,545.6,179.4,654.4c-59,93.8-131.3,43.1-63.4-44.4   c78.9-101.5,163.6-184.7,236.7-290.3c6.8-9.9,10.3-21.1,10.6-33c0.6-18.1-4.9-34.5-6.6-53.1C351,172.7,401.4,116.9,455.3,96.5   L455.3,96.5z"
      />
    </g>
  </svg>
);

export default SVGComponent;