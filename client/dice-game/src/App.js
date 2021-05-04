import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join';
import Play from './components/Play';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/play" exact component={Play} />
    </Router>
  );
}

export default App;
