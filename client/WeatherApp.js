import React from 'react';
import ReactDOM from 'react-dom';

import './WeatherApp.scss';

class App extends React.Component {
    render() {
        return <p>Hello world!</p>;
    }
}

ReactDOM.render(<App/>, document.getElementById('react-root'))