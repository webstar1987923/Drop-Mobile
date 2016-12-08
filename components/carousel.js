import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Carousel from 'react-native-carousel';
import PageOne from './pageOne.js';
import PageTwo from './pageTwo.js';
import PageThree from './pageThree.js';
import MainPage from './mainView.js';

const propTypes = {
  toRoute: PropTypes.func.isRequired,
};

class CarouselPage extends React.Component {
  constructor(props) {
    super(props);
    this.goSecondPage = this.goSecondPage.bind(this);
    this.goThirdPage = this.goThirdPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  goSecondPage() {
    this.refs.carousel.indicatorPressed(1);
  }
  goThirdPage() {
    this.refs.carousel.indicatorPressed(2);
  }
  nextPage() {
    this.props.toRoute({
      name: "A new screen",
      component: MainPage
    });
  }
  render() {
    return (
    	<Carousel 
        ref="carousel" 
        animate={false}
        indicatorSize={60}
        indicatorColor="#FDD835"
        inactiveIndicatorColor="#ffffff"
        indicatorAtBottom={true}
        indicatorOffset={50}
      >
        <PageOne goSecondPage={this.goSecondPage.bind(this)}/>
        <PageTwo goThirdPage={this.goThirdPage.bind(this)}/>
        <PageThree nextPage={this.nextPage.bind(this)}/>
        
      </Carousel>
      
    );
  }

}

CarouselPage.propTypes = propTypes;

export default CarouselPage



