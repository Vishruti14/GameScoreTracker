import logo from './logo.svg';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Fetch from './Components/Fetch';
import HandleAddGame from './Components/HandleAddGame';
import Admin from './Components/Admin';
import './App.css';
import Leader from './Components/ViewLeaderBoard';
import UpdateUserDetails from './Components/UpdateUserDetails';

function App() {
  return (
    <Router>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/fetch" component={Fetch} />
        <Route path="/addgame" component={HandleAddGame} />
        <Route path="/admin" component={Admin} />
        <Route path="/viewleaderboard" component={Leader} />
        <Route path="/updateUser" component={UpdateUserDetails} />


    </Switch>
</Router>
  );
}

export default App;
