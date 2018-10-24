import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapComponent extends Component {
    markersList = [];
    componentDidMount(){
      console.log(React.createElement(Map));
      this.props.data.map(item=>{
          
          let temp = React.createElement(Marker, {
            name : item.venue.name, 
            address1:item.venue.location.formattedAddress[0],
            address2:item.venue.location.formattedAddress[1],
            onClick : this.onMarkerClick,
            position:{lat: item.venue.location.lat, lng: item.venue.location.lng}

          });
          this.markersList.push(temp);
      })
      console.log(this.markersList);
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    }; 

    render(){
        return(
            <div>
                <Map id="map" google={this.props.google} zoom={14} initialCenter={{
            lat: 34.1015,
            lng: -84.5194
          }}
                    style={{width: '100%', height: '50vh', position: 'relative'}}>
                    <div></div>
                    {this.props.data.map((item, index)=>
                        <Marker key={index} onClick={this.onMarkerClick} name={item.venue.name} 
                             address1={item.venue.location.formattedAddress[0]}
                             address2={item.venue.location.formattedAddress[1]}
                             position={{lat: item.venue.location.lat, lng: item.venue.location.lng}}
                    />
                    )}
                    

                    {/* {this.props.data.map((item, index)=>
                        <Marker key={index} onClick={this.onMarkerClick} name={item.venue.name} 
                             address1={item.venue.location.formattedAddress[0]}
                             address2={item.venue.location.formattedAddress[1]}
                             position={{lat: item.venue.location.lat, lng: item.venue.location.lng}}
                    />
                    )} */}
                    {this.markersList[0]}
                    
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div className="container">
          <div className="row"> 
           <div className="col-md-12" style={{'textAlign': 'center'}}>{this.state.selectedPlace.name}</div>
           </div>
         <div className="row">
            <div className="col-md-12" style={{'textAlign':'center'}}>
           {this.state.selectedPlace.address1}
            </div>
            <div className="col-md-12" style={{'textAlign':'center'}}>
           {this.state.selectedPlace.address2}
            </div>
         </div>
        </div>
        </InfoWindow>
           </Map>
            </div>
        )
    }

}


export default GoogleApiWrapper({
    apiKey: "AIzaSyD1LGPWP_J7k26kmZR4bLORijS7cNPTq-E"
  })(MapComponent)