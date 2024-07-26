import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import mess from '../../assets/Details/message.png'
import tele from '../../assets/Details/tele.png'
import google from '../../assets/Mentor/google.png'
import dot from '../../assets/Mentor/dot.png'
import apple from '../../assets/Mentor/apple.png'
import micro from '../../assets/Mentor/microsoft.png'
import teacher from '../../assets/Lesson/teacher1.png'
import tag from '../../assets/Lesson/tag.png'
import cong from '../../assets/Lesson/cong2.jpg'
import search from '../../assets/HomePage/search.png'
import star1 from '../../assets/Details/star2.png'
import an from '../../assets/Lesson/an.jpg'
import vu from '../../assets/Lesson/vu.jpg'
import thien from '../../assets/Lesson/thien.jpg'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const MentorDetails = ({ route }) => {
  const navigation = useNavigation();
  const { Lecture, Avatar, Id } = route.params;
  const [selectedTab, setSelectedTab] = useState('about');
  const [isPressed1, setIsPressed1] = useState(true);
  const [isPressed2, setIsPressed2] = useState(true);
  const [isPressed3, setIsPressed3] = useState(true);

  const [isPressed, setIsPressed] = useState(true);
  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  const handlePress1 = () => {
    setIsPressed1(!isPressed1);
  };
  const handlePress2 = () => {
    setIsPressed2(!isPressed2);
  };
  const handlePress3 = () => {
    setIsPressed3(!isPressed3);
  };
  const Near = [
    { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1.500.000 VND', image: require('../../assets/Lesson/kid1.jpg'), avatar: require('../../assets/Lesson/cong2.jpg') },
    { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1.500.000 VND', image: require('../../assets/Lesson/kid2.jpg'), avatar: require('../../assets/Lesson/an.jpg') },
    { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2.000.000 VND', image: require('../../assets/Lesson/kid3.jpg'), avatar: require('../../assets/Lesson/vu.jpg') },
    { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2.500.000 VND', image: require('../../assets/Lesson/kid4.jpg'), avatar: require('../../assets/Lesson/thien.jpg') },
    { id: '5', name: 'Lập trình with C', teacher: 'CongLT', price: '1.500.000 VND' },
    { id: '6', name: 'Lập trình with C', teacher: 'CongLT', price: '1.500.000 VND' },
  ];
  const numberOfItems = 4; // Render component number
  const limitedNear = Near.slice(0, numberOfItems);
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate('LessonDetails', { Name: item.name, LessImage: item.image, Lecture: item.teacher, Avatar: item.avatar, Price: item.price, Id: item.id })
    }}>
      <View style={styles.Course}>
        <Image source={item.image} style={styles.CourseImage} />
        <View>
          <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('21.9%') }}>
            <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.1%') }}>Best Seller</Text>
          </View>
          <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500' }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
            <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
            <Text style={{
              fontWeight: 'bold',
              color: '#40BFFF',
              fontSize: wp('3.8%')
            }}>{item.teacher}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
            <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
            <Text style={{
              fontWeight: 'bold',
              color: 'blue',
              fontSize: wp('3.8%')
            }}>{item.price}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', right: wp('1%'), top: hp('1.5%') }}>
          <Pressable>
            <Ionicons name="bookmark" size={25} color="blue" />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'courses', title: 'Courses' },
    { key: 'reviews', title: 'Reviews' },
  ]);
  const renderScene = SceneMap({
    about: () => (
      <View style={{ marginTop: hp('1%')}}>
        <ScrollView style={{ width: wp('100%') }}>
          <Text style={{ fontSize: wp('4%'), fontWeight: '500' }}>About</Text>
          <Text style={{ marginTop: hp('1%'), color: '#94867D', lineHeight: hp('3%'), width: wp('90%'), fontSize: wp('4%') }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</Text>
          <Text style={{ marginTop: hp('1%'), fontSize: wp('4%'), fontWeight: '500', marginBottom: hp('1%') }}>Info</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('15%') }}>
            <View>
              <Text style={{ color: '#94867D' }}>Students</Text>
              <Text style={{ marginBottom: hp('2%'), fontWeight: '500' }}>156,213</Text>
            </View>
            <View style={{}}>
              <Text style={{ color: '#94867D' }}>Course</Text>
              <Text style={{ marginBottom: hp('2%'), fontWeight: '500' }}>32</Text>
            </View>
            <View style={{}}>
              <Text style={{ color: '#94867D' }}>Level</Text>
              <Text style={{ marginBottom: hp('2%'), fontWeight: '500' }}>Beginner</Text>
            </View>
          </View>
          <Text style={{ marginTop: hp('1%'), fontSize: wp('4%'), fontWeight: '500', marginBottom: hp('1%') }}>Experience</Text>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <View style={{
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#EFEFEF',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('2%'), paddingVertical: wp('3%'),
                paddingHorizontal: hp('1.5%')
              }}>
                <Image source={google} style={{
                  width: wp('5%'),
                  height: hp('2.5%'),
                }} />
              </View>
              <View style={{ marginRight: wp('10%') }}>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: '700' }}>Senior UI/UX Design</Text>
                <Text style={{ fontSize: wp('3.5%'), color: '#94867D', fontWeight: '500' }}>2020 - Now</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>There are many variations of passages of Lorem</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>If you are going to use a passage of Lorem</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>The generated Lorem Ipsum is therefore</Text>
            </View>
            <View style={{ height: hp('0.1%'), width: wp('90%'), marginTop: hp('2%'), backgroundColor: '#E9E9E9' }} />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <View style={{
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#EFEFEF',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('2%'), paddingVertical: wp('3%'),
                paddingHorizontal: hp('1.5%')
              }}>
                <Image source={apple} style={{
                  width: wp('5%'),
                  height: hp('2.5%'),
                }} />
              </View>
              <View style={{ marginRight: wp('10%') }}>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: '700' }}>Senior UI/UX Design</Text>
                <Text style={{ fontSize: wp('3.5%'), color: '#94867D', fontWeight: '500' }}>2018 - 2020</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>There are many variations of passages of Lorem</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>If you are going to use a passage of Lorem</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>The generated Lorem Ipsum is therefore</Text>
            </View>
            <View style={{ height: hp('0.1%'), width: wp('90%'), marginTop: hp('2%'), backgroundColor: '#E9E9E9' }} />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <View style={{
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#EFEFEF',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('2%'), paddingVertical: wp('3%'),
                paddingHorizontal: hp('1.5%')
              }}>
                <Image source={micro} style={{
                  width: wp('5%'),
                  height: hp('2.5%'),
                }} />
              </View>
              <View style={{ marginRight: wp('10%') }}>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: '700' }}>Junior UI/UX Design</Text>
                <Text style={{ fontSize: wp('3.5%'), color: '#94867D', fontWeight: '500' }}>2017 - 2018</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>There are many variations of passages of Lorem</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>If you are going to use a passage of Lorem</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={dot} style={{ width: wp('5%'), height: hp('4.5%') }} />
              <Text style={{ fontSize: wp('4%'), color: '#94867D' }}>The generated Lorem Ipsum is therefore</Text>
            </View>
            <View style={{ height: hp('0.1%'), width: wp('90%'), marginTop: hp('2%'), backgroundColor: '#E9E9E9' }} />
          </View>
        </ScrollView>
      </View >
    ),
    courses: () => (
      <View style={{ marginTop: hp('1%') }}>
        <Text>Courses <Text style={{ color: 'blue' }}> (32)</Text></Text>
        <FlatList
          data={limitedNear}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ),
    reviews: () => (
      <View style={{ marginTop:hp('2%')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>Reviews <Text style={{ color: 'blue' }}> (45)</Text></Text>
          <View style={styles.Search}>
            <Image source={search} style={styles.SearchIcon} />
            <TextInput
              placeholder="Search in reviews"
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handlePress} style={[styles.ButtonReview,
            { backgroundColor: isPressed ? '#F4F6F9' : '#327CF7' }]}>
              <Text style={{ color: isPressed ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>All Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress1} style={[styles.ButtonReview,
            { backgroundColor: isPressed1 ? '#F4F6F9' : '#327CF7' }]}>
              <Text style={{ color: isPressed1 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Lasted</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress2} style={[styles.ButtonReview,
            { backgroundColor: isPressed2 ? '#F4F6F9' : '#327CF7' }]}>
              <Text style={{ color: isPressed2 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress3} style={[styles.ButtonReview,
            { backgroundColor: isPressed3 ? '#F4F6F9' : '#327CF7' }]}>
              <Text style={{ color: isPressed3 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Verified</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center' }}>
            <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
              <Image source={cong} style={styles.CircleMen} />
              <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Lương Thành Công</Text>
              <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
            </View>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
              <Text style={{ color: '#94867D' }}>5.0</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
              <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
              <Image source={thien} style={styles.CircleMen} />
              <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Trần Minh Thiện</Text>
              <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
            </View>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
              <Text style={{ color: '#94867D' }}>5.0</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
              <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
              <Image source={vu} style={styles.CircleMen} />
              <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Nguyễn Tuấn Vũ</Text>
              <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
            </View>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
              <Text style={{ color: '#94867D' }}>5.0</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
              <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
              <Image source={an} style={styles.CircleMen} />
              <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Thành An</Text>
              <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
            </View>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
              <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
              <Text style={{ color: '#94867D' }}>5.0</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
              <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
            </View>
          </View>
        </ScrollView>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%') }}>
        <View style={{ marginRight: wp('3%') }}>
          <Image source={Avatar} style={styles.CircleMen} />
        </View>
        <View style={{ marginRight: wp('10%') }}>
          <Text style={{ fontSize: wp('4.5%'), fontWeight: '700' }}>{Lecture}</Text>
          <Text style={{ fontSize: wp('3.5%') }}>Mobile Developer</Text>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: wp('-2%') }}>
          <View style={styles.Circle}>
            <Image source={tele} style={{ width: wp('5%'), height: hp('3%') }} />
          </View>
          <View style={styles.Circle}>
            <Image source={mess} style={{ width: wp('5%'), height: hp('3%') }} />
          </View>
        </View>
      </View>
      <View style={{ height: hp('0.1%'), width: wp('90%'), marginTop: hp('2%'), backgroundColor: '#E9E9E9' }} />
      <View style={{
        flex: 1, marginBottom: hp('1.5%')
      }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: '100%' }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  )
}

export default MentorDetails

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%')
  },
  CircleMen: {
    width: wp('13.5%'),
    height: hp('6.5%'),
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF'
  },
  Circle: {
    width: wp('13.5%'),
    height: hp('6.5%'),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    marginRight: wp('2%')
  },
  Course: {
    flexDirection: 'row',
    marginTop: hp('0.5%'),
    borderWidth: 1,
    width: wp('90%'),
    paddingHorizontal: hp('1%'),
    paddingVertical: wp('2%'),
    borderRadius: 10,
    borderColor: '#E9E9E9',
    alignItems: 'center'
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
  Search: {
    marginTop: hp('1%'),
    marginRight: wp('4%'),
    width: wp('90%'),
    height: hp('6.3%'),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('2.5%'),
    backgroundColor: '#F4F6F9'
  },
  SearchIcon: {
    width: wp('5.2%'),
    height: hp('2.5%'),
    marginRight: wp('3%'),
  },
  ButtonReview: {
    borderWidth: 1,
    height: hp('4%'),
    width: wp('22%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: hp('1%'),
    borderColor: '#e9f2eb',
    marginRight: wp('1%')
  }
})