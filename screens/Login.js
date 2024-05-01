import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import background from '../assets/Login/giphy.gif'
import mail from '../assets/Login/email2.png'
import pass from '../assets/Login/padlock.png'
import CheckBox from 'expo-checkbox';
import Loading from '../Loading/Loading'
import { login } from '../Api/Log'
import logo from '../assets/kidLogo.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import ErrorModal from '../Alert/Alert';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const textInputRef = useRef(null);
  const textInputRef1 = useRef(null);

  const handleLogin = async () => {
    try {
      await login(email, password, navigation, setLoading, setEmail, setPassword, setModalVisible, setError);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setError(null);
  };

  return (
    <View style={styles.All}>
      <ImageBackground source={background} blurRadius={1.3} style={styles.backPic}>
        <View style={{ alignItems: 'center', marginTop: isSmallPhone || isSmallTablet ? hp('10%') : hp('15%'), }}>
          <Image source={logo} style={{
            height: hp('20%'), width: isSmallPhone || isSmallTablet ? wp('34%') : wp('32%'),
          }} />
        </View>
        <View style={styles.Form}>
          <View style={styles.Container}>
            <Text style={styles.Header}>Log In</Text>
            <Text style={styles.Title}>Hi, Welcome back, you've been missed</Text>
          </View>
          <TouchableOpacity
            style={styles.Email}
            activeOpacity={1}
            onPress={() => textInputRef.current.focus()}
          >
            <Image source={mail} style={styles.Icon} />
            <TextInput
              ref={textInputRef}
              style={{ flex: 1, marginLeft: wp('3%') }}
              placeholder="Email or Account"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom:hp('2.5%')}} onPress={() => textInputRef1.current.focus()} activeOpacity={1}>
            <View style={styles.Pass}>
              <Image source={pass} style={styles.Icon} />
              <TextInput
                ref={textInputRef1}
                style={styles.EmailTitle}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={text => setPassword(text)}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.Button}>
            <TouchableOpacity onPress={handleLogin}>
              {loading ? (
                <Loading />
              ) : (
                <Text style={styles.LoginTxt}>Log In</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.SignUp}>
            <Text style={{ marginTop: 10, color: 'white', fontSize: wp('4%') }}>Create your account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('SignUp'), setEmail(''), setPassword('') }}>
              <Text style={styles.SignUpTitle}>Sign Up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <ErrorModal visible={modalVisible} errorMessage={error && error.response && error.response.data && error.response.data.message} onClose={handleCloseModal} />
    </View>
  );
};


export default Login

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    marginBottom: hp('1%')
  },
  Header: {
    fontSize: isSmallPhone || isSmallTablet ? wp('7%') : wp('9%'),
    fontWeight: 'bold',
    color: 'white',
  },
  Title: {
    color: 'white',
    fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'),
    marginBottom: hp('1%')
  },
  Pic: {
    width: wp('31%'),
    height: hp('19%')
  },
  backPic: {
    width: wp('100%'),
    height: hp('110%'),
  },
  All: {
    alignSelf: 'center'
  },
  Name: {
    marginTop: hp('2%'),
    marginLeft: wp('4%'),
    width: wp('81.5%'),
    height: hp('6.5%'),
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('3%'),
    backgroundColor: 'white',
  },
  EmailTitle: {
    marginLeft: wp('2.5%')
  },
  Email: {
    marginLeft: wp('4%'),
    width: wp('81.5%'),
    height: hp('6.5%'),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('3%'),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 10,
  },
  EmailTitle: {
    marginLeft: wp('2.5%')
  },
  Pass: {
    marginTop: hp('2%'),
    marginLeft: wp('4%'),
    width: wp('81.5%'),
    height: hp('6.5%'),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('3%'),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 10,
  },
  Icon: {
    width: 20,
    height: 20
  },
  Button: {
    height: hp('6.5%'),
    width: wp('81.5%'),
    borderWidth: 2,
    borderRadius: 30,
    alignSelf: 'center',
    borderColor: 'blue',
    marginLeft: wp('0.5%'),
    backgroundColor: 'blue'
  },
  SignUp: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  SignUpTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginTop: hp('1.4%'),
    fontSize: wp('4%')
  },
  Form: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    width: wp('90%'),
    marginLeft: wp('5%'),
    height: hp('50%'),
    borderRadius: 20,
    alignContent: 'center',
    paddingTop: hp('4%'),
    borderColor: 'white',
    borderWidth: 1
  },
  LoginTxt: {
    marginTop: hp('1.5%'),
    fontSize: wp('4%'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  Contact: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: wp('1.5%'),
  },
  Image: {
    width: wp('14.5%'),
    height: hp('7%'),
    borderRadius: 10,
    alignSelf: 'center',
    marginLeft: wp('5%'),
    marginRight: wp('5%')
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
    color: 'blue'
  },
})