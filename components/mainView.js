import React from 'react';
import { 
          StyleSheet, 
          Text, 
          View, 
          Button,
          Image,
          Modal,
          StatusBar,
          TextInput,
          Dimensions,
          TouchableOpacity,
          Platform,
          PickerIOS 
        } from 'react-native';
import TouchableWithoutFeedback from 'TouchableWithoutFeedback';
import Menu, {
                MenuContext,
                MenuOptions,
                MenuOption,
                MenuTrigger
              } from 'react-native-popup-menu';
import PickerAndroid from 'react-native-picker-android';
import Rating from 'react-native-easy-rating';
import * as Animatable from 'react-native-animatable';
import MapView from './map.js';
import commonStyle from './style.js';
import testData from'./data.js'

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

class mainViewCompo extends React.Component {
  constructor(props) {
    super(props);
    this.menuClick = this.menuClick.bind(this);
    this.showOverlayModal = this.showOverlayModal.bind(this);
    this.showTimeModal = this.showTimeModal.bind(this);
    this.showPersonModal = this.showPersonModal.bind(this);
    this.showNewPersonModal = this.showNewPersonModal.bind(this);
    this.showAddrModal = this.showAddrModal.bind(this);
    this.showNewAddrModal = this.showNewAddrModal.bind(this);
    this.showCartModal = this.showCartModal.bind(this);
    this.showAddItemModal = this.showAddItemModal.bind(this);
    this.showSubmitModal = this.showSubmitModal.bind(this);
    this.btnAnimEnded = this.btnAnimEnded.bind(this);
    this.state= {
                  isDropImg: 'drop',
                  isOverlayModal: true,
                  isTimeModal: false,
                  isPersonModal: false,
                  isNewPersonModal: false,
                  isAddrModal: false,
                  isNewAddrModal: false,
                  isCartModal: false,
                  isAddItemModal: false,
                  isSubmitModal: false,

                  countHandle: null,
                  count: null,
                  starCount: 3,
                  brands: testData.test,
                  brandIndex: 5
                }
  }
  menuClick(value){
    if(value == '3'){
      this.showSubmitModal(true);
    }
    else if(value == '2'){
      this.btnAnimEnded();
    }
  }
  showOverlayModal(visible){
    this.setState({isOverlayModal: visible});
  }
  showTimeModal(visible){
    this.setState({isTimeModal: visible});
  }
  showPersonModal(visible){
    this.setState({isPersonModal: visible});
  }
  showNewPersonModal(visible){
    this.setState({isNewPersonModal: visible});
  }
  showAddrModal(visible){
    this.setState({isAddrModal: visible});
  }
  showNewAddrModal(visible){
    this.setState({isNewAddrModal: visible});
  }
  showCartModal(visible){
    this.setState({isCartModal: visible});
  }
  showAddItemModal(visible){
    this.setState({isAddItemModal: visible});
  }
  showSubmitModal(visible){
    this.setState({isSubmitModal: visible});
  }
  btnAnimEnded(){
    this.setState({isDropImg: 'processing'});//image change
    //timer start
    this.setState({count: 10});
    this.setState({ countHandle: setInterval(timer, 1000) });
    var self = this;
    function timer(){
      self.setState({count: self.state.count-1});
      if (self.state.count <= 0)
      {
         clearInterval(self.state.countHandle);
         self.setState({ isDropImg: "delivering" });
         return;
      }
    }
  }
  render() {
    let CountDownText = null;
    const isDropImg = this.state.isDropImg;
    let DropElement = null;
    if(isDropImg == 'drop'){
      CountDownText = <Text style={styles.navbarText}>One swipe to order!</Text>;
      DropElement = 
        <TouchableWithoutFeedback  onPress ={()=>this.setState({isDropImg: 'dropAnimation'})}>
          <Image 
            source={require('../images/main_slide_button_letters.png')}
            style={styles.circleImg}>
          </Image>
        </TouchableWithoutFeedback>;
    }
    else if(isDropImg == 'dropAnimation'){
      CountDownText = <Text style={styles.navbarText}>One swipe to order!</Text>;
      DropElement = 
        <Animatable.Image 
          source={require('../images/main_slide_button_letters.png')}
          style={styles.circleImg} duration={300} easing="ease-out"
          animation="slideOutDown" iterationCount={2} direction="alternate"
          onAnimationEnd = {()=>this.btnAnimEnded()}
          >
        </Animatable.Image>;
    }
    else if(isDropImg == 'processing'){
      CountDownText = <Text style={styles.navbarText}>Swipe again within {this.state.count}s to cancel!</Text>;
      DropElement = 
        <TouchableWithoutFeedback  onPress ={()=>{clearInterval(this.state.countHandle); this.setState({isDropImg: 'drop'})}}>
          <Image 
            source={require('../images/main_processing_letters.png')}
            style={styles.circleImg}>
          </Image>
        </TouchableWithoutFeedback>;
    }
    else if(isDropImg == 'delivering'){
      CountDownText = <Text style={styles.navbarText}>Your order is on it's way!</Text>;
      DropElement = 
        <TouchableWithoutFeedback  onPress ={()=>this.setState({isDropImg: 'drop'})}>
          <Image 
            source={require('../images/main_delivering_letters.png')}
            style={styles.circleImg}>
          </Image>
        </TouchableWithoutFeedback>;
    }
    ////four button disable
    let profileContents = null;
    if(isDropImg == 'drop'){
      profileContents = 
        <View style={styles.btnView}>
          <TouchableOpacity onPress={()=>this.showTimeModal(true)}>
            <View style={styles.btnRow}>
              <Image style={styles.btnImg}
                source={require('../images/main_time_icon.png')}
              />
              <Text style={styles.btnText}>7:00pm - 9:00pm Today</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.showPersonModal(true)}>
            <View style={styles.btnRow}>
              <Image style={styles.btnImg}
                source={require('../images/main_delivery_icon.png')}
              />
              <Text style={styles.btnText}>Duong Vung</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.showAddrModal(true)}>
            <View style={styles.btnRow}>
              <Image style={styles.btnImg}
                source={require('../images/main_location_icon.png')}
              />
              <Text style={styles.btnText}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.showCartModal(true)}>
            <View style={styles.btnRow}>
              <Image style={styles.btnImg}
                source={require('../images/main_shoppingcart_icon.png')}
              />
              <Text style={styles.btnText}>150,000d for 13 items</Text>
            </View>
          </TouchableOpacity>
        </View>;
    }
    else{
      profileContents = 
        <View style={styles.btnView}>
          <View style={styles.btnRow}>
            <Image style={styles.btnImg}
              source={require('../images/main_time_icon_disabled.png')}
            />
            <Text style={styles.btnText}>7:00pm - 9:00pm Today</Text>
          </View>
          <View style={styles.btnRow}>
            <Image style={styles.btnImg}
              source={require('../images/main_delivery_icon_disabled.png')}
            />
            <Text style={styles.btnText}>Duong Vung</Text>
          </View>
          <View style={styles.btnRow}>
            <Image style={styles.btnImg}
              source={require('../images/main_location_icon_disabled.png')}
            />
            <Text style={styles.btnText}>Home</Text>
          </View>
          <View style={styles.btnRow}>
            <Image style={styles.btnImg}
              source={require('../images/main_shoppingcart_icon_disabled.png')}
            />
            <Text style={styles.btnText}>150,000d for 13 items</Text>
          </View>
        </View>;
    }

    return (
    	<View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
        <MenuContext>
          <View style={styles.navbar}>
            <View style={styles.menuView}></View>
            <View style={styles.navbarTextView}>
              {CountDownText}
            </View>
            <View style={styles.menuView}>
              <Menu onSelect={(value) => this.menuClick(value)}>
                <MenuTrigger>
                  <Text style={styles.menuIconText}>● ● ●</Text>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={1} style={styles.menuRow}>
                    <Image source={require('../images/setting.png')} style={styles.menuImg}/>
                    <Text style={styles.menuText}>App settings</Text>
                  </MenuOption>
                  <MenuOption value={2} style={styles.menuRow}>
                    <Image source={require('../images/history.png')} style={styles.menuImg}/>
                    <Text style={styles.menuText}>Order history</Text>
                  </MenuOption>
                  <MenuOption value={3} style={styles.menuRow}>
                    <Image source={require('../images/help.png')} style={styles.menuImg}/>
                    <Text style={styles.menuText}>Help</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View style={styles.mainView}>
            <View style={styles.dropView}>
              <Image source={require('../images/main_slider.png')} style={styles.bgImg}>
                {DropElement}
              </Image>
            </View>
            
            {profileContents}
            
          </View>
        </MenuContext>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isOverlayModal}
          onRequestClose={() => this.showOverlayModal(false)}
          >
          <TouchableOpacity style={styles.overlayContainer} onPress={()=>this.showOverlayModal(false)}>
            <View style={{flex: 0.1}}>
            </View>
            <View style={styles.overlayTextView}>
              <Text style={styles.overlayText}>Pull the <Text style={{fontFamily: 'Lato-Black'}}>Drop</Text> switch down and</Text>
              <Text style={styles.overlayText}>release to place your first order!</Text>
            </View>
            <View style={{flex: 0.1}}>
            </View>
            <View style={styles.overlayImgView}>
              <Image style={styles.overlayImg}
                source={require('../images/pull_down_finger_arrow.png')}
              />
            </View>
            <View style={{flex: 0.15}}>
            </View>
            <View style={styles.overlayBtnView}>
              <Text style={styles.overlayBtn}>Got it!</Text>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isTimeModal}
          onRequestClose={() => this.showTimeModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>Delivery anytime after</Text>
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
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => this.showTimeModal(false)}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showTimeModal(false)}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isPersonModal}
          onRequestClose={() => this.showPersonModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>Delivery Person</Text>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.mdBtnRow}>
                    <Image source={require('../images/info_button2.png')} style={styles.mdRowImg}/>
                    <Text style={styles.mdProfileText}>Duong Vung</Text>
                  </View>
                  <Text style={styles.mdText}>can delivery your</Text>
                  <Text style={styles.mdText}><Text style={{fontWeight: 'bold'}}>13 items</Text> to <Text style={{fontWeight: 'bold'}}>Home</Text></Text>
                  <Text style={styles.mdText}>for <Text style={{fontWeight: 'bold'}}>150,000d</Text></Text>
                  <Text style={styles.mdOrText}>Or</Text>
                </View>
                <TouchableOpacity onPress={()=> {this.showPersonModal(false); this.showNewPersonModal(true)}}>
                  <View style={styles.mdBtnRow}>
                    <Image source={require('../images/add_button2.png')} style={styles.mdRowImg}/>
                    <Text style={styles.mdBtnText}>Add a new delivery person</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => this.showPersonModal(false)}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showPersonModal(false)}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isNewPersonModal}
          onRequestClose={() => this.showNewPersonModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>New Delivery Person</Text>
                <View style={{}}>
                  <View style={styles.mdInput}>
                    <TextInput
                      placeholder="Name"
                      placeholderTextColor="#2196f3"
                      underlineColorAndroid='transparent'
                      style={styles.mdTextInput}
                    />
                    <TextInput
                      placeholder="Mobile"
                      placeholderTextColor="#2196f3"
                      underlineColorAndroid='transparent'
                      style={styles.mdTextInput}
                    />
                  </View>
                </View>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => {this.showNewPersonModal(false); this.showPersonModal(true)}}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => {this.showNewPersonModal(false); this.showPersonModal(true)}}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isAddrModal}
          onRequestClose={() => this.showAddrModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>Your Delivery Addresses</Text>
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
                <TouchableOpacity onPress={()=> {this.showAddrModal(false); this.showNewAddrModal(true)}}>
                  <View style={styles.mdBtnRow}>
                    <Image source={require('../images/add_button2.png')} style={[styles.mdRowImg, styles.mdSingleBtn]}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => this.showAddrModal(false)}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showAddrModal(false)}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isNewAddrModal}
          onRequestClose={() => this.showNewAddrModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>New Address</Text>
                <View style={{}}>
                  <View style={styles.mdInput}>
                    <TextInput
                      placeholder="Address label"
                      placeholderTextColor="#2196f3"
                      underlineColorAndroid='transparent'
                      style={styles.mdTextInput}
                    />
                    <View style={{
                                  borderRadius: 3,
                                  borderWidth: 1,
                                  borderColor: '#bbb',
                                  width: DeviceWidth*0.6,
                                  height: 40,
                                  margin: 10,
                                }}>
                      <MapView/>
                    </View>
                  </View>
                </View>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => {this.showNewAddrModal(false); this.showAddrModal(true)}}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => {this.showNewAddrModal(false); this.showAddrModal(true)}}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isCartModal}
          onRequestClose={() => this.showCartModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>Your Delivery Addresses</Text>
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
                <TouchableOpacity onPress={()=> {this.showCartModal(false); this.showAddItemModal(true)}}>
                  <View style={styles.mdBtnRow}>
                    <Image source={require('../images/add_button2.png')} style={[styles.mdRowImg, styles.mdSingleBtn]}/>
                  </View>
                </TouchableOpacity>
                <Text style={styles.cartInfoText}>Order total: 150,000d</Text>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => this.showCartModal(false)}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showCartModal(false)}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isAddItemModal}
          onRequestClose={() => this.showAddItemModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>Your Delivery Addresses</Text>
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
                <Text style={styles.cartInfoText}>Selection total: 40,000d</Text>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={[commonStyle.doubleBtn, commonStyle.mdBtnVr]} onPress={() => {this.showAddItemModal(false); this.showCartModal(true)}}>
                  <Text style={commonStyle.mdBtn}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => {this.showAddItemModal(false); this.showCartModal(true)}}>
                  <Text style={commonStyle.mdBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isSubmitModal}
          onRequestClose={() => this.showSubmitModal(false)}
          >
          <View style={commonStyle.mdViewContainer}>
            <View style={commonStyle.mdContainer}>
              <View style={commonStyle.mdContent}>
                <Text style={commonStyle.mdTitle}>Thank you for using Drop!</Text>
                <View style={{alignItems: 'center'}}>
                  
                  <Text style={styles.mdText}>To improve our service</Text>
                  <Text style={styles.mdText}>could you please rate the</Text>
                  <Text style={styles.mdText}>quality of your last delivery?</Text>
                  <Text style={styles.mdText}></Text>
                  <Text style={styles.mdText}></Text>
                  <Text style={styles.mdText}>The delivery was done by</Text>
                  <Text style={styles.mdText}></Text>
                  <Text style={styles.mdText}></Text>
                </View>
                <Text style={styles.mdProfileText}>Duong Vung</Text>
                <Rating
                  rating={this.state.starCount}
                  max={4}
                  iconWidth={40}
                  iconHeight={40}
                  iconSelected={require('../images/icon_star_selected.png')}
                  iconUnselected={require('../images/icon_star_unselected.png')}
                  onRate={(rating) => this.setState({rating: rating})}/>
              </View>
              <View style={commonStyle.mdBtnContainer}>
                <TouchableOpacity style={commonStyle.doubleBtn} onPress={() => this.showSubmitModal(false)}>
                  <Text style={commonStyle.mdBtn}>Submit rating</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      
    );
  }

}


export default mainViewCompo

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  overlayContainer:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
  },
  overlayTextView:{
    flex: .1,
    alignItems: 'center',
  },
  overlayText:{
    color: 'white',
    fontSize: 25,
    fontFamily: 'Lato-Medium',
  },
  overlayImgView:{
    flex: .4,
    alignItems: 'center',
  },
  overlayImg:{
    flex: 1,
    resizeMode: 'contain',
  },
  overlayBtnView:{
    flex: .15,
    alignItems: 'center',
  },
  overlayBtn:{
    color: 'white',
    fontSize: 25,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'white',
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 5,
  },
  navbar:{
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  navbarTextView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarText:{
    fontSize: 20,
    fontFamily: 'Lato-Medium',
    color: '#000000',
  },
  menuView:{
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  menuIconText:{
    color: '#333',
    fontSize: 15,
  },
  menuRow:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuImg:{
    width: 35,
    height: 35,
    marginRight: 10,
    resizeMode: 'stretch',
  },
  menuText:{
    fontSize: 15,
  },
  mainView:{
    backgroundColor: '#ededed',
    flex: 1,
    padding: 20,
  },
  dropView:{
    flex: .55,
    alignSelf: 'stretch',
    alignItems: 'center',
    
  },
  bgImg:{
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  circleImg:{
    width: 220,
    height: 220,
  },
  btnView:{
    flex: .45,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  btnRow:{
    height: 50,
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  btnImg:{
    width: 50,
    height: 50,
    marginRight: 10,
  },
  btnText:{
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  mdBtnRow:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  mdRowImg:{
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'stretch',
  },
  mdProfileText:{
    fontSize: 25,
    color: '#333333',
  },
  mdText:{
    color: '#333333',
    fontSize: 15,
  },
  mdOrText:{
    margin: 30,
    fontSize: 30,
  },
  mdBtnText:{
    color: '#333333',
    fontSize: 20,
    fontFamily: 'Lato-Regular',
  },
  mdSingleBtn:{
    marginRight: 0,
    marginTop: 10,
  },
  mdTextInput:{
    backgroundColor: '#ffffff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#bbb',
    width: DeviceWidth*0.6,
    height: 40,
    margin: 10,
  },
  cartInfoText:{
    fontSize: 18,
    color: '#333333',
    fontFamily: 'Lato-Medium',
  }
});