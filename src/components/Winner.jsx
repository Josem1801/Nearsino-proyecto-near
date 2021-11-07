import React from "react";
import PropTypes from "prop-types";

import "./winner.css";
function Winner({ winner }) {
  return (
    <div className="winner">
      {winner ? "You win 🎉" : "You lose, but you can try again :)"}
    </div>
  );
}
Winner.propTypes = {
  winner: PropTypes.number,
};
export default Winner;
