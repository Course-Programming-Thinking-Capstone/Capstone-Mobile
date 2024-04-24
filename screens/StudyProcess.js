import { StyleSheet, Text, View, Image, FlatList , Dimensions} from 'react-native'
import React from 'react'
import lesson from '../assets/Profile/book1.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {isSmallPhone,isSmallTablet} from '../Responsive/Responsive'
const StudyProcess = () => {
  const data = [
    { id: '1', name: 'Program with Scratch', lessons: '1', percent: '30' },
    { id: '2', name: 'Program with Python', lessons: '2', percent: '40' },
    { id: '3', name: 'Program with Tynker', lessons: '3', percent: '50' },
    { id: '4', name: 'Program with Blockly', lessons: '4', percent: '0' },
    { id: '5', name: 'Program with ReactJs', lessons: '5', percent: '0' },
    { id: '6', name: 'Program with Flutter', lessons: '6', percent: '0' },
  ];
  const renderItem = ({ item }) => (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <View style={{ flexDirection: "row", marginTop: hp('5%') }}>
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.Process, { backgroundColor: item.lessons === '1' ? '#F69E4A' : item.lessons === '2' ? '#EF7E54' : item.lessons === '3' ? '#F25B58' : item.lessons === '4' ? '#E53E5C' : 'red' }]}>
                <Image source={lesson} style={{ width: wp('8.5%'), height: hp('4.5%'), justifyContent: 'center' }} />
                <Text style={{ color: 'white', fontSize: wp('4.5%'),fontWeight:'500' }}>LESSON {item.lessons}</Text>
              </View>
              <View style={{
                height: hp('20%'),
                width: wp('0.7%'),
                backgroundColor: '#F69E4A',
              }}></View>
              <View style={[styles.Process, { width: wp('4%'), height: hp('2%') }]}></View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.Percent}>
              <Text style={{ color: '#F69E4A', fontSize: wp('5.5%'),fontWeight:'500' }}>{item.percent}%</Text>
            </View>
            <View style={{ borderColor: '#1A9CB7', borderWidth: 1, width: wp('15%'), marginTop: hp('2%'), height: 1 }}></View>
          </View>
        </View>
      </View>
      <View style={{alignItems:'flex-start'}}>
        <Text style={{ fontSize: isSmallPhone || isSmallTablet ? 17 : 20, marginLeft: wp('1%'), marginTop: hp('2%') }}>Course Title</Text>
        <Text style={{ fontSize: isSmallPhone || isSmallTablet ? 11 : 13, }}>{item.name}</Text>
      </View>
    </View>
  )
  return (
    <View style={styles.Container}>
      <Text style={{ color: '#1A9CB7', textAlign: 'center', fontSize: isSmallPhone || isSmallTablet ? 20 : 25, marginTop: hp('5%') }}>Course: Program with Python</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.List}
      />
    </View>
  )
}

export default StudyProcess

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Process: {
    borderWidth: 1,
    backgroundColor: '#F69E4A',
    width: wp('30%'),
    height: isSmallPhone || isSmallTablet ? hp('14.5%') : hp('15%'),
    justifyContent: "center",
    borderRadius: 60,
    borderColor: 'white',
    alignItems: 'center',
  },
  Percent: {
    backgroundColor: 'red',
    width: wp('30%'),
    height: hp('7%'),
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    backgroundColor: '#F2F2F2',
    elevation: 5,
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  List: {
    paddingLeft: wp('3%'),
    marginTop: hp('5%')
  }
})