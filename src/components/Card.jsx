import React from "react";
import "./card.css";
import PropTypes from "prop-types";
function Card({ children, className, height }) {
  return (
    <div style={{ height }} className={`card ${className}`}>
      {children}
    </div>
  );
}
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
};
export default Card;
