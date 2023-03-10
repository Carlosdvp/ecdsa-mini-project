import { useState } from "react";
import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        balance={balance}
        setBalance={setBalance}
      />
      <Transfer 
        address={address}
        privateKey={privateKey}
        setBalance={setBalance}
      />
    </div>
  );
}

export default App;
