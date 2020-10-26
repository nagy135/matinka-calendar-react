import React, {useState} from 'react';
import './App.css';
import Reservation from "./components/Reservation"
import Login from "./components/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



const App = () => {
    const [logged, setLogged] = useState(false);
    return (
        <div className="App">
            <div className="container">
                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Rezervuj si hodinu</h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-calendar"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                <Router>
                    <Switch>
                        <Route path="/login">
                            <Login logIn={() => {setLogged(true)}} />
                        </Route>
                        <Route path="/">
                            { logged &&
                                <Reservation />
                            }
                            { !logged &&
                                <Login logIn={() => {setLogged(true)}} />
                            }

                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
