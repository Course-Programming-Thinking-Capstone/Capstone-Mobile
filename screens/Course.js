import { StyleSheet, Modal, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Alert, ImageBackground,RefreshControl  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import certi from '../assets/MyCourse/certificate.jpg'
import { WebView } from 'react-native-webview';
import close from '../assets/welcome/close1.png'
import lesson from '../assets/Profile/book2.png'
import answer from '../assets/Profile/reading.png'
import quizPic from '../assets/Profile/quiz.png'
import game from '../assets/Profile/control.png'
import gameBtn from '../assets/Game/game.jpg'
import drop from '../assets/MyCourse/drop.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { checkStudy, getCourseById, getCourseStudyById, getStarted } from '../Api/Course';
import Loading from '../Loading/Loading'
// import { getStarted } from '../Api/Progress';
import lock from '../assets/Details/padlock.png'
const Course = ({ navigation, route }) => {
  const { CourseId } = route.params;
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'lessons', title: 'Lessons' },
    { key: 'certificate', title: 'Certificate' },
  ]);
  const [sectionId, setSectionId] = useState([]);
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchCourseById();
  }, []);
  const fetchCourseById = async () => {
    try {
      const sectionDetail = await getCourseById(CourseId);
      if (sectionDetail) {
        setSectionDetail(sectionDetail.sections);
        const sectionIds = sectionDetail.sections.map(section => section.id);
        setSectionId(sectionIds);
        setLoading(false);
        const lock = await checkStudy(sectionIds);
        if (lock) {
          setCheck(lock)
        } else {
          Alert.alert('Đăng ký thất bại !!!');
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCourseById();
    } finally {
      setRefreshing(false);
    }
  }, []);
  const FetchGetStarted = async (sectionId) => {
    try {
      const getStarted1 = await getStarted(sectionId, CourseId);
      if (getStarted1) {
        fetchCourseById();
      } else {
        Alert.alert('Đăng ký thất bại !!!');
      }
    } catch (error) {
      console.error("Error handling add children:", error);
    }
  };
  const [section, setSectionDetail] = useState([]);
  const [showLessons, setShowLessons] = useState({});
  const render = ({ item, index }) => {
    const isLocked = check.find(sectionItem => sectionItem.sectionId === item.id && sectionItem.isBlock);
    const isCompleted = check.find(sectionItem => sectionItem.sectionId === item.id && sectionItem.isCheck);

    return (
      <View key={item.id}>
        <TouchableOpacity
          onPress={() => {
            if (!isLocked) {
              setShowLessons(prevState => ({
                ...prevState,
                [item.id]: !prevState[item.id]
              }));
              if (!isCompleted) {
                FetchGetStarted(item.id);
              }
            }
          }}
          style={[styles.LessBorder, { alignItems: 'center' }]}
        >
          <Text style={{ color: '#8A8A8A', fontWeight: 'bold', fontSize: isSmallPhone || isSmallTablet ? wp('3.7%') : wp('4%'), marginLeft: wp('1.5%'), width: isSmallPhone || isSmallTablet ? wp('75%') : wp('80%'), textAlign: "left" }}>
            Section {index+1} <Text>- {item.name} </Text>
          </Text>
          {isLocked ? (
            <Image style={{
              height: hp('4.5%'),
              width: wp('9%'),
              position: 'absolute',
              right: wp('2%'),
              paddingTop: hp('1%')
            }} source={lock} />
          ) : (
            <Image source={drop} style={{ height: hp('3.5%'), width: wp('4.5%'), position: 'absolute', right: wp('4%'), paddingTop: hp('1%') }} />
          )}
        </TouchableOpacity>
        {showLessons[item.id] &&
          <View>
            {loading ? (
              <Loading />
            ) : (
              <>
                {item.lessons?.map((lesson, index) => (
                  <TouchableOpacity key={lesson.id} onPress={() => { navigation.navigate('StudyCourse', { lessons1: item.lessons, CourseVideo: lesson.resourceUrl, Id: lesson.id, currentType: lesson.type, Content: lesson.content, Num: index + 1 }) }} style={styles.LessBorder}>
                    <View style={styles.LessId}>
                      <Text>{index + 1}</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '600', fontSize: wp('4%'), width: wp('70%') }}>{lesson.name}</Text>
                      <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{lesson.duration}:00</Text>
                    </View>
                    {lesson.type === 'Video' ? (
                      <TouchableOpacity onPress={() => setShowVideo(true)} style={{ position: 'absolute', right: wp('2%') }}>
                        <Image style={{
                          width: wp('9%'),
                          height: hp('4.51%'),
                        }} source={open} />
                      </TouchableOpacity>
                    ) : lesson.type === 'Document' ? (
                      <Image style={{
                        width: wp('9%'),
                        height: hp('4.5%'),
                        position: 'absolute', right: wp('2%')
                      }} source={answer} />
                    ) : (
                      <Image style={{
                        width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
                        height: hp('4.5%'),
                        position: 'absolute', right: wp('2%')
                      }} source={game} />
                    )
                    }
                  </TouchableOpacity>
                ))}
                {item.quizzes?.map((quiz, index) => (
                  <TouchableOpacity key={quiz.id} style={styles.LessBorder} onPress={() => { navigation.navigate('Quiz', { QuizId: quiz.id, CourseId, QuizDetail: quiz }) }}>
                    <View style={styles.LessId}>
                      <Text>{item.lessons.length + index + 1}</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '600', fontSize: wp('4%'), width: wp('70%') }}>{quiz.title}</Text>
                      <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{quiz.duration}:00</Text>
                    </View>
                    <Image style={{
                      width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
                      height: hp('4.5%'),
                      position: 'absolute', right: wp('2%')
                    }} source={quizPic} />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        }
      </View>
    );
  }
  const renderScene = SceneMap({
    lessons: () => (
      <View style={{ marginTop: hp('2%'), flex: 1 }}>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            } >
            <View>
              <FlatList
                data={section}
                renderItem={render}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
              <TouchableOpacity style={{ marginBottom: hp('3%') }} onPress={() => { navigation.navigate('GameIntro', { CourseId }) }}>
                <ImageBackground
                  source={gameBtn}
                  style={{
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                    // padding: 10,
                    overflow: 'hidden',
                    shadowColor: 'black',
                    shadowOpacity: 0.9,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 20,
                    elevation: 5,
                    backgroundColor: 'white'
                  }}
                >
                  <View style={{
                    height: hp('7%'),
                    backgroundColor: 'rgba(200, 200, 200, 0.5)', justifyContent: 'center'
                  }}>
                    <Text style={{
                      textAlign: 'center', color: 'blue'
                      , fontWeight: 'bold', fontSize: isSmallPhone || isSmallTablet ? wp('3.75%') : wp('4%'), marginLeft: wp('5%'), width: wp('80%')
                    }}>Game Programming</Text>
                    <Image
                      style={{
                        width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
                        height: hp('4.5%'),
                        position: 'absolute',
                        right: wp('2%')
                      }}
                      source={game}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    ),
    certificate: () => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={certi} style={{ width: wp('90%'), height: hp('75%'), borderWidth: 3, borderColor: 'blue', borderRadius: 10,
       }} />
        {/* <Text style={{ fontSize: wp('4%'), fontWeight: '500' }}>Please complete your course!</Text> */}
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
    marginBottom: hp('2%'),
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
    marginLeft: wp('0.5%'),
    marginRight: wp('0.5%'),
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