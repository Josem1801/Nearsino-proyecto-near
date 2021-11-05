import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import "./app.css";
import "./global.css";

import Layout from "./components/Layout";
import Card from "./components/Card";

import getConfig from "./config";
import Hero from "./components/Hero";
import GradientButton from "./components/GradientButton";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  // after submitting the form, we want to show Notification
  const handleBuy = () => {
    window.contract.buyTickets({ amount: 20 }).then((result) => {
      console.log(result);
    });
  };
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      console.log(window.accountId);
      window.contract
        .getTickets({ accountId: window.accountId })
        .then((tickets) => {
          console.log(tickets);
        });
    }
  }, []);
  const [showNotification] = React.useState(false);
  return (
    <Layout>
      {!window.walletConnection.isSignedIn() ? (
        <Hero />
      ) : (
        <div>
          <Card className="hero__header" height={40}>
            <span>Points: {0}</span>
          </Card>
          <Card height={320} className="hero__isLogin-card">
            <GradientButton gradients={gradientPlay} className="hero__play">
              Play
            </GradientButton>
            <button onClick={handleBuy} className="hero__buy">
              {" "}
              Buy tickets
            </button>
          </Card>
        </div>
      )}
      {showNotification && <Notification />}
    </Layout>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;
  return (
    <aside>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: in contract:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}

const gradientPlay = [
  "rgba(172,0,134,0.4962359943977591) 0%",
  "rgba(124,63,228,0.30015756302521013) 25%",
  "rgba(3,119,255,0.29735644257703087) 52%",
  "rgba(11,11,12,0.7035189075630253) 88%",
];
