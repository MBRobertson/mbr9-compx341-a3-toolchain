import React from 'react';

import './SearchBar.scss';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { text: '' }
        this.onSearch = this.onSearch.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
    }

    onTextChange(event) {
        this.setState({ text: event.target.value })
    }

    // Look out for when the enter key is pressed
    onKeyPress(event) {
        if (event.keyCode == 13) this.onSearch();
    }

    onSearch() {
        let text = this.state.text;
        this.setState({ text: '' })

        if (this.props.onSearch && text != '')
            this.props.onSearch(text)
    }

    render() {
        return (<div className='searchbar'>
            <input placeholder='Search by name...' type='text' value={this.state.text} onChange={this.onTextChange} onKeyDown={this.onKeyPress}/>
            <button onClick={this.onSearch}><i className='material-icons'>search</i></button>
        </div>);
    }
}

export default SearchBar;
export { SearchBar };