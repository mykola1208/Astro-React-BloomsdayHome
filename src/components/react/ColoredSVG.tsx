import React from "react";
import { ReactSVG } from "react-svg";

const ColoredSVG = ({ src, color }) => {
  const beforeInjection = (svg) => {
    if(svg.querySelector("g")) {
      svg.querySelector("g").setAttribute("stroke", color); 
    }
    else {
      svg.querySelector("path").setAttribute("stroke", color); 
    }
  };

  return (
    <ReactSVG
      src={src}
      beforeInjection={beforeInjection}
      className="w-6 h-6 shrink-0" // Example of additional Tailwind CSS classes
    />
  );
};

export default ColoredSVG;
