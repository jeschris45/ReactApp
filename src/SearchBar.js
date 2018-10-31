import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class SearchBar extends Component {
    inputChanged(event){
        this.props.filterChanged.emit(event.target.value);
    }
    render(){
        return(
            <div className="searchBar">
                    <input placeholder="Type to filter" onChange={e=> this.props.filterChanged(e.target.value)}></input> 
            </div>
        )
    }

}

export default SearchBar;