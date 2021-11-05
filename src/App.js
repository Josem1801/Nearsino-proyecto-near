import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import "./app.css";
import "./global.css";

import Layout from "./components/Layout";
import Card from "./components/Card";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  // after submitting the form, we want to show Notification

  const handleStart = () => {};
  useEffect(handleStart, []);
  const [showNotification] = React.useState(false);
  return (
    <Layout>
      <Card className="hero__header" height={50}>
        <span>Points: </span>
        <span
          onClick={() => {
            console.log(window.walletCollection);
          }}
        >
          {" "}
          Balance: {}
        </span>
      </Card>
      <Card height={400}>
        <button onClick={handleStart}>Play</button>
      </Card>
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
