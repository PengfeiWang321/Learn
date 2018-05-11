import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
                <div className="App-title"><Link to="/a">modulea</Link></div>
                <div className="App-title"><Link to="/b">moduleb</Link></div>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
                {this.props.children}
            </p>
        </div>
    );
  }
}

export default App;
