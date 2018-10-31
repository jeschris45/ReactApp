import React, { Component } from 'react';
import FilterList from './FilterList.js'
import ListItems from './ListItems.js';
import SearchBar from './SearchBar';
import registerServiceWorker from './registerServiceWorker';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  infoWindow;
   map;
   markers = [];
  state = {
    fullVenue : [],
    filteredVenue : []
  }
  filteredVenue = [];

  componentDidMount(){
    this.loadMap();
    this.getPlaces("Fast Food");
    console.log("Component DID MOUNT");
    registerServiceWorker();
    
  }
  componentDidUpdate(){

  }


  


  clearMarkers(){
    const length = this.markers.length;
    console.log("MArkers length", length);
    if(length> 0){
      for(var i = length-1; i >= 0; i--){
        console.log("Market at" + i , this.markers[i]);
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);
        console.log("Markers", this.markers);
      }
    }
  }

  getPlaces(queryString){
    const endpoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "N0PXDV0BSQ0TY3NQ55PX44F13LDAT5GHZZOWR0TQA3HJBZI1",
      client_secret: "NMHDV4DMIPBW13NXDTEHMESR1JAUADJRDHICMBBMIVDDF4UJ",
      near: "Duluth, GA",
      query: queryString,
      limit: 10,
      sortByDistance: 1,
      v: "20180323"
    }
    axios.get(endpoint + new URLSearchParams(parameters)).then((response)=>{
      console.log(response);
      let listOfVenues = response;
      if(listOfVenues){
        listOfVenues = listOfVenues.data.response.groups[0].items;
        if(Array.isArray(listOfVenues)){
          this.setState({
            fullVenue : listOfVenues,
            queryString : queryString
          })
          this.filteredVenue = this.state.fullVenue;
          this.createMarkers();
        }
      }
      
    }).catch(err=>console.log(err));
  }

  loadMap = ()=>{
    this.createGoogleMapScript();
    console.log("DONE CREATING SCRIPT");
    window.initMap = this.initMap;  // assiging the call back function of the google map script on a global level

  }
  initMap =()=>{
    console.log("CALLING");
     this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.0029, lng: -84.1446},
      zoom: 12
    });

    if(this.state.fullVenue.length> 0){
      console.log("Creating Markers");
    this.infoWindow = new window.google.maps.InfoWindow({
      maxWidth: 200,
      maxHeight: 200
    });
      this.createMarkers();
      
   }
   console.log(this.markers);
  }

  optionChanged(value){
    this.clearMarkers();
    this.getPlaces(value);
  }
  filterChanged(value){
    console.log("FILTER VALUE", value);
    this.clearMarkers();
    this.createMarkers(value);
  }

  createMarkers(value = null){
   let filteredVenue = this.state.fullVenue;
   if(value){
     filteredVenue =  this.state.fullVenue.filter((venue)=>{
      if (venue.venue.name.indexOf(value) > -1){
        return venue;
      }
    });
  }
  
    console.log("BEFORE CREATING MARKER", this.state.filteredVenue);
      filteredVenue.forEach(element => {
      console.log(window.document.google);
      if(window.google){
        var marker = new window.google.maps.Marker({
          position : {lat: element.venue.location.lat,
                      lng: element.venue.location.lng},
        })
        marker.set('id', element.venue.id);
        console.log(this.state);
        const self = this;
        marker.addListener('click', function(){
          console.log(self.state);
          console.log("Clicking on marker");
          self.infoWindow.open(self.map, marker);
          self.infoWindow.setContent(`<div class="container">
          <div class="row"> 
            <div class="col-md-12" style="text-align:center">${element.venue.name}</div>
          </div>
          <div class="row">
            <div class="col-md-12" style="text-align:center">
            ${element.venue.location.formattedAddress[0]} ${element.venue.location.formattedAddress[1]} 
            </div>
          </div>
        </div>`);
        })
        marker.setMap(this.map);
        this.markers.push(marker);
        this.setState({
          "filteredVenue" : filteredVenue
        })
      }
      

    });
  }

  listClicked(value){
   let markerClicked = this.searchforMarkervalue(value);
   window.google.maps.event.trigger(markerClicked, 'click');
  }

  searchforMarkervalue(value){
    for(var i = 0, len = this.markers.length; i < len; i++){
      if(this.markers[i].id === value){
        return this.markers[i];
      }
    }
    console.log("RETURNING NULL");
    return null;
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  render() {
    return (
      <div className="wrapper">
      <div className="header">
      <div className="header-text col-11">Neighborhood Map Project</div>
        <div id="hamburger-menu col-1" className="hamburger-menu">
          <span onClick={this.openNav}>&#9776;</span>
        </div>
      </div>
      
        <div id="mySidenav" className="sidenav">
          <a className="white-text">Food Venues</a>
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
          {/* <FilterList onOptionChanged={this.optionChanged.bind(this)}></FilterList> */}
          <SearchBar filterChanged={this.filterChanged.bind(this)}></SearchBar>
          <ListItems listVenues={this.state.filteredVenue} listClicked={this.listClicked.bind(this)}></ListItems>
        </div>
        <div id="main">
          <div id="map">
          </div>
        </div>
      </div>
    );
    
  }



  createGoogleMapScript(){
    let script = window.document.getElementsByTagName("script")[0];
    let scriptElement = window.document.createElement("script");
    scriptElement.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1LGPWP_J7k26kmZR4bLORijS7cNPTq-E&callback=initMap";
    scriptElement.async = true;
    scriptElement.defer = true;
    script.parentNode.insertBefore(scriptElement, script);
    var clientId = "N0PXDV0BSQ0TY3NQ55PX44F13LDAT5GHZZOWR0TQA3HJBZI1";
    var clientSecret = "NMHDV4DMIPBW13NXDTEHMESR1JAUADJRDHICMBBMIVDDF4UJ";
  }
}

export default App;

