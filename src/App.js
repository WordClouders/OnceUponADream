import Navibar from "./Features/Navibar";
import "./App.css";
import React, { useState } from "react";
import { pairHashpack, contractSigningFunc } from "./hashconnect";

function App() {
  const [pairingString, setPairingString] = useState("");
  // <p>{pairingString}</p>

  return (
    <main>
      <Navibar></Navibar>
      <button
        onClick={async () => {
          const saveData = await pairHashpack();
          setPairingString(saveData.pairingString);
        }}
      >
        Pair wallet
      </button>
      <button onClick={contractSigningFunc}>Pair wallet</button>
    </main>
  );
}

export default App;
