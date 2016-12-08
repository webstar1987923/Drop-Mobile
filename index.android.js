import Router from 'react-native-simple-router';
import React from 'react';
import { AppRegistry, StyleSheet, Text } from 'react-native';
import Carousel from'./components/carousel.js'


const firstRoute = {
  name: 'carousel-page',
  component: Carousel,
};

// The Router wrapper
class Drop extends React.Component {

  render() {
    return (
      <Router
        hideNavigationBar
        noStatusBar={true}
        firstRoute={firstRoute}
        
      />
    );
  }
}

AppRegistry.registerComponent('Drop', () => Drop);
