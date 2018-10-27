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
    handleClickEvent(event){
        event.target.siblin
        this.props.listClicked(event.target.getAttribute('value'));
    }

    render(){
        return(
            <div>
            <ul className="list-group" onClick={this.handleClickEvent.bind(this)}>
                {this.props.listVenues.map(function(elem){
                    return <li key={elem.venue.id} className="list-group-item list-group-item-action" value={ elem.venue.id}>{elem.venue.name}</li>
                })}
            </ul>
          </div>
        )
    }

}

export default ListItems;