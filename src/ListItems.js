import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class ListItems extends Component {

    componentDidMount(){
        
    }
    componentDidUpdate(){
        console.log("The list items are: ", this.props.listVenues);
    }

    render(){
        return(
            <div>
            <ul className="list-group" onClick={e => this.listClicked(e.target.value)}>
                {this.props.listVenues.map(function(elem){
                    return <li key={elem.venue.id} className="list-group-item" value={"ID-" + elem.venue.id}>{elem.venue.name}</li>
                })}
            </ul>
          </div>
        )
    }

}

export default ListItems;