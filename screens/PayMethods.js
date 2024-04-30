import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import zalo from '../assets/Payment/zalo1.png'
import momo from '../assets/Payment/momo.png'
import paypal from '../assets/Payment/paypal1.png'
import apple from '../assets/Payment/apple1.png'
import { RadioButton } from 'react-native-paper';
import { formatPrice } from '../FormatPrice/Format';
import { SelectList } from 'react-native-dropdown-select-list';
import { getVoucher } from '../Api/Voucher';

const PayMethods = ({ navigation, route }) => {
  const { classCourseId, courseData, classInfo, selectedStudents } = route.params;
  const [payment, setPayment] = React.useState('Momo');
  const [selected, setSelected] = React.useState('0');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  console.log("test log:", selectedVoucher);
  const data = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
  ]


  const [voucher, setVoucher] = useState([]);
  useEffect(() => {
    fetchvoucher();
  }, []);
  const fetchvoucher = async () => {
    try {
      const voucherData = await getVoucher();
      if (voucherData) {
        setVoucher(voucherData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [selectedDiscountAmount, setSelectedDiscountAmount] = useState(null);

  return (
    <View style={styles.Container}>
      <View style={{ marginTop: hp('1%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4%') }}>Select a payment method</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setPayment('Momo')} style={[styles.Account, { borderColor: payment === 'Momo' ? 'blue' : '#21212133', backgroundColor: payment === 'Momo' ? '#D9D9D933' : 'white' }]}>
          <Image source={momo} style={styles.PaymentIcon} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 600, color: '#212121CC', fontSize: wp('4%') }}>Momo E-wallet</Text>
            <Text style={{ fontWeight: 700, color: '#FF8A00', fontSize: wp('3.5%') }}>0393103426</Text>
          </View>
          <RadioButton
            value="Momo"
            status={payment === 'Momo' ? 'checked' : 'unchecked'}
            onPress={() => setPayment('Momo')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: hp('1%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4%'), marginVertical: hp('1%') }}>Voucher</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: wp('63%'),
            height: hp('7%'),
            marginTop: hp('1.5%'),
            marginRight: wp('3%'),
          }}>
            <SelectList
              setSelected={(value) => {
                const selectedVoucher = voucher.find((item) => item.discountAmount === value);
                setSelectedVoucher(selectedVoucher);
              }}
              data={voucher.map((item, index) => ({
                key: item.discountAmount,
                value: `KidsPro${index + 1} - ${formatPrice(item.discountAmount)}`,
              }))}
              save="key" // Save the key (discountAmount) instead of the value
              search={false}
              defaultOption={{ key: null, value: 'Select voucher' }}
              dropdownStyles={{
                backgroundColor: 'white',
                zIndex: 20,
                height: hp('15%'),
              }}
              dropdownTextStyles={{ color: 'black', fontSize: wp('4%') }}
              inputStyles={{ color: 'black', fontSize: wp('4%') }}
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
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Price</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Quantity</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Discount</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '400', fontSize: wp('3.5%') }}>Total</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>{formatPrice(courseData.price)}</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>x {selectedStudents.length}</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>
              {selectedVoucher ? formatPrice(selectedVoucher.discountAmount) : '0 đ'}
            </Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', fontSize: wp('3.5%') }}>
              {selectedVoucher ? formatPrice((courseData.price) * (selectedStudents.length) - (selectedVoucher.discountAmount)) : formatPrice((courseData.price) * (selectedStudents.length))}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Enroll}>
        <TouchableOpacity style={styles.Checkout} onPress={() => {
          navigation.navigate('ReviewSum', {
            classCourseId, courseData, classInfo, selectedStudents, payment
            , voucherId: selectedVoucher ? selectedVoucher.id : null
            , voucherDis: selectedVoucher ? selectedVoucher.discountAmount : null
          })
        }}>
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