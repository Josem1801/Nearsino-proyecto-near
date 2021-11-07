import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./app.css";
import "./global.css";
import confetti from "canvas-confetti";
import Layout from "./components/Layout";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import getConfig from "./config";
import Hero from "./components/Hero";
import GradientButton from "./components/GradientButton";
import Winner from "./components/Winner";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [amount, setAmount] = useState();
  const [bet, setBet] = useState();
  const [tickets, setTickets] = useState();
  const [reload, setReload] = useState(0);
  const [disabledBuy, setDisabledBuy] = useState(false);
  const [disabledPlay, setDisabledPlay] = useState(false);
  const [whoWin, setWhoWin] = useState();
  const [showWinner, setShowWinner] = useState(false);

  // after submitting the form, we want to show Notification
  const handleBuy = async (e) => {
    e.preventDefault();
    if (amount > 0) {
      setDisabledBuy(true);
      try {
        await window.contract.buyTickets({ amount: amount });
      } catch (error) {
        alert("Error en la trasaccion");

        console.log(error);
      } finally {
        setDisabledBuy(false);
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
  const handleBet = (e) => {
    setBet(Number(e.target.value));
  };
  const handlePlay = async () => {
    if (tickets - bet >= 0) {
      setDisabledPlay(true);
      try {
        const winner = await window.contract.playGame({
          accountId: window.accountId,
          amount: bet,
        });
        setWhoWin(winner);
        if (winner)
          confetti({
            particleCount: 500,
            spread: 200,
            origin: { y: 0.8 },
          });
        setShowWinner(true);
        setTimeout(() => {
          setShowWinner(false);
        }, 3000);
      } catch (error) {
        console.log(error);
        alert("Error al jugar");
      } finally {
        setDisabledPlay(false);
        setReload((prev) => prev + 1);
      }
    } else {
      alert("No tienes suficientes tickets");
    }
  };
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract
        .getTickets({ accountId: window.accountId })
        .then((tickets) => {
          setTickets(tickets);
        });
    }
  }, [reload]);
  return (
    <Layout>
      {!window.walletConnection.isSignedIn() ? (
        <Hero />
      ) : (
        <Card height={400} className="hero__isLogin-card">
          <span className="hero__tickets">Tickets: {tickets} 🎫</span>
          <div className="hero__play">
            <input
              onChange={handleBet}
              className="hero__btn-bet"
              type="number"
              name="tickets"
              placeholder="Bet"
            />
            <GradientButton
              onClick={handlePlay}
              gradients={gradientPlay}
              className="hero__play-btn"
            >
              {disabledPlay ? <Spinner /> : "Play"}
            </GradientButton>
          </div>

          <form className="hero__buy" onSubmit={handleBuy}>
            <input
              onChange={handleAmount}
              type="number"
              name="tickets"
              placeholder="Amount"
            />
            <button disabled={disabledBuy} className="hero__buy-btn button">
              {disabledBuy ? <Spinner /> : "Buy tickets"}
            </button>
          </form>
          {showWinner && <Winner winner={whoWin} />}
        </Card>
      )}
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
