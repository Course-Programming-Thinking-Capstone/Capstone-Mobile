import React from 'react';
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import welcome from './screens/Welcome'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import HomePage from './screens/HomePage';
import Schedule1 from './assets/HomePage/schedule.png';
import Search from './screens/Search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import PayMethods from './screens/PayMethods';
import ReviewSum from './screens/ReviewSum';
import Payment from './screens/Payment';
import Success from './screens/Success';
import Order from './screens/Order';
import OrderDetail from './screens/OrderDetail';
import CancelOrder from './screens/CancelOrder';
import CancelDetail from './screens/CancelDetail';
import Profile from './screens/Profile';
import ChildProcess from './screens/ChildProcess';
import ChildDetail from './screens/ChildDetail';
import StudyProcess from './screens/StudyProcess';
import KidHome from './screens/KidHome';
import KidCourse from './screens/KidCourse';
import Schedule from './screens/Schedule';
import StudyCourse from './screens/StudyCourse';
import QuizScreen from './screens/Quiz';
import GameIntro from './screens/GameIntro';
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();
function MyTabs() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: false
    }}>
      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/house.png')}
            style={{ width: size, height: size, }}
          />
        ), headerShown: false
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/search.png')}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{}}>
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Search Course</Text>
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
      <Tab.Screen name="Order" component={Order} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/cart.png')}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), marginLeft: wp('32%'), fontWeight: 'bold', color: '#223263' }}>My Order</Text>
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/profile.png')}
            style={{ width: size, height: size }}
          />
        ), headerShown: false
      }} />
    </Tab.Navigator>
  );
}
function KidTab() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true
    }}>
      <Stack.Screen name="Home" component={KidHome} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/house.png')}
            style={{ width: size, height: size, }}
          />
        ), headerShown: false
      }} />
      <Tab.Screen name="Schedule" component={Schedule} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={Schedule1}
            style={{ width: size, height: size }}
          />
        ),
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>My Schedule</Text>
          </View>
        ),
        headerTitleAlign: 'center',
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('./assets/HomePage/profile.png')}
            style={{ width: size, height: size }}
          />
        ), headerShown: false
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
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Popular Course</Text>
            </View>
          ),
          headerTitleAlign: 'center'
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
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Course</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="PayMethods" component={PayMethods} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Payment Method</Text>
            </View>
          ),
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="ReviewSum" component={ReviewSum} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Review Summary</Text>
            </View>
          ),
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="Payment" component={Payment} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Payment</Text>
            </View>
          ),
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Order Detail</Text>
            </View>
          ),
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="CancelOrder" component={CancelOrder} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Cancel Order</Text>
            </View>
          ),
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="CancelDetail" component={CancelDetail} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Cancel Detail</Text>
            </View>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => null
        }} />
        <Stack.Screen name="ChildProcess" component={ChildProcess} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>My Children</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="ChildDetail" component={ChildDetail} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Children Details</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="StudyProcess" component={StudyProcess} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Study Process</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="KidHome" component={KidTab} options={{ headerShown: false }} />
        <Stack.Screen name="KidCourse" component={KidCourse} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>My Course</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Search" component={Search} options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/HomePage/course.png')}
              style={{ width: size, height: size }}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Search Course</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="StudyCourse" component={StudyCourse}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/HomePage/course.png')}
                style={{ width: size, height: size }}
              />
            ),
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Study Course</Text>
              </View>
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="Quiz" component={QuizScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/HomePage/course.png')}
                style={{ width: size, height: size }}
              />
            ),
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: wp('5%'), letterSpacing: wp('0.5%'), fontWeight: 'bold', color: '#223263' }}>Quiz</Text>
              </View>
            ),
            headerTitleAlign: 'center',
            headerLeft: () => null
          }}
        />
        <Stack.Screen name="GameIntro" component={GameIntro}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

