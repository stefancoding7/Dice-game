import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './components/Join';
import Play from './components/Play';
import InvitedPerson from './components/InvitedPerson';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/"  exact component={Join} />
          <Route path="/play"  exact component={Play} />
          <Route path="/invite" exact component={InvitedPerson} />
          <Route  component={NotFound}/>
      </Switch>
      
    </Router>
  );
}

export default App;
