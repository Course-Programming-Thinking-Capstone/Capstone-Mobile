import { StyleSheet, View, Image, TouchableOpacity, ImageBackground, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import cong from '../assets/Lesson/cong2.jpg'
import Back from '../assets/Profile/back1.jpg'
import teacher from '../assets/Lesson/teacher1.png'
import right from '../assets/HomePage/right.png'
import atm from '../assets/Profile/atm.png'
import process from '../assets/Profile/process.png'
import people from '../assets/Profile/people.png'
import logoutIcon from '../assets/Profile/logout.png'
import { logout } from '../Api/Log'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Profile = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleLogout = () => {
    logout(navigation);
  };
  return (
    <View style={styles.Container}>
      <ImageBackground source={Back} style={{ width: wp('100%'), height: hp('40%') }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: wp('6%'), paddingRight: wp('6%'), marginTop: hp('5%') }}>
        </View>
        <View style={styles.DetailForm}>
        </View>
      </ImageBackground>
      <View style={styles.Avt}>
        <TouchableOpacity activeOpacity={1}>
          <View >
            <Image source={cong} style={styles.CircleMen} />
          </View>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontSize: wp('5%'), marginTop: hp('1%'), fontWeight: '500' }}>Thành Công</Text>
      </View>
      <View style={{ paddingLeft: wp('5%'), paddingRight: wp('5%') }}>
        <TouchableOpacity activeOpacity={1}>
          <View style={{
            flexDirection: 'row', backgroundColor: '#e9f2eb', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('2%'), shadowColor: 'black',
            shadowOpacity: 0.9,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 20,
            elevation: 5,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderColor: '#e9f2eb', borderRadius: 10, borderWidth: 2, width: wp('12%'), height: hp('6%'), backgroundColor: 'blue', alignItems: 'center', marginLeft: wp('2%'), justifyContent: 'center' }}>
                <Image source={people} style={{ width: wp('7.5%'), height: hp('4.5%') }} />
              </View>
              <Text style={{ fontSize: wp('4.5%'), fontWeight: '500', alignSelf: 'center', marginLeft: wp('5%') }}>Account Detail</Text>
            </View>
            <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1}>
          <View style={{
            flexDirection: 'row', backgroundColor: '#e9f2eb', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('2%'), shadowColor: 'black',
            shadowOpacity: 0.9,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 20,
            elevation: 5,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderColor: '#e9f2eb', borderRadius: 10, borderWidth: 2, width: wp('12%'), height: hp('6%'), backgroundColor: '#78a1e3', alignItems: 'center', marginLeft: wp('2%'), justifyContent: 'center' }}>
                <Image source={atm} style={{ width: wp('7.5%'), height: hp('4.5%') }} />
              </View>
              <Text style={{ fontSize: wp('4.5%'), fontWeight: '500', alignSelf: 'center', marginLeft: wp('5%') }}>Payment Methods</Text>
            </View>
            <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('ChildProcess') }}>
          <View style={{
            flexDirection: 'row', backgroundColor: '#e9f2eb', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('2%'), shadowColor: 'black',
            shadowOpacity: 0.9,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 20,
            elevation: 5,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderColor: '#e9f2eb', borderRadius: 10, borderWidth: 2, width: wp('12%'), height: hp('6%'), backgroundColor: 'red', alignItems: 'center', marginLeft: wp('2%'), justifyContent: 'center' }}>
                <Image source={process} style={{ width: wp('8.6%'), height: hp('4.5%') }} />
              </View>
              <Text style={{ fontSize: wp('4.5%'), fontWeight: '500', alignSelf: 'center', marginLeft: wp('5%') }}>My child's process</Text>
            </View>
            <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('5%') }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ borderColor: '#e9f2eb', borderRadius: 10, borderWidth: 2, width: wp('13%'), height: hp('6.5%'), backgroundColor: 'orange', alignItems: 'center', marginLeft: wp('2%'), justifyContent: 'center' }}>
              <Image source={logoutIcon} style={{ width: wp('8.5%'), height: hp('4%') }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isModalVisible} transparent={true} statusBarTranslucent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <View style={styles.Popup}>
            {/* <View style={{ alignItems: 'center' }}>
                <Image source={warn} style={{ width: wp('22.5%'), height: hp('10%') }} />
              </View> */}
            <Text style={{ fontSize: wp('5%'), textAlign: 'center', marginTop: hp('1%'), fontWeight: '700', color: '#FF8A00' }}>Do you want to logout ?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('3.5%') }}>
              <TouchableOpacity style={[styles.Btn, { marginRight: wp('5%') }]} onPress={toggleModal}>
                <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={[styles.Btn, { backgroundColor: 'red' }]}>
                <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  CircleMen: {
    width: wp('28%'),
    height: hp('14%'),
    borderRadius: 70,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: 'blue'
  },
  DetailForm: {
    backgroundColor: 'white',
    position: 'absolute',
    top: hp('25%'), width: wp('100%'),
    height: hp('68.5%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  Avt: {
    marginVertical: hp('2%'),
    position: 'absolute',
    top: hp('16%'),
    alignSelf: 'center',
  },
  Popup: {
    backgroundColor: '#FCEFC9',
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 10,
    justifyContent: 'center'
  },
  Btn: {
    backgroundColor: '#40BFFF',
    height: hp('5.5%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})