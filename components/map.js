import React, { Component } from 'react';
import  { 
          StyleSheet, 
          Text, 
          View, 
          Button, 
          Alert, 
          Dimensions, 
          TextInput, 
          TouchableOpacity
        } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;
var styles = StyleSheet.create({
  
  textInput:{
    backgroundColor: '#ffffff',
    borderRadius: 3,
    height: 38,
    alignSelf: 'stretch',
    fontFamily: 'Lato-Regular',
    color: "#2196f3",
    marginBottom: DeviceHeight*0.015,
  },
});
class GPlacesDemo extends Component {
  constructor(props) {
    super(props);
    this.state =  {
                    address:'',
                  };
  }     
  openSearchModal() {
    var self = this;
    RNGooglePlaces.openPlacePickerModal()
    .then((place) => { 
      self.setState({address: place.address});
        console.log(place);   
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
          <TextInput
            onFocus = {() => this.openSearchModal()}
            onChange = {() => this.openSearchModal()}
            placeholder="Your Address"
            placeholderTextColor="#2196f3"
            underlineColorAndroid='transparent'
            value={this.state.address}
            style={[styles.textInput]}
          />
       
    );
  }
}
export default GPlacesDemo;