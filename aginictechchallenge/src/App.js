import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LocationList from './Components/LocationList';
import LocationInput from './Components/LocationInput';
import GetCoordination from './Components/GetCoordination';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Coordination Finder</h1>
        </header>
        <LocationInput />
        <GetCoordination />
        <LocationList />
      </div>
    );
  }
}

export default App;
