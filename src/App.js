import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./app.css";
import "./global.css";

import Layout from "./components/Layout";
import Card from "./components/Card";

import getConfig from "./config";
import Hero from "./components/Hero";
import GradientButton from "./components/GradientButton";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [amount, setAmount] = useState();
  const [tickets, setTickets] = useState();
  const [reload, setReload] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [disabledPlay, setDisabledPlay] = useState(false);
  const [whoWin, setWhoWin] = useState();
  // after submitting the form, we want to show Notification
  const handleBuy = async (e) => {
    e.preventDefault();
    console.log("Estoy intentando comprar");
    setDisabled(true);
    if (amount > 0) {
      try {
        const result = await window.contract.buyTickets({ amount: amount });
        console.log(result);
      } catch (error) {
        alert("Error en la trasaccion");
        console.log(error);
      } finally {
        setDisabled(false);
        alert("Tickets agregados correctamente");
        setReload((prev) => prev + 1);
      }
    } else {
      alert("Ingresa una cantidad valida");
    }
  };
  const handleAmount = (e) => {
    setAmount(Number(e.target.value));
  };
  const handlePlay = async () => {
    if (tickets - amount > 0) {
      setDisabledPlay(true);
      try {
        window.contract
          .playGame({ accountId: window.accountId, amount: amount })
          .then((winner) => {
            setWhoWin(winner);
          });
      } catch (error) {
        console.log(error);
        alert("Error la jugar");
      } finally {
        setDisabledPlay(false);
      }
    }
  };
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      console.log(window.accountId);
      window.contract
        .getTickets({ accountId: window.accountId })
        .then((tickets) => {
          setTickets(tickets);
        });
    }
  }, [reload]);
  const [showNotification] = React.useState(false);
  return (
    <Layout>
      {!window.walletConnection.isSignedIn() ? (
        <Hero />
      ) : (
        <Card height={400} className="hero__isLogin-card">
          <span className="hero__tickets">Tickets: {tickets}</span>
          <GradientButton
            onClick={handlePlay}
            gradients={gradientPlay}
            className="hero__play"
          >
            Play
          </GradientButton>
          {whoWin
            ? "Congratulations, you win"
            : "Sorry, but you can try  again"}
          <form className="hero__buy" onSubmit={handleBuy}>
            <input
              onChange={handleAmount}
              type="number"
              name="tickets"
              placeholder="Amount"
            />
            <button disabled={disabled} className="hero__buy-btn button">
              {" "}
              Buy tickets
            </button>
          </form>
        </Card>
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
