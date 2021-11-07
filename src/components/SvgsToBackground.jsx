import React from "react";
import PropTypes from "prop-types";
function Svgs({ typeSvg, positionX, positionY, width, height, color }) {
  if (typeSvg !== "1" && typeSvg !== "2" && typeSvg !== "3") return;
  return (
    <>
      <span className={`svg-${typeSvg}`}>
        {typeSvg == "1" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1932 1910"
          >
            <g filter="url(#filter0_f_49:8)">
              <path
                fill={color ? color : "#6215afc5"}
                fillRule="evenodd"
                d="M985.598 510.64c89.222-10.143 145.912 102.86 219.232 160.187 74.83 58.506 200.75 78.139 214.12 178.643 13.92 104.591-114.95 160.96-156.26 256.23-32.63 75.24.39 182.26-57.19 236.01-57.76 53.91-144.72 15.46-219.902 22.64-85.113 8.13-170.731 59.6-249.213 22.15-85.136-40.63-143.81-131.12-178.768-226.39-36.792-100.25-70.408-223.155-20.275-316.013 49.788-92.217 178.931-67.024 259.389-126.877 75.264-55.988 98.735-196.334 188.867-206.58z"
                clipRule="evenodd"
              ></path>
            </g>
            <defs>
              <filter
                id="filter0_f_49:8"
                width="1908"
                height="1890"
                x="12"
                y="10"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_49:8"
                  stdDeviation="250"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        )}
        {typeSvg == "2" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1726 1646"
          >
            <g filter="url(#filter0_f_46:3)">
              <path
                fill={color ? color : "#006B79"}
                fillRule="evenodd"
                d="M874.396 538.409c51.88-6.484 84.848 65.761 127.484 102.412 43.51 37.404 116.74 49.956 124.51 114.211 8.09 66.867-66.84 102.907-90.87 163.812-18.97 48.108.23 116.526-33.25 150.886-33.587 34.47-84.155 9.89-127.874 14.48-49.493 5.19-99.28 38.1-144.916 14.16-49.507-25.98-83.626-83.83-103.954-144.735-21.394-64.097-40.942-142.672-11.789-202.038 28.951-58.957 104.047-42.85 150.833-81.116 43.766-35.795 57.415-125.521 109.826-132.072z"
                clipRule="evenodd"
              ></path>
            </g>
            <defs>
              <filter
                id="filter0_f_46:3"
                width="1528"
                height="1569"
                x="99"
                y="38"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_46:3"
                  stdDeviation="250"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        )}
        {typeSvg == "3" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1813 1993"
          >
            <g filter="url(#filter0_f_49:17)">
              <path
                fill={color ? color : "#0D0549"}
                fillRule="evenodd"
                d="M923.529 532.668c77.521-10.598 126.791 107.483 190.501 167.387 65.02 61.135 174.44 81.651 186.06 186.672 12.09 109.291-99.89 168.193-135.78 267.743-28.36 78.63.33 190.46-49.7 246.62-50.19 56.33-125.751 16.16-191.081 23.66-73.958 8.49-148.355 62.27-216.551 23.14-73.979-42.45-124.963-137.01-155.34-236.56-31.969-104.76-61.18-233.186-17.617-330.217 43.262-96.362 155.481-70.037 225.394-132.58 65.4-58.504 85.795-205.158 164.114-215.865z"
                clipRule="evenodd"
              ></path>
            </g>
            <defs>
              <filter
                id="filter0_f_49:17"
                width="1789"
                height="1930"
                x="12"
                y="32"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_49:17"
                  stdDeviation="250"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        )}
      </span>
      <style jsx>{`
        .svg-${typeSvg} {
          position: absolute;
          width: ${width};
          height: ${height};
          left: ${positionX};
          z-index: 0;
        }
        @media (max-width: 600px) {
          .svg-${typeSvg} {
            width: calc(${width} * 1.5);
            top: ${positionY};
            left: auto;
          }
        }
      `}</style>
    </>
  );
}

Svgs.propTypes = {
  typeSvg: PropTypes.oneOf(["1", "2", "3"]).isRequired,
  positionX: PropTypes.string,
  positionY: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export default Svgs;
