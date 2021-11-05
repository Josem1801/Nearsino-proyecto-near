import React from "react";
import PropTypes from "prop-types";

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
      <CustomTag {...props} className={`button ${className ? className : ""}`}>
        {children}
      </CustomTag>
      <style jsx>{`
        .button {
          background: linear-gradient(${degree}deg, ${listOfGradients});
        }
        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: fit-content;
          background-size: ${hover ? 270 : 100}% auto;
          color: white;
          font-size: 14px;
          border: none;
          border-radius: 7px;
          padding: 5px 8px;
          cursor: pointer;
          transition: 0.3s ease-in-out;
        }

        ${hover ? ".button" : "none"}:hover {
          background-position: right center; /* change the direction of the change here */
          color: #fff;
          text-decoration: none;
        }
      `}</style>
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
