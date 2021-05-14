import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join';
import Play from './components/Play';
import InvitedPerson from './components/InvitedPerson';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/play" exact component={Play} />
      <Route path="/invite" exact component={InvitedPerson} />
    </Router>
  );
}

export default App;
