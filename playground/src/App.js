import logo from './imgs/profile.jpg';
import './styles/App.css';
import './styles/bulma.min.css'
import './files/playground'
import {main} from './files/playground'

function App() {
  document.title = '🎲Playground'
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Playground</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={main} className="button is-warning">patatra</button>
      </header>
    </div>
  );
}

export default App;
