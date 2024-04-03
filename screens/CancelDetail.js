import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import { getOrderById } from '../Api/Order';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const CancelDetail = ({ route, navigation }) => {
  const { Name, LessImage, Lecture, Status, Price, Payment, Child, Id } = route.params;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOrderDetail()
  }, [])
  const [data, setData] = useState([])
  const fetchOrderDetail = async () => {
    try {
      const orderDetail = await getOrderById(Id);
      if (orderDetail) {
        setData(orderDetail);
        setLoading(false);
      }
    } catch (error) {
    }
  };
  return (
    <View style={styles.Container}>
      <View style={styles.Course}>
        <Image source={LessImage} style={styles.CourseImage} />
        <Text></Text>
        <View>
          <View style={{
            borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, width: wp('35%'),
            backgroundColor: Status === 'Pending' ? '#1A9CB7' : Status === 'Success' ? '#6DCE63' : Status === 'Cancelled' ? 'red' : 'red',
          }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('3.1%'), textAlign: 'center', width: wp('30%') }}>Wait for approving</Text>
          </View>
          <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500' }}>{Name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
            <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
            <Text style={{
              fontWeight: 'bold',
              color: '#40BFFF',
              fontSize: wp('3.8%')
            }}>{Lecture}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
            <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
            <Text style={{
              fontWeight: 'bold',
              color: 'blue',
              fontSize: wp('3.8%')
            }}>{Price}</Text>
          </View>
        </View>
      </View>
      <View>
        <View >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Children Receive<Text style={{ color: 'red', fontWeight: '600' }}> ({data.numberChildren})</Text></Text>
            <View>
              {data.students && data.students.map((student, index) => (
                <Text key={index} style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>{student.studentName}</Text>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Receive Method</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500' }}>Zalo , Email</Text>
          </View>
        </View>
        <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
          <View>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Payment Method</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Voucher</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Amount</Text>
            <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Quantity</Text>
          </View>
          <View>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>{data.paymentType}</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>0 đ</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>{Price}</Text>
            <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>x{data.numberChildren}</Text>
          </View>
        </View>
        <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
          <View>
            <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700' }}>Total</Text>
          </View>
          <View>
            <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700' }}>{data.totalPrice} đ</Text>
          </View>
        </View>
        <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />
      </View>
      <View style={styles.Enroll}>
        <TouchableOpacity style={styles.Button}>
          <Text onPress={() => {
            navigation.navigate('Home');
          }} style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Back To Homepage</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CancelDetail

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%')
  },
  Course: {
    flexDirection: 'row',
    marginTop: hp('1.5%'),
    borderWidth: 2,
    width: wp('90%'),
    paddingHorizontal: hp('1%'),
    paddingVertical: wp('2%'),
    borderRadius: 10,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white'
  },
  CourseImage: {
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: 10,
    marginRight: wp('3%')
  },
  Name: {
    width: wp('50%'),
    fontWeight: 'bold',
    color: '#223263',
    fontSize: wp('3.7%')
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
  Button: {
    borderWidth: 1,
    height: hp('7%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: hp('1%'), backgroundColor: 'blue',
    borderColor: '#e9f2eb'
  },
}) 