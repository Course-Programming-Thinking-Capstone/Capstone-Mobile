import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import background from '../assets/Login/giphy.gif'
import mail from '../assets/Login/email2.png'
import pass from '../assets/Login/padlock.png'
import user from '../assets/Login/user.png'
import warn from '../assets/Login/warning.png'
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
  validateForm,
} from '../Validate/Validation.js'

const SignUp = ({ navigation }) => {
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
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formHeight, setFormHeight] = useState(hp('50%'));

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignUp = () => {
    const { emailError, nameError, passwordError, confirmPasswordError, isValid } = validateForm(
      email,
      name,
      password,
      confirmPassword
    );

    setEmailError(emailError);
    setNameError(nameError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (isValid) {
      // Thực hiện hành động đăng ký
      // Ví dụ: Gửi dữ liệu đăng ký lên server
      // handleSubmit({ email, name, password });
      // Reset các trường nhập sau khi đăng ký thành công (nếu cần)
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
    }
  };
  const handleErrors = () => {
    if (emailError || nameError || passwordError) {
      return true; // Trả về true nếu có lỗi
    } else {
      return false; // Trả về false nếu không có lỗi
    }
  };

  return (
    <View style={styles.All}>
      <ImageBackground source={background} style={styles.backPic}>
        <View style={styles.Container}>
          <Text style={styles.Header}>Sign Up</Text>
          <Text style={styles.Title}>Hi,Create account to dicover new things</Text>
        </View>
        <View style={[styles.Form, { height: formHeight }]}>
          <View style={styles.Email}>
            <Image source={mail} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={() => setEmailError(validateEmail(email))}
            />
            {emailError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <View style={styles.Pass}>
            <Image source={user} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              onBlur={() => setNameError(validateName(name))}
            />
            {nameError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <View style={styles.Pass}>
            <Image source={pass} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => { setPassword(text) }}
              onBlur={() => {
                setPasswordError(validatePassword(password));
                ; setFormHeight(handleErrors() ? hp('60%') : hp('50%'));
              }
              }
            />
            {passwordError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <View style={styles.Pass}>
            <Image source={pass} style={styles.Icon} />
            <TextInput style={styles.EmailTitle}
              placeholder="Re-Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPasswordError(validateConfirmPassword(text, password));
                setConfirmPassword(text);
              }}
              onBlur={() => { setFormHeight(handleErrors() ? hp('60%') : hp('50%')); }}

            />
            {confirmPasswordError ? <Image source={warn} style={{ width: wp('4%'), height: hp('2%'), position: 'absolute', right: 20 }} /> : null}
          </View>
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

          <View style={styles.Button}>
            <TouchableOpacity onPress={()=>{navigation.navigate('KidHome')}}>
              <Text style={styles.LoginTxt}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.SignUp}>
            <Text style={{ color: 'white', fontSize: wp('4%') }}>Already have an account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.SignUpTitle}>Sign Up here</Text>
            </TouchableOpacity>
          </View>
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