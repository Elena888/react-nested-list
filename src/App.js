import React from 'react';
import Header from './components/Header'
import Continents from './components/Continents'

import './style.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Continents/>
            </div>
        );
    }
}

export default App;
