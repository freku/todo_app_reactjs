import React from "react";
import "./styles.css";

const SideBarButton = ({ active, icon, description, ...props }) => {
  return (
    <div {...props} className={`sidebar-button ${active ? "active" : ""}`}>
      {icon}
      <p className="sidebar-btn-desc">{description}</p>
    </div>
  );
};

export default SideBarButton;
