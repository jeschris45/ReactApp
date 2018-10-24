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
            <div className="row">
                <div className="col-md-10">
                    <input placeholder="Type to filter" onChange={e=> this.props.filterChanged(e.target.value)}></input> 
                </div>
            </div>
        )
    }

}

export default SearchBar;