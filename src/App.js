import Navibar from './Features/Navibar';
import Titles from './Features/Titles';
import NewestStories from './Features/NewestStories';
import Books from './Features/Books'
import Write from './Features/Write';
import './App.css';

function App() {
  return (
    <main>
      <Navibar></Navibar>
      <Titles></Titles>
      <NewestStories></NewestStories>
      <Books></Books>
      <Write></Write>
    </main>
  );
}

export default App;
