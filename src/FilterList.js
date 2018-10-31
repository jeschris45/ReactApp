import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class FilterList extends Component {

    render(){
        return(
            <div className="dropdown">
                <div className="col-md-12">
                    <select onChange={e=> this.props.onOptionChanged(e.target.value)}>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Coffee"> Coffee </option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>
            </div>
        )
    }

}

export default FilterList;