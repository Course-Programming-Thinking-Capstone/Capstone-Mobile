import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import right from '../assets/HomePage/right.png'
import lesson from '../assets/Profile/book.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import boy from '../assets/Profile/boy.png'
import { getStudentDetail } from '../Api/Children';
import * as Progress from 'react-native-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const ChildDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [student, setStudent] = useState([])
  useEffect(() => {
    fetchKid();
  }, []);
  const fetchKid = async () => {
    try {
      const studentDetail = await getStudentDetail(id);
      if (studentDetail) {
        setStudent(studentDetail);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  return (
    <View style={styles.Container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
        <Image source={boy} style={styles.CircleMen} />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: wp('1%') }}>
              <Text style={{ textAlign: 'center', fontWeight: '500' }}>Name</Text>
              <Text style={{ textAlign: 'center', width: wp('20%'), fontSize: isSmallPhone || isSmallTablet ? wp('3%') : wp('3.5%') }}>{student.fullName}</Text>
            </View>
            <View style={{ marginLeft: wp('3%') }}>
              <Text style={{ textAlign: 'center', fontWeight: '500' }}>Age</Text>
              <Text style={{ textAlign: 'center', width: wp('20%'), fontSize: isSmallPhone || isSmallTablet ? wp('3%') : wp('3.5%') }}>{student.age} years old</Text>
            </View>
            <View style={{ marginLeft: wp('3%') }}>
              <Text style={{ textAlign: 'center', fontWeight: '500' }}>Email</Text>
              <Text style={{ textAlign: 'center', width: wp('25%'), fontSize: isSmallPhone || isSmallTablet ? wp('3%') : wp('3.5%') }}>lili@gmail.com</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: hp('1%'), alignItems: 'center' }}>
            <View style={{ marginLeft: wp('1%') }}>
              <Text style={{ textAlign: 'center', fontWeight: '500' }}>Birthday</Text>
              <Text style={{ textAlign: 'center', width: wp('20%'), fontSize: isSmallPhone || isSmallTablet ? wp('3%') : wp('3.5%') }}>{student.dateOfBirth}</Text>
            </View>
            <View style={{ marginLeft: isSmallPhone || isSmallTablet ? wp('7%') : wp('8%'), alignItems: 'center' }}>
              <Text style={{ fontWeight: '500' }}>Gender</Text>
              <Text style={{ width: wp('12%'), fontSize: isSmallPhone || isSmallTablet ? wp('3%') : wp('3.5%'), marginLeft: wp('1%') }}>{student.gender}</Text>
            </View>
            <View style={{ marginLeft: isSmallPhone || isSmallTablet ? wp('7.5%') : wp('8.2%') }}>
              <Text style={{ textAlign: 'center', fontWeight: '500' }}>Password</Text>
              <Text style={{ textAlign: 'center', width: wp('20%'), fontSize: isSmallPhone || isSmallTablet ? wp('3%') : wp('3.5%') }}>12345678</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ borderColor: '#1A9CB7', borderWidth: 1, borderStyle: 'dashed', width: wp('90%'), marginTop: hp('2%') }}></View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4.5%') }}>Total number of courses</Text>
        <View style={styles.Circle}>
          <Text style={{ color: '#FF8A00', fontWeight: '500', fontSize: wp('10%') }}>2</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('StudyProcess') }}>
        <View style={{
          flexDirection: 'row', backgroundColor: 'white', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('0.5%'), borderWidth: 1, shadowColor: 'black',
          shadowOpacity: 0.9,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 20,
          elevation: 5,
          backgroundColor: '#e9f2eb',
          borderColor: '#e9f2eb',
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: wp('3%') }}>
              <Image source={lesson} style={{ width: wp('8%'), height: hp('4%') }} />
            </View>
            <Text style={{ fontSize: wp('4.5%'), alignSelf: 'center', marginLeft: wp('5%'), width: wp('51%') }}>Program with Python</Text>
            <Progress.Circle
              animated={true}
              progress={0.7}
              size={35}
              showsText={true}
              color="#FF8A00"
              thickness={3}
              textStyle={{ fontSize: 10, color: 'red', fontWeight: '800' }}
              formatText={() => '40%'}
              borderWidth={0.5}
            />
          </View>
          <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{
          flexDirection: 'row', backgroundColor: 'white', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('0.5%'), borderWidth: 1, shadowColor: 'black',
          shadowOpacity: 0.9,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 20,
          elevation: 5,
          backgroundColor: '#e9f2eb',
          borderColor: '#e9f2eb',
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: wp('3%') }}>
              <Image source={lesson} style={{ width: wp('8%'), height: hp('4%') }} />
            </View>
            <Text style={{ fontSize: wp('4.5%'), alignSelf: 'center', marginLeft: wp('5%'), width: wp('51%') }}>Program with Scratch</Text>
            <Progress.Circle
              animated={true}
              progress={0.8}
              size={35}
              showsText={true}
              color="#FF8A00"
              thickness={3}
              textStyle={{ fontSize: 10, color: 'red', fontWeight: '800' }}
              formatText={() => '80%'}
              borderWidth={0.6}
            />
          </View>
          <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
        </View>
      </TouchableOpacity>
      <View style={{ borderColor: '#1A9CB7', borderWidth: 1, borderStyle: 'dashed', width: wp('90%'), marginTop: hp('2%') }}></View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
        <Text style={{ fontWeight: '500', fontSize: wp('4.5%') }}>Total number of certificates</Text>
        <View style={styles.Circle}>
          <Text style={{ color: '#FF8A00', fontWeight: '500', fontSize: wp('10%') }}>1</Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={{
          flexDirection: 'row', backgroundColor: 'white', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('0.5%'), borderWidth: 1, shadowColor: 'black',
          shadowOpacity: 0.9,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 20,
          elevation: 5,
          backgroundColor: '#e9f2eb',
          borderColor: '#e9f2eb',
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: wp('3%') }}>
              <Image source={lesson} style={{ width: wp('8%'), height: hp('4%') }} />
            </View>
            <Text style={{ fontSize: wp('4.5%'), alignSelf: 'center', marginLeft: wp('5%'), width: wp('51%') }}>Program with Tinker</Text>
            <Progress.Circle
              animated={true}
              progress={1}
              size={35}
              showsText={true}
              color="#00bcd4"
              thickness={3}
              textStyle={{ fontSize: 9, color: 'red', fontWeight: '800' }}
              formatText={() => '100%'}
              borderWidth={0.5}
            />
          </View>
          <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ChildDetail

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%')
  },
  CircleMen: {
    width: wp('23%'),
    height: isSmallPhone || isSmallTablet ? hp('11%') : hp('12%'),
    borderRadius: 70,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: 'white'
  },
  Circle: {
    borderWidth: 8,
    borderColor: '#FF8A00',
    borderRadius: 40,
    width: wp('20%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%')
  }
})