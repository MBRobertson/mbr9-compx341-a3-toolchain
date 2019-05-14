import React from 'react';

// Collect input for a city name, and trigger an event after focus changes
class CityInput extends React.Component {
    constructor() {
        super();

        this.state = {
            input: ''
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        return <span className='city-input'>
            <input type="text" value={this.state.input} onChange={this.onInputChange} onBlur={() => this.props.onUpdate(this.state.input)}/> 
        </span>;
    }
}

export default CityInput;
export { CityInput };