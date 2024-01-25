import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import back1 from './assets/welcome/back.png'
import welcome from './screens/Welcome'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import HomePage from './screens/HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import lessonDetails from './screens/LessonDetails';
import MyCourse from './screens/MyCourse';
import { useNavigation } from "@react-navigation/native";
import MentorDetails from './screens/MentorDetails';
import PopularCourse from './screens/PopularCourse';
import TopMentor from './screens/TopMentor';
import BookMark from './screens/BookMark';
import Course from './screens/Course';
import { LogBox } from 'react-native';
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();
function MyTabs() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/house.png')}
            style={{ width: size, height: size, }}
          />
        ), headerShown: false
      }} />
      <Tab.Screen name="My Course" component={MyCourse} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/course.png')}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{}}>
            {/* <View style={{ borderRadius: 30, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, width: wp('10%'), alignItems: 'center', height: hp('5%'), justifyContent: 'center' }}>
              <TouchableOpacity onPress={goBack}>
                <Image style={{ width: wp('5%'), height: hp('3%') }} source={back1} />
              </TouchableOpacity>
            </View> */}
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>My Course</Text>
          </View>
        ),
        headerTitleAlign: 'center'
      }} />
      <Tab.Screen name="BookMark" component={BookMark} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/bookmark.png')}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Bookmark</Text>
          </View>
        ),
        headerTitleAlign: 'center'
      }} />
      <Tab.Screen name="Cart" component={welcome} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/cart.png')}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), marginLeft: wp('25%'), fontWeight: 'bold', color: '#223263' }}>My Account</Text>
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={welcome} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/profile.png')}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), marginLeft: wp('25%'), fontWeight: 'bold', color: '#223263' }}>My Account</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
export default function App() {

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="LessonDetails" component={lessonDetails} options={{ headerShown: false }} />
        <Stack.Screen name="MyCourse" component={MyCourse} options={{ headerShown: false }} />
        <Stack.Screen name="MentorDetails" component={MentorDetails} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Mentor Details</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="PopularCourse" component={PopularCourse} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View style={{}}>
              {/* <View style={{ borderRadius: 30, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, width: wp('10%'), alignItems: 'center', height: hp('5%'), justifyContent: 'center' }}>
              <TouchableOpacity onPress={goBack}>
                <Image style={{ width: wp('5%'), height: hp('3%') }} source={back1} />
              </TouchableOpacity>
            </View> */}
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263', marginLeft: wp('15%') }}>Popular Course</Text>
            </View>
          )
        }} />
        <Stack.Screen name="TopMentor" component={TopMentor} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View style={{}}>
              {/* <View style={{ borderRadius: 30, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, width: wp('10%'), alignItems: 'center', height: hp('5%'), justifyContent: 'center' }}>
              <TouchableOpacity onPress={goBack}>
                <Image style={{ width: wp('5%'), height: hp('3%') }} source={back1} />
              </TouchableOpacity>
            </View> */}
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Top Mentor</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Course" component={Course} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View style={{}}>
              {/* <View style={{ borderRadius: 30, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, width: wp('10%'), alignItems: 'center', height: hp('5%'), justifyContent: 'center' }}>
              <TouchableOpacity onPress={goBack}>
                <Image style={{ width: wp('5%'), height: hp('3%') }} source={back1} />
              </TouchableOpacity>
            </View> */}
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Course</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

