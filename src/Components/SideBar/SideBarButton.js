import React from 'react';
import './styles.css';

const SideBarButton = (props) => {
  let { active, icon, description, ...rest } = props;

  return (
    <div {...rest} className={`sidebar-button ${active ? "active" : ""}`}>
      {icon}
      <p className="sidebar-btn-desc">{description}</p>
    </div>
  );
};

export default SideBarButton;