import React from "react";
import PropTypes from "prop-types";
import "./floatingDescription.css";
function FloatingDescription({
  children,
  customComponent,
  description,
  style,
  ...props
}) {
  return (
    <>
      <div className="description">
        {children}
        {customComponent ? (
          customComponent
        ) : (
          <p className="description__text" {...props} style={style}>
            {description}
          </p>
        )}
      </div>
    </>
  );
}
FloatingDescription.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string.isRequired,
  positionPx: PropTypes.number,
  style: PropTypes.object,
  customComponent: PropTypes.node,
};
FloatingDescription.defaultProps = {
  position: "bottom",
  style: {
    bottom: 30,
    width: "fit-content",
  },
};
export default FloatingDescription;
