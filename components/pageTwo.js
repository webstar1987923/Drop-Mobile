import React from 'react';
import { 
          StyleSheet,
          Text,
          View,
          Image,
          Dimensions,
          TextInput,
          TouchableOpacity,
          Modal,
          Platform,
          PickerIOS 
        } from 'react-native';
import PickerAndroid from 'react-native-picker-android';
import commonStyle from './style.js';
import testData from'./data.js'

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

class PageTwo extends React.Component {
  constructor(props) {
    super(props);
    this.toSecondPage = this.toSecondPage.bind(this);
    this.showBrandModal = this.showBrandModal.bind(this);
    this.showDeliveryModal = this.showDeliveryModal.bind(this);
    this.showProfileModal = this.showProfileModal.bind(this);
    this.state ={
                  isSecondPage: false,
                  isBrandModal: false,
                  isDeliveryModal: false,
                  isProfileModal: false,

                  brands: testData.test,
                  brandIndex: 5
                };
  }
  toSecondPage(visible) {
    this.setState({isSecondPage: visible});
  }
  showBrandModal(visible) {
    this.setState({isBrandModal: visible});
  }
  showDeliveryModal(visible) {
    this.setState({isDeliveryModal: visible});
  }
  showProfileModal(visible) {
    this.setState({isProfileModal: visible});
  }


  render() {
    const isSecondPage = this.state.isSecondPage;
    let currentPage = null;
    if(!isSecondPage){
      currentPage = 
        <View>
          <View style={commonStyle.imageView}>
            <Image style={commonStyle.image}
              source={require('../images/scooter.png')}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={[commonStyle.text, styles.title]}>Add your regular</Text>
            <Text style={[commonStyle.text, styles.title]}>delivery person</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder  = "Delivery person's name"
              placeholderTextColor = "#2196f3"
              underlineColorAndroid = 'transparent'
              style={[styles.textInput]}
            />
            <TextInput
              placeholder  = "Delivery person's mobile"
              placeholderTextColor = "#2196f3"
              underlineColorAndroid = 'transparent'
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View style={styles.buttonDiv}>
                <Image style={commonStyle.btnImage}
                  source={require('../images/add_button.png')}
                />
                <Text style={[commonStyle.text, styles.btnText]}>Add as many as you need</Text>
              </View>
            </TouchableOpacity>
            <Text style={[commonStyle.text, styles.title]}>OR</Text>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() =>this.toSecondPage(true)}>
              <View style={styles.buttonDiv}>
                <Image style={commonStyle.btnImage}
                  source={require('../images/search.png')}
                />
                <Text style={[commonStyle.text, styles.btnText]}>Let us recomment someone</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    }
    else{
      currentPage = 
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.backBtnView} onPress={()=>this.toSecondPage(false)}>
            <View >
              <Text style={[commonStyle.text, styles.backText]}>☚ Back</Text>
            </View>
          </TouchableOpacity>
          <View style={commonStyle.imageView}>
            <Image style={commonStyle.image}
              source={require('../images/scooter.png')}
            />
          </View>
          <View style={styles.littleTextView}>
            <Text style={[commonStyle.text, styles.littleText]}>We recommend</Text>
          </View>
          <TouchableOpacity style={styles.nameDiv}>
            <View style={styles.buttonDiv}>
              <Image style={commonStyle.btnImage}
                source={require('../images/info_button.png')}
              />
              <Text style={[commonStyle.text, styles.nameText]}>Duong Vung</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.littleTextView}>
            <Text style={[commonStyle.text, styles.littleText]}>for delivering</Text>
          </View>
          <View style={styles.littleTextView}>
            <Text style={[commonStyle.text, styles.littleText]}>Aquatonic in Dong Da, Hanoi</Text>
          </View>
          <TouchableOpacity style={styles.bigBtnDiv} onPress={() => this.showBrandModal(true)}>
            <View style={styles.buttonDiv}>
              <Image style={commonStyle.btnImage}
                source={require('../images/drink_button.png')}
              />
              <Text style={[commonStyle.text, styles.bigBtnText]}>Change product brand</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigBtnDiv} onPress={() => this.showDeliveryModal(true)}>
            <View style={styles.buttonDiv}>
              <Image style={commonStyle.btnImage}
                source={require('../images/change_delivery_button.png')}
              />
              <Text style={[commonStyle.text, styles.bigBtnText]}>Change delivery area</Text>
            </View>
          </TouchableOpacity>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isBrandModal}
            onRequestClose={() => this.showBrandModal(false)}
            >
            <View style={commonStyle.mdViewContainer}>
              <View style={commonStyle.mdContainer}>
                <View style={commonStyle.mdContent}>
                  <Text style={commonStyle.mdTitle}>Choose a product brand</Text>
                  <View style={{height: 200}}>
                    <Picker
                        selectedValue={this.state.brandIndex}
                        
                        onValueChange={(brandIndex) => this.setState({brandIndex})}>
                        {this.state.brands.map((brand, brandIndex) => (
                            <PickerItem
                                key={brandIndex}
                                value={brandIndex}
                                label={brand}
                            />
                        ))}
                    </Picker>
                  </View>
                </View>
                <View style={commonStyle.mdBtnContainer}>
                  <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => this.showBrandModal(false)}>
                    <Text style={commonStyle.mdBtn}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showBrandModal(false)}>
                    <Text style={commonStyle.mdBtn}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isDeliveryModal}
            onRequestClose={() => this.showDeliveryModal(false)}
            >
            <View style={commonStyle.mdViewContainer}>
              <View style={commonStyle.mdContainer}>
                <View style={commonStyle.mdContent}>
                  <Text style={commonStyle.mdTitle}>Choose a delivery area</Text>
                  <View style={{height: 200}}>
                    <Picker
                        selectedValue={this.state.brandIndex}
                        
                        onValueChange={(brandIndex) => this.setState({brandIndex})}>
                        {this.state.brands.map((brand, brandIndex) => (
                            <PickerItem
                                key={brandIndex}
                                value={brandIndex}
                                label={brand}
                            />
                        ))}
                    </Picker>
                  </View>
                </View>
                <View style={commonStyle.mdBtnContainer}>
                  <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => this.showDeliveryModal(false)}>
                    <Text style={commonStyle.mdBtn}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => {this.showDeliveryModal(false);this.showProfileModal(true)}}>
                    <Text style={commonStyle.mdBtn}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isProfileModal}
            onRequestClose={() => this.showProfileModal(false)}
            >
            <View style={commonStyle.mdViewContainer}>
              <View style={commonStyle.mdContainer}>
                <View style={commonStyle.mdContent}>
                  <Text style={commonStyle.mdTitle}>Duong Vung's Profile</Text>
                  <View style={styles.mdRow}>
                    <Image style={styles.mdRowImg}
                      source={require('../images/profile_location.png')}
                    />
                    <Text style={styles.mdRowText}>54 Thai thinh street,Nga Tu So, Dong Da, Hanoi</Text>
                  </View>
                  <View style={styles.mdRow}>
                    <Image style={styles.mdRowImg}
                      source={require('../images/profile_delivery.png')}
                    />
                    <Text style={styles.mdRowText}>432 deliveries in 3 months</Text>
                  </View>
                  <View style={styles.mdRow}>
                    <Image style={styles.mdRowImg}
                      source={require('../images/profile_product_list.png')}
                    />
                    <Text style={styles.mdRowText}>Product list</Text>
                  </View>
                  <View style={{height: 200}}>
                    <Picker
                        selectedValue={this.state.brandIndex}
                        
                        onValueChange={(brandIndex) => this.setState({brandIndex})}>
                        {this.state.brands.map((brand, brandIndex) => (
                            <PickerItem
                                key={brandIndex}
                                value={brandIndex}
                                label={brand}
                            />
                        ))}
                    </Picker>
                  </View>
                </View>
                <View style={commonStyle.mdBtnContainer}>
                  <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showProfileModal(false)}>
                    <Text style={commonStyle.mdBtn}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
    }
    return (
      <View style={commonStyle.pages}>
      	{currentPage}
        <Text onPress={this.props.goThirdPage} style={commonStyle.Button}>Done</Text>
      </View>

    );
  }
}
export default PageTwo

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({    
  titleView:{
    marginTop: DeviceHeight*0.02,
    height: DeviceHeight*0.15,
  },
  title:{
    fontSize: 33,
    fontFamily: 'Lato-Regular'
  },
  inputView:{
    height: DeviceHeight*0.18,
    alignItems: 'center',
  },
  textInput:{
    backgroundColor: '#ffffff',
    borderRadius: 3,
    width: DeviceWidth*0.8,
    height: 38,
    fontFamily: 'Lato-Regular',
    color: "#2196f3",
    marginBottom: DeviceHeight*0.03,
    // backgroundImage: "url(../images/scooter.png)"
  },
  buttonView:{
    height: DeviceHeight*0.25,
    justifyContent: 'space-between',
  },
  buttonDiv:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText:{
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    marginBottom: 5
  },
  // secondpage
  backBtnView:{
    position: 'absolute',
    left: 10,
    top: 10,
    
  },
  backText:{
    fontSize: 20,
    fontFamily: 'Lato-Medium'
  },
  littleTextView:{
    height: DeviceHeight*0.05,
    justifyContent: 'center',
  },
  littleText:{
    fontSize: 18,
    fontFamily: 'Lato-Light'
  },
  nameDiv: {
    height: DeviceHeight*0.1,
    justifyContent: 'center',
  },
  nameText:{
    fontSize: 35,
    marginTop: -7,
  },
  bigBtnDiv:{
    height: DeviceHeight*0.07,
    marginTop: DeviceHeight*0.08,
    width: 320,
    flexDirection: 'row',
  },
  bigBtnText:{
    fontSize: 25,
    fontFamily: 'Lato-Regular',
    marginBottom: 5,
  },
  mdRow:{
    margin: 15,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  mdRowImg:{
    width: 20,
    height: 20,
    resizeMode: 'stretch',
    marginRight: 10
    // backgroundColor: 'red',

  },
  mdRowText:{
    fontSize: 15,
    // backgroundColor: 'blue',
  }
});