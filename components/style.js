import { StyleSheet, Dimensions} from 'react-native';

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

var commonStyle = StyleSheet.create({
	pages: {
    flex: 1,
    backgroundColor: '#2196f3',
	},
	Button: {
    height: 60,
    width: DeviceWidth,
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: '#ffffff',
    bottom: 0,
    color: '#2196f3',
    fontSize: 30,
    lineHeight: 48,
    // fontWeight: 'bold',
    fontFamily: 'Lato-Medium'
	},
	text:{
    color: '#ffffff',
    textAlign: 'center',
  },
  imageView:{
    marginTop: DeviceHeight*0.05,
    height: DeviceHeight*0.12,
    alignItems: 'center'
  },
  image:{
    resizeMode: 'stretch',
    height: 75,
    width: 75,
  },
  btnImage:{
    resizeMode: 'stretch',
    height: 40,
    width: 40,
    marginRight: 10,
	},
	////modal
  mdViewContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mdContainer:{
    backgroundColor: '#ededed',
    width: DeviceWidth*0.8,
    borderRadius: 8,
    alignItems: 'center',
  },
  mdContent:{
    padding: 15,
    alignItems: 'center',
  },
  mdTitle:{
    color: 'black',
    fontSize: 20,
    fontFamily: 'Lato-Medium',
    marginBottom: 15,
  },
  mdBtnContainer:{
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth : 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
  },
  doubleBtn:{
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mdBtnVr:{
    borderRightWidth : 1,
    borderRightColor: '#ccc',
  },
  mdBtn:{
    fontSize: 22,
    color: '#2196f3',
    fontFamily: 'Lato-Regular',
  }
});

export default commonStyle;