import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class ListItems extends Component {
    change(event){
        console.log("Changing the option: ", event.target.value);
    }
    render(){
        return(
          <ul>
              <li></li>
          </ul>
        )
    }

}

export default ListItems;