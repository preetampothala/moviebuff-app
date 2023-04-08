import React, { useState } from "react";
import "./Tabs.css";

const Tabs = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="tabs">
      <div className="tab-titles">
        {props.tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-title ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="tab-content">{props.tabs[activeIndex]}</div>
    </div>
  );
};

export default Tabs;
