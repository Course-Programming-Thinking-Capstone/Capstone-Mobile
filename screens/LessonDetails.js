import { ImageBackground, Modal, StyleSheet, Text, View, Image, Alert, TouchableOpacity, TextInput, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import teacher from '../assets/Lesson/teacher1.png'
import play from '../assets/Details/play.png'
import certificate from '../assets/Details/Certificate.png'
import star from '../assets/Details/star.png'
import cong from '../assets/Lesson/cong2.jpg'
import mess from '../assets/Details/message.png'
import tele from '../assets/Details/tele.png'
import open from '../assets/Details/open2.png'
import lock from '../assets/Details/padlock.png'
import back1 from '../assets/welcome/back.png'
import share from '../assets/Details/share.png'
import wishlist from '../assets/Details/wishlist.png'
import search from '../assets/HomePage/search.png'
import an from '../assets/Lesson/an.jpg'
import vu from '../assets/Lesson/vu.jpg'
import thien from '../assets/Lesson/thien.jpg'
import star1 from '../assets/Details/star2.png'
import { formatPrice } from '../FormatPrice/Format';
import video from '../assets/MyCourse/video.png'
import { WebView } from 'react-native-webview';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { usePreventScreenCapture } from 'expo-screen-capture';
import PayMethods from './PayMethods';
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getCourse, getCourseById } from '../Api/Course';
import { RadioButton } from 'react-native-paper';
import close from '../assets/welcome/close1.png'
import Loading from '../Loading/Loading'
import ErrorModal from '../Alert/Alert';
import LongContent from '../FormatPrice/FormatText';
const LessonDetails = ({ route }) => {
    const [showVideo, setShowVideo] = useState(false);
    const [payment, setPayment] = React.useState('');
    const [classCourseId, setClassCourseId] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const { Id } = route.params;
    console.log("Test:",Id);
    useEffect(() => {
        fetchClass()
    }, []);
    const lessons1 = [
        { id: '01', name: 'Introduction programming ', time: '10:00', status: 'Open' },
        { id: '02', name: 'Make a Tower Defense Game', time: '5:00', status: 'Close' },
    ];
    const lessons2 = [
        { id: '03', name: 'Scratch 3.0 Tutorial ', time: '10:00', status: 'Close' },
        { id: '04', name: 'Ultimate 2022 Scratch', time: '5:00', status: 'Close' },
        { id: '05', name: 'Create engaging stories', time: '7:00', status: 'Close' },
        { id: '06', name: 'Create simple games', time: '3:00', status: 'Close' },
        { id: '07', name: 'Advanced game program', time: '12:00', status: 'Close' },
    ];
    const lessons3 = [
        { id: '08', name: 'Control smart devices ', time: '10:00', status: 'Close' },
        { id: '09', name: 'Programming traffic lights', time: '5:00', status: 'Close' },
    ];
    const VideoWebView = () => {
        return (
            <View style={{ height: 300, alignItems: 'center' }}>
                <WebView style={{ width: wp('100%'), flex: 1 }}
                    allowsFullscreenVideo
                    source={{ uri: 'https://www.youtube.com/embed/mpSmBuco6I0?si=p1hauMk3VsiiPzzR%22%20title=' }}
                />
            </View>
        );
    };
    const render = ({ item }) => (
        <View style={styles.LessBorder}>
            <View style={styles.LessId}>
                <Text>{item.id}</Text>
            </View>
            <View>
                <Text style={{ fontWeight: '600', fontSize: wp('4%') }}>{item.name}</Text>
                <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{item.time}</Text>
            </View>
            <View
                style={{ position: 'absolute', right: 10, top: 10 }}

            >
                {item.status === 'Open' ? (
                    <TouchableOpacity onPress={() => setShowVideo(true)}>
                        <Image style={{
                            width: wp('9%'),
                            height: hp('4.51%'),
                        }} source={open} />
                    </TouchableOpacity>
                ) : (
                    <Image style={{
                        width: wp('9%'),
                        height: hp('4.5%'),
                    }} source={lock} />
                )}
            </View>
        </View>
    );
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
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'about', title: 'About' },
        { key: 'lessons', title: 'Lessons' },
        // { key: 'reviews', title: 'Reviews' },
    ]);
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
    const closeModal = () => {
        setShowVideo(false);
    };
    const [courseData, setCourseData] = useState([])
    const [classDetail, setClassDetail] = useState([])
    const [selectedClass, setSelectedClass] = useState(null);
    const [classInfo, setClassInfo] = useState([])
    const toggleModal = (selectedClass) => {
        setModalVisible(!isModalVisible);
        setSelectedClass(selectedClass);
    };
    const fetchClass = async () => {
        try {
            const courseData = await getCourseById(Id);
            if (courseData && courseData.classes) {
                setClassDetail(courseData.classes);
                setCourseData(courseData)
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const renderClassItem = ({ item }) => (
        <View style={{ marginBottom: hp('1%'), marginRight: wp('2%') }}>
            <TouchableOpacity key={item.classId} onPress={() => toggleModal(item)} style={[styles.NameKid]}>
                <RadioButton
                    value={item.classCode}
                    status={payment === item.classCode ? 'checked' : 'unchecked'}
                    onPress={() => [setPayment(item.classCode), setClassCourseId(item.classId), setClassInfo(item)]}
                />
                <Text style={{ marginLeft: wp('5%') }}>{item.classCode}</Text>
            </TouchableOpacity>
        </View>
    );
    const [modalVisible, setModalDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleContinue = () => {
        if (!payment || !classCourseId) {
            setErrorMessage('Please select a class!');
            setModalDisplay(true);
        } else {
            navigation.navigate('Payment', { payment, classCourseId, courseData, classInfo });
        }
    }

    const handleCloseModal = () => {
        setModalDisplay(false);
    }
    const renderScene = SceneMap({
        about: () => (
            <View style={{
                paddingRight: wp('7%')
            }}>
                <ScrollView style={{ width: wp('100%'), marginBottom: hp('3%') }}>

                    <View>
                        <Text style={{ fontSize: wp('4%'), fontWeight: '500', marginTop: hp('1%') }}>About Course</Text>
                        <View style={{ paddingRight: wp('3%') }}>
                            <LongContent content={courseData.description} />
                        </View>
                        {/* <Text style={{ marginTop: hp('1%'), color: '#94867D', lineHeight: hp('3%'), width: wp('90%'), fontSize: wp('4%') }}>{courseData.description}</Text> */}
                        <Text style={{ marginTop: hp('2%'), fontSize: wp('4%'), fontWeight: '500', marginBottom: hp('2%') }}>Class Available</Text>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <FlatList
                                data={classDetail}
                                renderItem={renderClassItem}
                                keyExtractor={(item) => item.classId.toString()}
                                scrollEnabled={false}
                                numColumns={2}
                            />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Modal visible={isModalVisible} transparent={false} statusBarTranslucent={true} animationType="slide">
                                    <View style={{
                                        flex: 1, justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    }}>
                                        <TouchableOpacity style={[styles.closeButton, { top: hp('7%'), right: wp('5%') }]} onPress={toggleModal}>
                                            <Image source={close} style={styles.buttonClose} />
                                        </TouchableOpacity>
                                        <View style={styles.Popup}>
                                            <View style={{ backgroundColor: '#327CF7', height: hp('15%'), justifyContent: 'center', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderRadius: 10, marginBottom: hp('2%') }}>
                                                <Text style={{ textAlign: "center", color: 'white', fontWeight: '600', fontSize: wp('7%') }}>Class Detail</Text>
                                            </View>
                                            {selectedClass && (
                                                <View style={{ width: wp('90%'), paddingLeft: wp('3%') }}>
                                                    <Text style={styles.ClassInfo}>Class Code:  <Text></Text><Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5%'), fontWeight: '400', color: 'black' }}>{selectedClass.classCode}</Text></Text>
                                                    <Text style={styles.ClassInfo}>Date Start:  <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5%'), fontWeight: '400', color: 'black' }}>{selectedClass.dayStart}</Text></Text>
                                                    <Text style={styles.ClassInfo}>Date End:  <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5%'), fontWeight: '400', color: 'black' }}>{selectedClass.dayEnd}</Text> </Text>
                                                    <Text style={styles.ClassInfo}>Teacher:  <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5%'), fontWeight: '400', color: 'black' }}>{selectedClass.teacher}</Text> </Text>
                                                    <Text style={styles.ClassInfo}>Study Days:  <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5%'), fontWeight: '400', color: 'black' }}>{selectedClass.days?.join(', ')}</Text> </Text>
                                                    <Text style={styles.ClassInfo}>Slot Time:  <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5%'), fontWeight: '400', color: 'black' }}>{selectedClass.slotStart}-{selectedClass.slotEnd}</Text></Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        ),
        lessons: () => (
            <View >
                <Modal visible={showVideo} animationType="slide" transparent={true} statusBarTranslucent={true}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Image source={close} style={styles.buttonClose} />
                        </TouchableOpacity>
                        <VideoWebView />
                    </View>
                </Modal>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: isSmallPhone || isSmallTablet ? hp('60%') : hp('63%') }}>
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
        // reviews: () => (
        //     <View>
        //         <ScrollView showsVerticalScrollIndicator={false} style={{ height: isSmallPhone || isSmallTablet ? hp('59%') : hp('62%') }}>
        //             <Text style={{ fontSize: wp('4%'), fontWeight: '500', marginTop: hp('1%') }}>Reviews <Text style={{ color: 'blue' }}> (45)</Text></Text>
        //             <View style={styles.Search}>
        //                 <Image source={search} style={styles.SearchIcon} />
        //                 <TextInput
        //                     placeholder="Search in reviews"
        //                 />
        //             </View>
        //             <View style={{ flexDirection: 'row' }}>
        //                 <TouchableOpacity onPress={handlePress} style={[styles.ButtonReview,
        //                 { backgroundColor: isPressed ? '#F4F6F9' : '#327CF7' }]}>
        //                     <Text style={{ color: isPressed ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>All Reviews</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity onPress={handlePress1} style={[styles.ButtonReview,
        //                 { backgroundColor: isPressed1 ? '#F4F6F9' : '#327CF7' }]}>
        //                     <Text style={{ color: isPressed1 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Lasted</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity onPress={handlePress2} style={[styles.ButtonReview,
        //                 { backgroundColor: isPressed2 ? '#F4F6F9' : '#327CF7' }]}>
        //                     <Text style={{ color: isPressed2 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Modify</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity onPress={handlePress3} style={[styles.ButtonReview,
        //                 { backgroundColor: isPressed3 ? '#F4F6F9' : '#327CF7' }]}>
        //                     <Text style={{ color: isPressed3 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Verified</Text>
        //                 </TouchableOpacity>
        //             </View>
        //             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), justifyContent: 'center' }}>
        //                 <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
        //             </View>
        //             <View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
        //                     <Image source={cong} style={styles.CircleMen} />
        //                     <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Lương Thành Công</Text>
        //                     <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
        //                 </View>
        //                 <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
        //                     <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
        //                     <Text style={{ color: '#94867D' }}>5.0</Text>
        //                 </View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
        //                     <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
        //                 </View>
        //             </View>
        //             <View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
        //                     <Image source={thien} style={styles.CircleMen} />
        //                     <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Trần Minh Thiện</Text>
        //                     <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
        //                 </View>
        //                 <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
        //                     <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
        //                     <Text style={{ color: '#94867D' }}>5.0</Text>
        //                 </View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
        //                     <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
        //                 </View>
        //             </View>
        //             <View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
        //                     <Image source={vu} style={styles.CircleMen} />
        //                     <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Nguyễn Tuấn Vũ</Text>
        //                     <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
        //                 </View>
        //                 <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
        //                     <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
        //                     <Text style={{ color: '#94867D' }}>5.0</Text>
        //                 </View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
        //                     <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
        //                 </View>
        //             </View>
        //             <View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%') }}>
        //                     <Image source={an} style={styles.CircleMen} />
        //                     <Text style={{ marginLeft: wp('3%'), fontWeight: '500', fontSize: wp('4%') }}>Thành An</Text>
        //                     <Text style={{ position: 'absolute', right: 0, color: '#94867D', fontWeight: '500' }}>11 months ago</Text>
        //                 </View>
        //                 <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
        //                     <Image source={star1} style={{ width: wp('50%'), height: hp('4%'), position: 'absolute', left: 0 }} />
        //                     <Text style={{ color: '#94867D' }}>5.0</Text>
        //                 </View>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1.5%'), justifyContent: 'center' }}>
        //                     <View style={{ height: wp('0.2%'), width: wp('100%'), backgroundColor: '#E9E9E9' }} />
        //                 </View>
        //             </View>
        //         </ScrollView>
        //     </View>
        // ),
    });
    const goBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.Container}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Loading />
                </View>
            ) : (
                <ImageBackground source={{ uri: courseData.pictureUrl }} style={{ width: wp('100%'), height: hp('40%') }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: wp('6%'), paddingRight: wp('6%'), marginTop: hp('5%') }}>
                        <View style={{ borderRadius: 30, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, width: wp('10%'), alignItems: 'center', height: hp('5%'), justifyContent: 'center' }}>
                            <TouchableOpacity onPress={goBack}>
                                <Image style={{ width: wp('5%'), height: hp('3%') }} source={back1} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.6} style={styles.ButtonVideo} onPress={() => setShowVideo(true)}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={open} style={{ width: wp('8%'), height: hp('4%'), marginRight: wp('3%') }} />
                            <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('3.5%') : wp('4%'), color: 'blue', fontWeight: '500' }}>Course Preview</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.DetailForm}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: '100%' }}
                            renderTabBar={renderTabBar}
                        />
                    </View>
                </ImageBackground>)}
            <View style={styles.Enroll}>
                <View>
                    <Text style={{ color: '#94867D', fontSize: wp('4%'), fontWeight: '700' }}>Total Price</Text>
                    <Text style={{ color: '#327CF7', fontWeight: '800' }}>{formatPrice(courseData.price)}</Text>
                    {/* <Text style={{ color: '#327CF7', fontWeight: '800' }}>{parseFloat(Price.replace(/\./g, '').replace(',', '.')).toLocaleString('vi-VN')} đ</Text> */}
                </View>
                <View style={styles.Button}>
                    <Text onPress={handleContinue} style={{ fontWeight: '800', color: 'white' }}>Enroll Now</Text>
                </View>
            </View>
            <ErrorModal visible={modalVisible} errorMessage={errorMessage} onClose={handleCloseModal} />
        </View>
    )
}

export default LessonDetails

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    DetailForm: {
        backgroundColor: 'white',
        position: 'absolute',
        top: hp('28%'), width: wp('100%'),
        height: hp('68.5%'),
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    Enroll: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0, width: wp('100%'),
        height: hp('10%'),
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingLeft: wp('6.5%'),
        borderColor: '#e9f2eb',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CircleMen: {
        width: wp('13.5%'),
        height: isSmallPhone || isSmallTablet ? hp('6.5%') : hp('6.75%'),
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
        marginRight: wp('5%')
    },
    Button: {
        borderWidth: 1,
        height: hp('6%'),
        width: wp('45%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: hp('1%'), backgroundColor: '#327CF7',
        borderColor: '#e9f2eb'
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
    },
    LessBorder: {
        flexDirection: 'row',
        borderRadius: 30,
        borderColor: '#e9f0f9',
        borderWidth: 2,
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
    ButtonVideo: {
        borderColor: 'rgba(200, 200, 200, 0.8)',
        borderWidth: 1,
        width: wp('45%'),
        marginLeft: wp('25%'),
        marginTop: hp('3%'),
        borderRadius: 20,
        backgroundColor: 'rgba(200, 200, 200, 0.9)',
        paddingVertical: hp('1%'),
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
    NameKid: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        width: wp('42.5%'),
        borderRadius: 10,
        height: hp('8%'),
        borderColor: '#E9E9E9',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        marginLeft: wp('1%'),
        marginBottom: hp('2%'),
    },
    Popup: {
        backgroundColor: 'white',
        width: wp('90%'),
        height: isSmallPhone || isSmallTablet ? hp('82%') : hp('77%'),
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: hp('20%'),
        right: wp('2%')
    },
    ClassInfo: {
        fontSize: isSmallPhone || isSmallTablet ? wp('4.5%') : wp('5.5%'),
        fontWeight: '500',
        color: '#327CF7',
        textAlign: 'left',
        lineHeight: hp('5.5%'),
        borderWidth: 1.5,
        width: wp('83%'),
        marginBottom: hp('2%'),
        borderRadius: 10,
        paddingLeft: wp('2%'),
        marginLeft: wp('1%'),
        marginBottom: hp('2%'),
        borderColor: 'lightblue',
        paddingVertical: hp('1%'),
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
    }
})