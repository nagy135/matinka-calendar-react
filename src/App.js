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

    const logIn = () => {
        setLogged(true);
    };

    return (
        <div className="App">
            <div className="container">
                <Router>
                    <Switch>
                        <Route 
                            path="/login"
                            render={({ history}) => (
                                <div>
                                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
                                        Prihlás sa
                                    </h2>
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-lock"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    <Login
                                        logIn={() => {
                                            logIn();
                                            history.push('/');
                                        }} 
                                    />
                                </div>
                            )} />
                        <Route path="/">
                            <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
                                { logged ? "Vytvor alebo zmaz hodinu" : "Rezervuj si hodinu" }
                            </h2>
                            <div className="divider-custom">
                                <div className="divider-custom-line"></div>
                                <div className="divider-custom-icon"><i className="fas fa-calendar"></i></div>
                                <div className="divider-custom-line"></div>
                            </div>
                            <Reservation logged={logged}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
