import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import zalo from '../assets/Payment/zalo1.png'
import momo from '../assets/Payment/momo.png'
import paypal from '../assets/Payment/paypal1.png'
import apple from '../assets/Payment/apple1.png'
import { RadioButton } from 'react-native-paper';
import { formatPrice } from '../FormatPrice/Format';

const PayMethods = ({ navigation, route }) => {
  const { Name, LessImage, Lecture, Avatar, Price, Id, info, contact, selectedStudents,className ,classCourseId} = route.params;
  const [payment, setPayment] = React.useState('Momo');
  return (
    <View style={styles.Container}>
      <View style={{ marginTop: hp('1%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4%') }}>Select a payment method</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setPayment('Momo')} style={[styles.Account, { borderColor: payment === 'Momo' ? 'blue' : '#21212133', backgroundColor: payment === 'Momo' ? '#D9D9D933' : 'white' }]}>
          <Image source={momo} style={styles.PaymentIcon} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 600, color: '#212121CC', fontSize: wp('4%') }}>Momo E-wallet</Text>
            <Text style={{ fontWeight: 700, color: '#FF8A00', fontSize: wp('3.5%') }}>{contact.phoneNumber}</Text>
          </View>
          <RadioButton
            value="Momo"
            status={payment === 'Momo' ? 'checked' : 'unchecked'}
            onPress={() => setPayment('Momo')}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setPayment('Zalo')} style={[styles.Account, { borderColor: payment === 'Zalo' ? 'blue' : '#21212133', backgroundColor: payment === 'Zalo' ? '#D9D9D933' : 'white' }]}>
          <Image source={zalo} style={[styles.PaymentIcon, { width: wp('13%'), height: hp('6%'), marginLeft: wp('2.3%') }]} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 600, color: '#212121CC', fontSize: wp('4%') }}>Zalo E-wallet</Text>
            <Text style={{ fontWeight: 700, color: '#FF8A00', fontSize: wp('3.5%') }}>{contact.phoneNumber}</Text>
          </View>
          <RadioButton
            value="Zalo"
            status={payment === 'Zalo' ? 'checked' : 'unchecked'}
            onPress={() => setPayment('Zalo')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: hp('1%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4%'), marginVertical: hp('1%') }}>Voucher</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.Search}>
            <TextInput
              placeholder="Enter discount code"
            />
          </View>
          <View style={styles.Button}>
            <Text style={{ color: 'white', fontWeight: 500, fontSize: wp('4%') }}>Apply</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: hp('1%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4%'), marginVertical: hp('1%') }}>Order payment</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Class Code:</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Price</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Quantity</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Discount</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Total</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>{className}</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>{formatPrice(Price)}</Text>
            {/* <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>{parseFloat(Price.replace(/\./g, '').replace(',', '.')).toLocaleString('vi-VN')} đ</Text> */}
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>x{selectedStudents.length}</Text> 
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>0 đ</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>{formatPrice(Price * (selectedStudents.length))}</Text>
            {/* <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>{(Price * (selectedStudents.length)).toLocaleString('vi-VN')} đ</Text> */}
          </View>
        </View>
      </View>
      <View style={styles.Enroll}>
        <TouchableOpacity style={styles.Checkout} onPress={() => { navigation.navigate('ReviewSum', { Name, LessImage, Lecture, Avatar, Price, Id, payment, info, selectedStudents,className ,classCourseId}) }}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PayMethods

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  Search: {
    marginTop: hp('1%'),
    marginRight: wp('4%'),
    width: wp('60%'),
    height: hp('6.3%'),
    borderColor: '#EFEFEF',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('2.5%'),
    backgroundColor: 'white'
  },
  SearchIcon: {
    width: wp('6.3%'),
    height: hp('3.5%'),
    marginRight: wp('3%'),
  },
  PaymentIcon: {
    width: wp('17%'),
    height: hp('12%'),
    marginRight: wp('3%'),
  },
  Filter: {
    marginTop: hp('3.5%'),
    width: wp('13%'),
    height: hp('6.3%'),
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#EFEFEF'
  },
  Account: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    width: wp('90%'),
    marginTop: hp('2%'),
    borderRadius: 10,
    borderColor: '#21212133',
    height: hp('8%'),
    justifyContent: 'space-between'
  },
  TxtPay: {
    fontSize: wp('4%'),
    color: '#94867D',
    fontWeight: '500'
  },
  Button: {
    backgroundColor: "#1A9CB7",
    marginTop: hp('1%'),
    width: wp('25%'),
    height: hp('6.3%'),
    borderColor: '#EFEFEF',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Enroll: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0, width: wp('100%'),
    height: hp('10%'),
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    paddingLeft: wp('6.5%'),
    borderColor: '#e9f2eb',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Checkout: {
    borderWidth: 1,
    height: hp('7%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: hp('1%'), backgroundColor: '#327CF7',
    borderColor: '#e9f2eb'
  }
})