import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import Home from './components/Home'

class App extends React.Component{

    render() {
        return (
            <div className="TwitterApp">
                <h2>Welcome to my twitter app!</h2>
                <Home />
            </div>
        );
    }

}

export default App;
