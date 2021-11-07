import React, { useState } from "react";
import { login, logout } from "../utils";
import PropTypes from "prop-types";
import GradientButton from "./GradientButton";
import Svgs from "./SvgsToBackground";
import NearLogo from "../assets/logo-white.svg";
function Layout({ children, className }) {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div className="container__svg">
        <Svgs typeSvg="1" width="80%" positionX="-15vw" positionY="0vh" />
        <Svgs typeSvg="2" width="90%" positionX="12vw" positionY="25vh" />
        <Svgs typeSvg="3" width="90%" positionX="50vw" positionY="45vh" />
      </div>
      <header>
        <h1>Nearsino</h1>

        {window.accountId ? (
          <span
            className="header__accountId"
            onClick={logout}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            {hover ? "Logout" : window.accountId}
          </span>
        ) : (
          <GradientButton tag="div" onClick={login}>
            Connect with Near{" "}
            <img src={NearLogo} width={25} height={25} alt="" />
          </GradientButton>
        )}
      </header>
      <main className={className}>{children}</main>
      <footer></footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Layout;
