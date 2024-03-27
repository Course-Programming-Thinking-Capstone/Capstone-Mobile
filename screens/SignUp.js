import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import React, { useState, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import background from '../assets/Login/giphy.gif'
import mail from '../assets/Login/email2.png'
import pass from '../assets/Login/padlock.png'
import user from '../assets/Login/user.png'
import warn from '../assets/Login/warning.png'
import { SignUpForm } from '../Api/Log'
import Loading from '../Loading/Loading'
import { showAlert } from '../Alert/Alert'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
  validateForm,
} from '../Validate/Validation'
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formHeight, setFormHeight] = useState(hp('50%'));
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const rePassRef = useRef(null);

  const handleSignUp = () => {
    SignUpForm(email, name, password, confirmPassword, navigation, setLoading, setEmail, setName, setPassword, setConfirmPassword);
  };
  return (
    <View style={styles.All}>
      <ImageBackground source={background} style={styles.backPic}>
        <View style={styles.Container}>
          <Text style={styles.Header}>Sign Up</Text>
          <Text style={styles.Title}>Hi,Create account to dicover new things</Text>
        </View>
        <View style={[styles.Form, { height: formHeight }]}>
          <TouchableOpacity style={styles.Email} activeOpacity={1}
            onPress={() => emailRef.current.focus()} >
            <Image source={mail} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              ref={emailRef}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={() => setEmailError(validateEmail(email))}
            />
            {emailError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </TouchableOpacity>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TouchableOpacity style={styles.Pass}
            activeOpacity={1}
            onPress={() => nameRef.current.focus()}>
            <Image source={user} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              ref={nameRef}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {nameError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </TouchableOpacity>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <TouchableOpacity style={styles.Pass}
            activeOpacity={1}
            onPress={() => passRef.current.focus()}>
            <Image source={pass} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              ref={passRef}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => { setPassword(text) }}
            />
            {passwordError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </TouchableOpacity>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <TouchableOpacity style={styles.Pass}
            activeOpacity={1}
            onPress={() => rePassRef.current.focus()}>
            <Image source={pass} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              ref={rePassRef}
              placeholder="Re-Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              onBlur={() => setConfirmPasswordError(validateConfirmPassword(confirmPassword, password))}
            />
            {confirmPasswordError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </TouchableOpacity>
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

          <View style={styles.Button}>
            <TouchableOpacity onPress={handleSignUp}>
              {loading ? (
                <Loading />
              ) : (
                <Text style={styles.LoginTxt}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.SignUp}>
            <Text style={{ color: 'white', fontSize: wp('4%') }}>Already have an account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.SignUpTitle}>Sign Up here</Text>
            </TouchableOpacity>
          </View>
          {/* <AlertNotificationRoot>
            <TouchableOpacity
              onPress={() =>
                Dialog.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: 'Success',
                  textBody: 'Congrats! this is dialog box success',
                  button: 'close',
                })
              }
            >
              <Text></Text>
            </TouchableOpacity>
          </AlertNotificationRoot> */}
        </View>
      </ImageBackground>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('1%')
  },
  Header: {
    fontSize: wp('12%'),
    fontWeight: 'bold',
    color: 'white',
    marginTop: hp('20%')
  },
  Title: {
    color: 'white',
    fontSize: wp('4.5%'),
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
    marginTop: hp('1.5%'),
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
    backgroundColor: 'white'
  },
  EmailTitle: {
    marginLeft: wp('2.5%')
  },
  Pass: {
    marginTop: hp('1%'),
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
    backgroundColor: 'white'
  },
  Icon: {
    width: 20,
    height: 20
  },
  Button: {
    marginTop: hp('2%'),
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
    marginTop: hp('1%')
  },
  SignUpTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    fontSize: wp('4%')
  },
  Form: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    width: wp('90%'),
    marginLeft: wp('5%'),
    borderRadius: 20,
    alignContent: 'center',
    paddingTop: hp('1%'),
    borderColor: 'white',
    borderWidth: 1
  },
  LoginTxt: {
    marginLeft: wp('33%'),
    marginTop: hp('1.5%'),
    fontSize: wp('4%'),
    color: 'white',
    fontWeight: 'bold'
  },
  Contact: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: wp('3.5%')
  },
  Image: {
    marginTop: hp('3%'),
    width: wp('14.5%'),
    height: hp('7%'),
    borderRadius: 10,
    alignSelf: 'center',
    marginLeft: wp('5%'),
    marginRight: wp('5%')
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5%'),
    marginLeft: wp('10%'),
    marginTop: hp('0.5%')
  },
})