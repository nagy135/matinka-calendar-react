import React from 'react';
import logo from './logo.svg';
import './App.css';
import Reservation from "./components/Reservation"

function App() {
    return (
        <div className="App">
            <div className="container">
                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Rezervuj si hodinu</h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-calendar"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                <Reservation />
            </div>
        </div>
    );
}

export default App;
