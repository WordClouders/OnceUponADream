import Navibar from "./Features/Navibar";
import Titles from "./Features/Titles";
import NewestStories from "./Features/NewestStories";
import Books from "./Features/Books";
import Write from "./Features/Write";
import "./App.css";
import { pairHashpack, contractSigningFunc } from "./hashconnect";

function App() {
  return (
    <main>
      <Navibar></Navibar>
      <Titles></Titles>
      <NewestStories></NewestStories>
      <Books></Books>
      <Write></Write>
      <button
        onClick={async () => {
          const saveData = await pairHashpack();
        }}
      >
        Pair wallet
      </button>
      <button onClick={contractSigningFunc}>Sign contract</button>
    </main>
  );
}

export default App;
