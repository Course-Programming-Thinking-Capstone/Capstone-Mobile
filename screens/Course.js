import { StyleSheet, Text, View,ScrollView,FlatList,Image } from 'react-native'
import React,{useState} from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import lock from '../assets/Details/padlock.png'
import certi from '../assets/MyCourse/certificate.jpg'

const Course = () => {
  const lessons1 = [
    { id: '01', name: 'Introduction programming ', time: '10:00', status: 'Open' },
    { id: '02', name: 'Make a Tower Defense Game', time: '5:00', status: 'Open' },
  ];
  const lessons2 = [
    { id: '03', name: 'Scratch 3.0 Tutorial ', time: '10:00', status: 'Open' },
    { id: '04', name: 'Ultimate 2022 Scratch', time: '5:00', status: 'Open' },
    { id: '05', name: 'Create engaging stories', time: '7:00', status: 'Open' },
    { id: '06', name: 'Create simple games', time: '3:00', status: 'Open' },
    { id: '07', name: 'Advanced game programming', time: '12:00', status: 'Open' },
  ];
  const lessons3 = [
    { id: '08', name: 'Control smart devices ', time: '10:00', status: 'Open' },
    { id: '09', name: 'Programming traffic lights', time: '5:00', status: 'Open' },
  ];
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'lessons', title: 'Lessons' },
    { key: 'certificate', title: 'Certificate' },
  ]);
  const render = ({ item }) => (
    <View style={styles.LessBorder}>
      <View style={styles.LessId}>
        <Text>{item.id}</Text>
      </View>
      <View>
        <Text style={{ fontWeight: '600', fontSize: wp('4%') }}>{item.name}</Text>
        <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{item.time}</Text>
      </View>
      <View style={{ position: 'absolute', right: wp('2%') }}>
        {item.status === 'Open' ? (
          <Image style={{
            width: wp('9%'),
            height: hp('4.51%'),
          }} source={open} />
        ) : (
          <Image style={{
            width: wp('9%'),
            height: hp('4.5%'),
          }} source={lock} />
        )}
      </View>
    </View>
  );
  const renderScene = SceneMap({
    lessons: () => (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ marginTop: hp('1%'), marginBottom: hp('1%'), fontSize: wp('4%'), fontWeight: '500' }}>Lessons<Text style={{ color: 'blue' }}> (32) </Text></Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: hp('1%'), color: '#8A8A8A', fontWeight: 'bold' }}>Section 1 <Text>- Introduction </Text></Text>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>15 Min</Text>
          </View>
          <View>
            <FlatList
              data={lessons1}
              renderItem={render}
              keyExtractor={item => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: hp('1%'), color: '#8A8A8A', fontWeight: 'bold' }}>Section 2 <Text>- Fundamentals </Text></Text>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>45 Min</Text>
          </View>
          <View>
            <FlatList
              data={lessons2}
              renderItem={render}
              keyExtractor={item => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: hp('1%'), color: '#8A8A8A', fontWeight: 'bold' }}>Section 3 <Text>- Capstone </Text></Text>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>15 Min</Text>
          </View>
          <View>
            <FlatList
              data={lessons3}
              renderItem={render}
              keyExtractor={item => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </View>
    ),
    certificate: () => (
      <View>
          <Image source={certi} style={{width:wp('90%'),height:hp('75%'),borderWidth:3,borderColor:'blue',borderRadius:10,marginTop:hp('5%')}}/>
      </View>
    ),
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue', height: hp('1%'), borderTopLeftRadius: 10, borderTopRightRadius: 10 }} // Màu nền cho tab đang chọn
      style={{ backgroundColor: 'white' }} // Màu nền chung của tab bar
      labelStyle={{ color: 'black' }}// Màu chữ của tab
      tabStyle={{ color: 'red' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? 'blue' : 'black' }}>{route.title}</Text>
    )}
    />
  );
  return (
    <View style={styles.Container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}

export default Course

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft:wp('5%'),
    paddingRight:wp('5%')
  },
  LessBorder: {
      flexDirection: 'row',
      borderRadius: 30,
      borderColor: '#e9f0f9',
      borderWidth: 1,
      paddingLeft: wp('2%'),
      alignItems: 'center',
      paddingVertical: hp('1%'),
      marginBottom: hp('2%'),
  },
  LessId: {
      borderRadius: 30,
      borderColor: '#e9f0f9',
      borderWidth: 1,
      justifyContent: 'center',
      width: wp('11%'),
      height: hp('5%'),
      alignItems: 'center',
      backgroundColor: '#e9f0f9',
      marginRight: wp('3%')
  },
})