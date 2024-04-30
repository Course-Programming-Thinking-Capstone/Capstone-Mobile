import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import lesson from '../assets/Profile/book1.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getProgress } from '../Api/Progress';
const StudyProcess = ({ route }) => {
  const [progress, setProgress] = useState(null);
  const { id, courseId } = route.params;
  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      if (courseId) {
        const progressDetail = await getProgress(id, courseId);
        if (progressDetail) {
          setProgress(progressDetail);
        }
      } else {
        console.log("CourseId is not set yet");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <>
      <View >
        <View style={{ flexDirection: 'row' }}>
          <View>
            {/* <Text>{progress.courseName}</Text> */}
            <View style={{ flexDirection: "row", marginTop: 20,marginLeft:wp('10%') }}>
              <View style={{ alignItems: 'center' }}>
                <View style={[styles.Process, { backgroundColor: '#F69E4A' }]}>
                  <Image source={lesson} style={{ width: 30, height: 30, justifyContent: 'center' }} />
                  <Text style={{ color: 'white', fontSize: isSmallPhone || isSmallTablet ? wp('4.7%') : 20, fontWeight: '500' }}>Section {item.sectionId}</Text>
                </View>
                <View style={{ height: 200, width: 5, backgroundColor: '#F69E4A' }}></View>
                <View style={[styles.Process, { width: 20, height: 20 }]}></View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <View style={[styles.Process, { width: 20, height: 20 }]}></View> */}
              <View style={{ borderColor: '#1A9CB7', borderWidth: 1, width: wp('10%'), marginTop: 20, height: 1 }}></View>

              <View style={styles.Percent}>
                <Text style={{ color: '#F69E4A', fontSize: isSmallPhone || isSmallTablet ? wp('4.7%') : 20, fontWeight: '700' }}>{item.progress}%</Text>
              </View>
              <View style={{ borderColor: '#1A9CB7', borderWidth: 1, width: wp('30%'), marginTop: 20, height: 1 }}></View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 17, marginTop: 10, paddingLeft: isSmallPhone || isSmallTablet ? wp('10%') : wp('13%'), fontWeight: 'bold' }}>Lesson Title</Text>
        <View style={styles.LessonTitle}>
          <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), width: wp('70%'),textAlign:"center",paddingRight:isSmallPhone || isSmallTablet ? wp('20%') : wp('15%') }}>{item.sectionName}</Text>
        </View>
      </View>
    </>
  );

  if (!progress) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.Container}>
      <Text style={{ color: '#1A9CB7', textAlign: 'center', fontSize: isSmallPhone || isSmallTablet ? wp('5.5%') : 25, marginTop: hp('3%'),paddingLeft:wp('2%'),paddingRight:wp('2%') }}>{progress.courseName}</Text>
      <FlatList
        data={progress.sectionProgress}
        keyExtractor={item => item.sectionId.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.List}
      />
    </View>
  )
};

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
    marginTop: hp('5%'),
  },
  LessonTitle: {
    fontSize: 17,
    marginTop: 10,
  },
})