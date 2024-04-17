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
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import learning from '../assets/Lesson/learning.png'
import background from '../assets/HomePage/gif5.gif'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getAllCourse } from '../Api/Course';
import { getUserInfo } from '../Api/Parents';
import test from '../assets/Lesson/kid1.jpg'
import { formatPrice } from '../FormatPrice/Format';
const HomePage = ({ navigation }) => {
    const [course, setCourse] = useState([])
    useEffect(() => {
        fetchCourse()
        fetchInfo()
    }, [])
    const fetchCourse = async () => {
        try {
            const courseData = await getAllCourse();
            if (courseData) {
                setCourse(courseData.results);
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
        <TouchableOpacity style={styles.Course} onPress={() => {
            navigation.navigate('LessonDetails', { Name: item.name, LessImage: item.image, Lecture: item.teacher, Avatar: item.avatar, Price: item.price, Id: item.id })
        }}>
            <Image source={item.image} style={styles.Image} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                <Image source={learning} style={{ width: wp('5%'), height: hp('2%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={styles.Name}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={{
                    fontWeight: 'bold',
                    color: '#40BFFF',
                    fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.8%')
                }}>{item.teacher}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                <Text style={{
                    fontWeight: 'bold',
                    color: 'blue',
                    fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.8%')
                }}>
                    {parseFloat(item.price.replace(/\./g, '').replace(',', '.')).toLocaleString('vi-VN')} đ
                </Text>
            </View>
        </TouchableOpacity>
    );
    const renderMentor = ({ item }) => (
        <View style={{ marginVertical: hp('2%') }}>
            <TouchableOpacity style={{ paddingRight: wp('8%'), paddingLeft: wp('1%') }} onPress={() => {
                navigation.navigate('MentorDetails', { Lecture: item.teacher, Avatar: item.avatar, Id: item.id })
            }}>
                <View >
                    <Image source={item.avatar} style={styles.CircleMen} />
                </View>
                <Text style={{ textAlign: 'center' }}>{item.teacher}</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={styles.Name}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={styles.Price}>{item.isFree ? 'Free' : formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>
    );

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
                        <TouchableOpacity onPress={()=>{navigation.navigate('Notification')}} style={{ backgroundColor: '#83AFFA', height: hp('3%'), width: wp('9%'), paddingLeft: wp('2%'), paddingTop: hp('0.7%'), paddingBottom: hp('3.7%'), marginRight: wp('9%'), borderRadius: 10 }}>
                            <Image source={noti} style={styles.Noti} />
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
                <View >
                    <View style={styles.Title}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>Popular Course</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('PopularCourse') }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%') }}>View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={limitedNear}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.List}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.EventTitle}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>Top Mentor</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('TopMentor') }} >
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%') }} >View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={limitedNear}
                            keyExtractor={item => item.id}
                            renderItem={renderMentor}
                            horizontal
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View >
                    <View style={styles.Title}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>3 - 4 years old</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%'), marginRight: wp('1.5%') }} onPress={() => { navigation.navigate('PopularCourse') }}>View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={limitedNear}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.List}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.Title}>
                        <Text style={{ fontWeight: 'bold', color: '#223263', fontSize: wp('4%') }}>5 - 6 years old</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%'), marginRight: wp('1.5%') }} onPress={() => { navigation.navigate('PopularCourse') }}>View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%') }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingLeft: wp('1%'), marginBottom: hp('0.5%'), flexDirection: 'row' }}>
                        <FlatList
                            data={limitedCourse}
                            renderItem={renderCourse}
                            keyExtractor={item => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
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
        width: wp('50%'),
        fontWeight: 'bold',
        color: '#223263',
        fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.7%')
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