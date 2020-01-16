import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import Home from './components/Home'

class App extends React.Component{

    render() {
        return (
            <div className="twitterApp">
                <h2 className="mainHeader">Welcome to my twitter app!</h2>
                <Home />
            </div>
        );
    }

}

export default App;
