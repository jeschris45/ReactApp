import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class ListItems extends Component {

    render(){
        return(
            <div>
            <ul className="list-group">
                {this.props.listVenues.map(function(elem){
                    <li key={elem.venue.id} className="list-group-item">{elem.venue.name}</li>
                })}
            </ul>
          </div>
        )
    }

}

export default ListItems;