import React from "react";
import "./hero.css";
import CasinoSvg from "../assets/casino.png";
function Hero() {
  return (
    <div className="hero">
      <div>
        <h2 className="hero__title">Apuesta y gana</h2>
        <p>¡Prueba tu suerte!</p>
      </div>
      <img width={300} height={300} src={CasinoSvg} alt="Near Protocol" />
    </div>
  );
}

export default Hero;
