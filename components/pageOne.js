import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import commonStyle from './style.js';

class PageOne extends React.Component {

  render() {
    return (
      <View style={commonStyle.pages}>
        <StatusBar
          backgroundColor="#2196f3"
          barStyle="light-content"
        />
        <View style={styles.welcomeView}>
          <Text style={[styles.welcomeText, commonStyle.text]}>Welcome to</Text>
        </View>
        <View style={styles.dropView}>
          <Text style={[styles.dropText, commonStyle.text]}>DROP!</Text> 
        </View>
        <View style={styles.commentView}>
          <Text style={[styles.commentText, commonStyle.text]}>Order from your favourite delivery services with just one click!</Text> 
        </View>
        <Text onPress={this.props.goSecondPage} style={commonStyle.Button}>Get Started</Text>
      </View>
    );
  }
}
export default PageOne

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  welcomeView: {
    height: DeviceHeight*0.12,
    marginTop: DeviceHeight*0.11,
  },
  welcomeText: {
    fontSize: 60,
    fontFamily: 'Lato-Thin'
    // backgroundColor: 'blue',
  },
  dropView:{
    height: DeviceHeight*0.22,
  },
  dropText:{
    fontSize: 100,
    fontFamily: 'Lato-Black',
  },
  commentView:{
    // backgroundColor: 'aqua',
    height: DeviceHeight*0.2,
  },
  commentText:{
    fontSize: 25,
    fontFamily: 'Lato-Light',
  }
});