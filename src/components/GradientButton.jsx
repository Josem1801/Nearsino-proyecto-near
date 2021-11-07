import React from "react";
import PropTypes from "prop-types";
import "./gradientButton.css";
function GradientButton({
  children,
  gradients,
  degree,
  hover,
  className,
  tag,
  ...props
}) {
  let listOfGradients = gradients.join(", ");
  const CustomTag = `${tag}`;
  return (
    <>
      <CustomTag
        {...props}
        style={{
          background: ` linear-gradient(${degree}deg, ${listOfGradients})`,
        }}
        className={`button ${hover ? "hover" : ""} ${
          className ? className : ""
        }`}
      >
        {children}
      </CustomTag>
    </>
  );
}

GradientButton.propTypes = {
  gradients: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  degree: PropTypes.number,
  hover: PropTypes.bool,
  className: PropTypes.string,
  tag: PropTypes.string,
};
GradientButton.defaultProps = {
  gradients: [
    "rgba(64, 121, 173, 1) 0%",
    "rgba(125, 49, 202, 0.6110819327731092) 45%",
    "rgba(64, 121, 173, 1) 100%",
  ],
  tag: "button",
  degree: 35,
  hover: true,
};

export default GradientButton;
