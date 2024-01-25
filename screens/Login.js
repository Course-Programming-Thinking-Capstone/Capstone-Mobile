import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import background from '../assets/Login/giphy.gif'
import ig from '../assets/Login/ig.png'
import face from '../assets/Login/face1.jpg' 
import google from '../assets/Login/google.png'
import mail from '../assets/Login/email2.png'
import pass from '../assets/Login/padlock.png'
import CheckBox from 'expo-checkbox';

const Login = ({ navigation }) => {
  // const [userName, setUsername] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // const [rePassword, setRePassword] = useState('');
  // const [password, setPassword] = useState('');
  // const handleSignUp = () => {
  //     if (password == rePassword) {
  //         axios.post("http://shoeshine-001-site1.ftempurl.com/api/users/register?role=2", {
  //             // Thêm các trường dữ liệu đăng ký tài khoản vào đây
  //             userName: userName,
  //             userEmail: userEmail,
  //             userPassword: password,
  //             confirmPassword: rePassword,
  //             // Các trường dữ liệu khác cần thiết
  //         })
  //             .then((response) => {
  //                 // Xử lý phản hồi từ máy chủ sau khi đăng ký
  //                 if (response.status === 200) {
  //                     // Đăng ký thành công, bạn có thể điều hướng đến màn hình khác
  //                     navigation.navigate('Login');
  //                 }
  //             })
  //             .catch((err) => {
  //                 Alert.alert('đăng kí thất bại !!!');
  //             });
  //     }
  //     else {
  //         Alert.alert("Password is not match !!!")
  //     }
  // };
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.All}>
      <ImageBackground source={background} blurRadius={1.3} style={styles.backPic}>
        <View style={styles.Container}>
          <Text style={styles.Header}>Log In</Text>
          <Text style={styles.Title}>Hi, Welcome back ,you've been missed</Text>
        </View>
        <View style={styles.Form}>
          <View style={styles.Email}>
            <Image source={mail} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              placeholder="Email"
            />
          </View>
          <View style={styles.Pass}>
            <Image source={pass} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginLeft:wp('7.3%'), marginTop: hp('2%') }}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={{ fontSize: wp('3.2%'), color: 'blue', fontWeight: 'bold', marginLeft: wp('2%') }}>Remember Pass</Text>
            </View>
            <Text style={{ fontSize: wp('3.2%'), color: 'blue', fontWeight: 'bold',marginRight:wp('6%') }}>Forgot Password</Text>
          </View>
          <View style={styles.Button}>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
              <Text style={styles.LoginTxt}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center' }}>
            <View style={{ height: 1, width: wp('27%'), backgroundColor: 'white' }} />
            <View>
              <Text style={{ width: wp('20%'), textAlign: 'center', color: 'white' }}>OR</Text>
            </View>
            <View style={{ width: wp('27%'), height: 1, backgroundColor: 'white' }} />
          </View>
          <View style={styles.Contact}>
            <TouchableOpacity >
              <Image style={styles.Image} source={ig}></Image>
            </TouchableOpacity>
            <TouchableOpacity >
              <Image style={{
                marginTop:hp('0.5%'),
                width: wp('13%'),
                height: hp('6%'),
                borderRadius: 10,
                alignSelf: 'center',
                marginLeft: wp('5%'),
                marginRight: wp('5%')
              }} source={face}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.Image} source={google}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.SignUp}>
            <Text style={{ marginTop: 10, color: 'white', fontSize: wp('4%') }}>Create your account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.SignUpTitle}>Sign Up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Login

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
    marginTop: hp('4%'),
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
    backgroundColor: 'white'
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
    color:'blue'
  },
})