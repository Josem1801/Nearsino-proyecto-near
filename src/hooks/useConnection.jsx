import { useEffect, useState } from "react";

function useConnection() {
  const [user, setUser] = useState();
  const connectNearWallet = () => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      // window.contract is set by initContract in index.js
      window.contract
        .getGreeting({ accountId: window.accountId })
        .then((greetingFromContract) => {
          console.log(greetingFromContract);
          setUser(greetingFromContract);
        });
    }
  };
  useEffect(() => {
    connectNearWallet();
  }, []);
  return { user, connectNearWallet };
}

export default useConnection;
