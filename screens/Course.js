import { StyleSheet, Modal, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import certi from '../assets/MyCourse/certificate.jpg'
import { WebView } from 'react-native-webview';
import close from '../assets/welcome/close1.png'
import lesson from '../assets/Profile/book2.png'
import answer from '../assets/Profile/reading.png'
import quiz from '../assets/Profile/quiz.png'
import game from '../assets/Profile/control.png'
import drop from '../assets/MyCourse/drop.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
const Course = ({navigation}) => {
  const lessons1 = [
    { id: '01', name: 'Introduction programming ', time: '10:00', status: 'video' },
    { id: '02', name: 'Make a Tower Defense Game', time: '5:00', status: 'read' },
    { id: '03', name: 'Introduction programming ', time: '10:00', status: 'quiz' },
    { id: '04', name: 'Make a Tower Defense Game', time: '5:00', status: 'game' },
  ];
  const lessons2 = [
    { id: '01', name: 'Scratch 3.0 Tutorial ', time: '10:00', status: 'video' },
    { id: '02', name: 'Ultimate 2022 Scratch', time: '5:00', status: 'read' },
    { id: '03', name: 'Create engaging stories', time: '7:00', status: 'quiz' },
    { id: '04', name: 'Create simple games', time: '3:00', status: 'game' },
  ];
  const lessons3 = [
    { id: '01', name: 'Control smart devices ', time: '10:00', status: 'video' },
    { id: '02', name: 'Programming traffic lights', time: '5:00', status: 'read' },
    { id: '03', name: 'Control smart devices ', time: '10:00', status: 'quiz' },
    { id: '04', name: 'Programming traffic lights', time: '5:00', status: 'game' },
  ];
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'lessons', title: 'Lessons' },
    { key: 'certificate', title: 'Certificate' },
  ]);
  const render = ({ item }) => (
    <TouchableOpacity onPress={()=>{navigation.navigate('StudyCourse',{lessons1,Id:item.id})}} style={styles.LessBorder}>
      <View style={styles.LessId}>
        <Text>{item.id}</Text>
      </View>
      <View>
        <Text style={{ fontWeight: '600', fontSize: wp('4%') }}>{item.name}</Text>
        <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{item.time}</Text>
      </View>
      {item.status === 'video' ? (
        <TouchableOpacity onPress={() => setShowVideo(true)} style={{ position: 'absolute', right: wp('2%') }}>
          <Image style={{
            width: wp('9%'),
            height: hp('4.51%'),
          }} source={open} />
        </TouchableOpacity>
      ) : item.status === 'read' ? (
        <Image style={{
          width: wp('9%'),
          height: hp('4.5%'),
          position: 'absolute', right: wp('2%')
        }} source={answer} />
      ) : item.status === 'quiz' ? (
        <Image style={{
          width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
          height: hp('4.5%'),
          position: 'absolute', right: wp('2%')
        }} source={quiz} />
      ) : (
        <Image style={{
          width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
          height: hp('4.5%'),
          position: 'absolute', right: wp('2%')
        }} source={game} />
      )
      }
    </TouchableOpacity>
  );
  const [showVideo, setShowVideo] = useState(false);
  const VideoWebView = () => {
    return (
      <View style={{ height: 300, alignItems: 'center' }}>
        <WebView style={{ width: wp('100%') }}
          allowsFullscreenVideo
          source={{ uri: 'https://www.youtube.com/embed/mpSmBuco6I0?si=p1hauMk3VsiiPzzR%22%20title=' }}
        />
      </View>
    );
  };
  const closeModal = () => {
    setShowVideo(false);
  };
  const [showLessons, setShowLessons] = useState(false);
  const [showLessons1, setShowLessons1] = useState(false);
  const [showLessons2, setShowLessons2] = useState(false);
  const renderScene = SceneMap({
    lessons: () => (
      <View style={{ marginTop: hp('2%') }}>
        <Modal visible={showVideo} animationType="slide" transparent={true} statusBarTranslucent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Image source={close} style={styles.buttonClose} />
            </TouchableOpacity>
            <VideoWebView />
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false} >
          <TouchableOpacity onPress={() => setShowLessons(!showLessons)} style={[styles.LessBorder, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Text style={{ color: '#8A8A8A', fontWeight: 'bold', fontSize: isSmallPhone || isSmallTablet ? wp('3.75%') : wp('4%'), marginLeft: wp('1.5%'),width:wp('51%') }}>Section 1 <Text>- Introduction </Text></Text>
              <Text style={{ color: 'blue', fontWeight: 'bold', marginRight: wp('2%') }}>( 15 Min )</Text>
            </View>
            <Image source={drop} style={{ height: hp('3.5%'), width: wp('4.5%'), marginRight: wp('5%') }} />
          </TouchableOpacity>
          <View>
            {showLessons && <View>
              <FlatList
                data={lessons1}
                renderItem={render}
                keyExtractor={item => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>}
          </View>

          <TouchableOpacity onPress={() => setShowLessons1(!showLessons1)} style={[styles.LessBorder, { justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Text style={{ color: '#8A8A8A', fontWeight: 'bold', fontSize: isSmallPhone || isSmallTablet ? wp('3.75%') : wp('4%'), marginLeft: wp('1.5%'),width:wp('51%') }}>Section 2 <Text>- Programming </Text></Text>
              <Text style={{ color: 'blue', fontWeight: 'bold', marginRight: wp('2%') }}>( 45 Min )</Text>
            </View>
            <Image source={drop} style={{ height: hp('3.5%'), width: wp('4.5%'), marginRight: wp('5%') }} />
          </TouchableOpacity>
          <View>
            {showLessons1 && <View>
              <FlatList
                data={lessons2}
                renderItem={render}
                keyExtractor={item => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>}
          </View>
        </ScrollView>
      </View>
    ),
    certificate: () => (
      <View>
        <Image source={certi} style={{ width: wp('90%'), height: hp('75%'), borderWidth: 3, borderColor: 'blue', borderRadius: 10, marginTop: hp('5%') }} />
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
    paddingLeft: wp('4%'),
    paddingRight: wp('4%')
  },
  LessBorder: {
    height: hp('7%'),
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: '#e9f0f9',
    borderWidth: 1,
    paddingLeft: wp('2%'),
    alignItems: 'center',
    paddingVertical: hp('1%'),
    marginBottom: hp('2%'),
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
    marginLeft: wp('0.5%'),
    marginRight: wp('0.5%')
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
    marginRight: wp('3%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 10
  },
  buttonClose: {
    width: wp('4%'),
    height: hp('2%'),
  },
  closeButton: {
    position: 'absolute',
    top: hp('20%'),
    right: wp('4%')
  },
})