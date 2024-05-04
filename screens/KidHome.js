import { RefreshControl, StyleSheet, Text, View, ImageBackground, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import hello from '../assets/HomePage/hello.png'
import background from '../assets/HomePage/gif5.gif'
import noti from '../assets/HomePage/noti.png'
import notiIn from '../assets/HomePage/notiIn.png'
import search from '../assets/HomePage/search.png'
import filter from '../assets/HomePage/filter.png'
import { useNavigation } from "@react-navigation/native";
import teacher from '../assets/Lesson/teacher1.png'
import ProgressBar from 'react-native-progress/Bar';
import right from '../assets/HomePage/right.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getUserInfo } from '../Api/Parents';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getStudentCourse } from '../Api/Children'
import Loading from '../Loading/Loading'
import { getNoti } from '../Api/Notification'
import learning from '../assets/Lesson/learning.png'
const KidHome = () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [notiData, setNotiData] = useState([]);
    useEffect(() => {
        fetchInfo();
        fetchNoti();
    }, [])
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
    const fetchNoti = async () => {
        try {
            const data = await getNoti();
            if (data) {
                setNotiData(data.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const [studentCourse, setStudentCourse] = useState([])
    useEffect(() => {
        fetchCourse()
    }, [])

    const fetchCourse = async () => {
        try {
            const contactData = await getStudentCourse();
            if (contactData) {
                setStudentCourse(contactData);
                // console.log("Test data:", contactData);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchCourse();
        } finally {
            setRefreshing(false);
        }
    }, []);
    const renderCourse = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Course', { CourseId: item.courseId }) }}>
            <View style={styles.Course}>
                <Image source={{ uri: item.courseImage }} style={styles.CourseImage} />
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: "white", borderWidth: 1, paddingHorizontal: wp('1%'), paddingVertical: hp('0.5%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('47%') }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#40BFFF',
                            fontSize: wp('3.8%'), marginRight: wp('2%')
                        }}>Class Code:</Text>
                        <Text>{item.classCode}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%'), paddingLeft: wp('1%') }}>
                        <Image source={learning} style={{ width: wp('5%'), height: hp('2%'), marginRight: wp('2.5%') }} />
                        <Text style={styles.Name}>{item.courseName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                        <Text style={{ marginLeft: wp('0.5%'), fontSize: wp('4%'), width: wp('50%'), color: '#40BFFF', fontWeight: '500' }}>{item.teacherName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('1.5%') }}>
                        <ProgressBar progress={item.courseProgress / 100} width={wp('35%')} borderWidth={2} borderColor={'lightblue'} height={(hp('1%'))} />
                        <Text style={{
                            marginLeft: wp('3%'),
                            color: '#40BFFF',
                        }}>{item.courseProgress}%</Text>
                    </View>
                </View>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={{ backgroundColor: '#83AFFA', height: hp('3%'), width: wp('9%'), paddingTop: hp('0.7%'), paddingBottom: hp('3.7%'), marginRight: wp('9%'), borderRadius: 10 }}>
                            {notiData.isRead ? (
                                <Image source={noti} style={[styles.Noti, { marginLeft: wp('2%') }]} />
                            ) : (
                                <Image source={notiIn} style={[styles.Noti, { marginLeft: wp('1.5%') }]} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('KidSearch') }} style={styles.Search}>
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
            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View style={{ flex: 1, paddingLeft: wp('5%') }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingRight: isSmallPhone || isSmallTablet ? wp('5%') : wp('5%'), marginTop: hp('1%'), alignItems: 'center' }}>
                            <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500' }}>Continue Learning</Text>
                        </View>
                        <FlatList
                            data={studentCourse}
                            keyExtractor={item => item.classId}
                            renderItem={renderCourse}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.List}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default KidHome

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
    backPic: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: wp('100%'),
        height: hp('28%'), overflow: 'hidden'
    },
    Course: {
        flexDirection: 'row',
        marginTop: hp('1.5%'),
        borderWidth: 1,
        width: wp('90%'),
        paddingHorizontal: hp('1%'),
        paddingVertical: wp('2%'),
        borderRadius: 10,
        borderColor: '#E9E9E9',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white'

    },
    CourseImage: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 10,
        marginRight: wp('3%')
    },
    List: {
        paddingBottom: hp('1%'),
        paddingLeft: wp('1%')
    },
    Name: {
        fontWeight: 'bold',
        color: '#223263',
        fontSize: isSmallPhone || isSmallTablet ? wp('3.7%') : wp('4.3%'),
        width: isSmallPhone || isSmallTablet ? wp('40%') : wp('40%')
    },
})