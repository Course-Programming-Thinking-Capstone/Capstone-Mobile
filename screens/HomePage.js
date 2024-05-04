import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import noti from '../assets/HomePage/noti.png'
import search from '../assets/HomePage/search.png'
import filter from '../assets/HomePage/filter.png'
import party from '../assets/HomePage/party.png'
import sale from '../assets/HomePage/sale1.png'
import program from '../assets/HomePage/programmer.png'
import support from '../assets/HomePage/sup.png'
import right from '../assets/HomePage/right.png'
import hello from '../assets/HomePage/hello.png'
import teacher1 from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import learning from '../assets/Lesson/learning.png'
import background from '../assets/HomePage/gif5.gif'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getAllCourse } from '../Api/Course';
import { getUserInfo } from '../Api/Parents';
import test from '../assets/Lesson/kid1.jpg'
import { formatPrice } from '../FormatPrice/Format';
import { getNoti } from '../Api/Notification';
import notiIn from '../assets/HomePage/notiIn.png'
import { getTeacher } from '../Api/Teacher';
import cong from '../assets/Lesson/cong2.jpg'
import ava from '../assets/Profile/gamer.png'

const HomePage = ({ navigation }) => {
    const [course, setCourse] = useState([])
    const [teacher, setTeacher] = useState([])
    const [freeCourses, setFreeCourses] = useState([]);
    const [paidCourses, setPaidCourses] = useState([]);
    useEffect(() => {
        fetchCourse()
        fetchInfo();
        fetchNoti();
        fetchTeacher()
    }, [])
    const [notiData, setNotiData] = useState([]);
    const fetchNoti = async () => {
        try {
            const data = await getNoti();
            if (data) {
                setNotiData(data.results);
                fetchNoti();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setLoading(false);
        }
    };
    const fetchTeacher = async () => {
        try {
            const data = await getTeacher();
            if (data) {
                setTeacher(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setLoading(false);
        }
    };

    const fetchCourse = async () => {
        try {
            const courseData = await getAllCourse();
            if (courseData) {
                const freeCoursesData = courseData.results.filter(course => course.isFree);
                const paidCoursesData = courseData.results.filter(course => !course.isFree);
                setFreeCourses(freeCoursesData);
                setPaidCourses(paidCoursesData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [userInfo, setUserInfo] = useState([])
    const fetchInfo = async () => {
        try {
            const userData = await getUserInfo();
            if (userData) {
                setUserInfo(userData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const Near = [
        { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1500000', image: require('../assets/Lesson/kid1.jpg'), avatar: require('../assets/Lesson/cong2.jpg') },
        { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1500000', image: require('../assets/Lesson/kid2.jpg'), avatar: require('../assets/Lesson/an.jpg') },
        { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2000000', image: require('../assets/Lesson/kid3.jpg'), avatar: require('../assets/Lesson/vu.jpg') },
        { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2500000', image: require('../assets/Lesson/kid4.jpg'), avatar: require('../assets/Lesson/thien.jpg') },
        { id: '5', name: 'Lập trình with C', teacher: 'CongLT', price: '1500000' },
        { id: '6', name: 'Lập trình with C', teacher: 'CongLT', price: '1500000' },
    ];
    const numberOfItems = 4;
    const limitedNear = Near.slice(0, numberOfItems);
    const numberCourse = 4;
    const limitedCourse = course.slice(0, numberCourse);
    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.Course, { height: hp('25%') }]} onPress={() => {
            navigation.navigate('FreeCourse', { Id: item.id })
        }}>
            <Image source={{ uri: item.pictureUrl }} style={styles.Image} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                <Image source={learning} style={{ width: wp('5%'), height: hp('2%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={styles.Name}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={{
                    fontWeight: 'bold',
                    color: 'blue',
                    fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.8%')
                }}>{item.isFree ? 'Free' : formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>
    );
    const renderMentor = ({ item }) => (
        <View style={{ marginVertical: hp('2%') }}>
            <TouchableOpacity style={{ paddingRight: wp('5%'), alignItems: 'center' }} onPress={() => {
                // navigation.navigate('MentorDetails', { Lecture: item.teacher, Avatar: item.avatar, Id: item.teacherId })
            }}>
                <View >
                    <Image source={cong} style={styles.CircleMen} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: wp('3.5%') }}>{item.teacherName}</Text>
            </TouchableOpacity>
        </View>
    );
    const renderCourse = ({ item }) => (
        <TouchableOpacity style={styles.Course} onPress={() => {
            navigation.navigate('LessonDetails', {
                Name: item.name,
                LessImage: item.pictureUrl,
                Price: item.price,
                Id: item.id
            })
        }}>
            <Image source={{ uri: item.pictureUrl }} style={styles.Image} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, paddingLeft: wp('1%'),position:'absolute',top:hp('15%') }}>
                <Image source={learning} style={{ width: wp('5%'), height: hp('2%'), marginRight: wp('2.5%')}} />
                <Text style={styles.Name}>{item.name}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8,position:'absolute',top:hp('19%')}}> 
                <Image source={teacher1} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={{
                    fontWeight: 'bold',
                    color: 'blue',
                    fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.8%'),
                }}>3-4 years old</Text>
            </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8,position:'absolute',bottom:hp('1%') }}>
                <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={{
                    fontWeight: 'bold',
                    color: 'blue',
                    fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.8%'),
                }}>{item.isFree ? 'Free' : formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>
    );
    const allRead = notiData.every(notification => notification.isRead);
    // console.log("free coures:",freeCourses);
    return (
        <View style={styles.Container}>
            <ImageBackground source={background} style={styles.backPic}>
                <SafeAreaView style={styles.Header}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: wp('5%'),
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Hi, {userInfo.fullName}</Text>
                                <Image source={hello} style={{ width: wp('6%'), height: hp('3%'), marginLeft: wp('2%') }} />
                            </View>
                            <Text style={styles.Text}>Let's start learning!</Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={{ backgroundColor: '#83AFFA', height: hp('3%'), width: wp('9%'), paddingTop: hp('0.7%'), paddingBottom: hp('3.7%'), marginRight: wp('9%'), borderRadius: 10 }}>
                            <Image source={allRead ? notiIn : noti} style={[styles.Noti, { marginLeft: allRead ? wp('1.5%') : wp('1.5%') }]} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('Search') }} style={styles.Search}>
                            <Image source={search} style={styles.SearchIcon} />
                            <TextInput
                                placeholder="Search ..."
                                editable={false}
                            />
                        </TouchableOpacity>
                        <View style={styles.Filter}>
                            <Image style={{
                                width: wp('5.2%'),
                                height: hp('2.5%'),
                            }} source={filter} />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
            <ScrollView style={{ marginLeft: wp('5%'), marginRight: wp('3%') }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: hp('2%') }}>
                    <View style={styles.EventTitle}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>Categories</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%'), marginRight: wp('1.5%') }}>View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.EventList}>
                        <TouchableOpacity>
                            <View style={styles.Circle}>
                                <Image source={party} style={styles.EventIcon} />
                            </View>
                            <Text style={{ textAlign: 'center' }}>Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.Circle}>
                                <Image source={sale} style={styles.EventIcon} />
                            </View>
                            <Text style={{ textAlign: 'center' }}>Discount</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.Circle}>
                                <Image source={program} style={styles.EventIcon} />
                            </View>
                            <Text style={{ textAlign: 'center' }}>Coding</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.Circle}>
                                <Image source={support} style={styles.EventIcon} />
                            </View>
                            <Text style={{ textAlign: 'center' }}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {freeCourses.length > 0 && (
                    <View >
                        <View style={styles.Title}>
                            <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>Pay Course</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text onPress={() => { navigation.navigate('PopularCourse', { paidCourses }) }} style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%') }}>View all</Text>
                                <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                data={paidCourses}
                                renderItem={renderCourse}
                                keyExtractor={item => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.List}
                            />
                        </View>
                    </View>
                )}
                <View>
                    <View style={styles.EventTitle}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>Top Mentor</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%') }} >View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={teacher}
                            keyExtractor={item => item.teacherId}
                            renderItem={renderMentor}
                            horizontal
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.Title}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>Free Course</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%'), marginRight: wp('1.5%') }} >View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingBottom: hp('1%'), flexDirection: 'row' }}>

                        <FlatList
                            data={freeCourses}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.List}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomePage

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Text: {
        fontSize: wp('5%'),
        color: 'white',
        marginTop: hp('0.1%')
    },
    Header: {
        // backgroundColor: '#246BFD',
        paddingLeft: wp('5%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('4%')
    },
    Noti: {
        width: wp('6%'),
        height: hp('3%'),
    },
    Search: {
        marginTop: hp('3.5%'),
        marginRight: wp('4%'),
        width: wp('69%'),
        height: hp('6.3%'),
        borderColor: '#EFEFEF',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('2.5%'),
        backgroundColor: 'white'
    },
    Filter: {
        marginTop: hp('3.5%'),
        width: wp('13%'),
        height: hp('6.3%'),
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#EFEFEF'
    },
    SearchIcon: {
        width: wp('5.2%'),
        height: hp('2.5%'),
        marginRight: wp('3%'),
    },
    EventList: {
        marginTop: hp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    EventTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    EventIcon: {
        width: wp('11%'),
        height: hp('5.5%'),
    },
    Circle: {
        width: wp('16%'),
        height: hp('7.5%'),
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF'
    },
    CircleMen: {
        width: wp('15.5%'),
        height: hp('7.5%'),
        borderRadius: 30,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF'
    },
    Title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    List: {
        height: hp('30%'),
        paddingLeft: wp('1%')
    },
    Course: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#e9f2eb',
        width: wp('51%'),
        height: hp('26.5%'),
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        backgroundColor: 'white',
        marginRight: wp('3%'),
        elevation: 5,
        marginTop: hp('1%'),
    },
    Image: {
        width: wp('50.3%'),
        height: hp('15%'),
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
    },
    Name: {
        
        fontWeight: 'bold',
        color: '#223263',
        fontSize: isSmallPhone || isSmallTablet ? wp('3.5%') : wp('4.3%'),
        width: isSmallPhone || isSmallTablet ? wp('37%') : wp('40%')
    },
    Location: {
        fontWeight: 'bold',
        color: '#40BFFF',
        fontSize: wp('4%'),
    },
    backPic: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: wp('100%'),
        height: hp('28%'), overflow: 'hidden'
    },
});