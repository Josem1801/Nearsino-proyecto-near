import React from "react";
import "./hero.css";
import NearLogo from "../assets/logo-black.svg";
function Hero() {
  return (
    <div className="hero">
      <h2 className="hero__title">
        Comienza a jugar y obten hasta el doble de tu apuesta
      </h2>
      <span>
        Conectate con Near{" "}
        <img width={25} height={25} src={NearLogo} alt="Near Protocol" />
      </span>
    </div>
  );
}

export default Hero;
