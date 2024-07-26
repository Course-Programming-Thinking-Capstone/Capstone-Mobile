import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, Button, ImageBackground, Alert } from 'react-native';
import { Video } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import answer from '../assets/Profile/reading.png'
import readBack from '../assets/Quiz/stduy.jpg'
import videoBack from '../assets/Quiz/stduy3.jpg'


import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { useWindowDimensions } from 'react-native';

import HTML from 'react-native-render-html';
import { getStarted } from '../Api/Progress';
import { getLessonById, markLesson } from '../Api/Course';
import Loading from '../Loading/Loading';

const StudyCourse = ({ route, navigation }) => {
    // usePreventScreenCapture();
    const { width: windowWidth } = useWindowDimensions();
    const [selectedContent, setSelectedContent] = useState(route.params.Content);
    const [selectedVideo, setSelectedVideo] = useState(route.params.CourseVideo);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentId, setCurrentId] = useState(route.params.Id);
    const [currentType, setCurrentType] = useState(route.params.currentType);
    const { lessons1, Num } = route.params;
    const [buttonText, setButtonText] = useState('Mark As Complete');
    const [buttonDoc, setButtonDoc] = useState('Mark As Complete');
    const [loading, setLoading] = useState(true);
    const handleFullscreenUpdate = async (fullscreenUpdate) => {
        if (fullscreenUpdate === 0 || fullscreenUpdate === 1) {
            setIsFullscreen(true);
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
            setIsFullscreen(false);
            await ScreenOrientation.unlockAsync();
        }
    };
    useEffect(() => {
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);
    useEffect(() => {
        if (currentType === 'Video' || currentType === 'Document') {
            fetchLesson()
        }
    }, [currentType])
    const [less, setLess] = useState([]);
    const [isComplete1, setIsComplete] = useState();
    const [video, setVideo] = useState([]);

    const fetchLesson = async () => {
        try { 
            const leesonData = await getLessonById(currentId);
            if (leesonData) {
                setLess(leesonData);
                setVideo(leesonData.resourceUrl)
                setIsComplete(leesonData.isComplete)
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const FetchMarkLess = async () => {
        try {
            const mark = await markLesson(currentId);
            if (mark) {
                setButtonText('Complete');
            } else {
                Alert.alert('Đăng ký thất bại !!!');
            }
        } catch (error) {
            console.error("Error handling add children:", error);
        } finally {
        }
    };
    const FetchMarkDoc = async () => {
        try {
            const mark = await markLesson(currentId);
            if (mark) {
                setButtonDoc('Complete');
            } else {
                Alert.alert('Đăng ký thất bại !!!');
            }
        } catch (error) {
            console.error("Error handling add children:", error);
        } finally {
        }
    };
    const handleItemPress = (itemId, itemType, itemContent, itemVideo) => {
        setCurrentId(itemId);
        setCurrentType(itemType);
        setSelectedContent(itemContent);
        setSelectedVideo(itemVideo)
    };
    function convertDriveUrlToDirectUrl(driveUrl) {
        const regex = /\/file\/d\/(.+?)\/preview/;
        const match = driveUrl?.match(regex);
        if (match && match.length > 1) {
            const fileId = match[1];
            return `https://drive.google.com/uc?id=${fileId}`;
        } else {
            return null;
        }
    }
    const filteredLessons = lessons1.filter(item => item.id !== currentId);
    const directUrl = currentType === 'Video' ? convertDriveUrlToDirectUrl(less.resourceUrl) : null;
    const render = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => handleItemPress(item.id, item.type, item.content, item.resourceUrl)} style={styles.LessBorder}>
            <View style={styles.LessId}>
                <Text>{currentId < item.id ? item.id : currentId - 1}</Text>
            </View>
            <View>
                <Text style={{ fontWeight: '600', fontSize: wp('4%'), width: wp('70%') }}>{item.name}</Text>
                <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{item.duration}:00</Text>
            </View>
            {(item.type === 'Video' && currentType === 'Video') || (currentType !== 'Video') ? (
                <TouchableOpacity onPress={() => setShowVideo(true)} style={{ position: 'absolute', right: wp('2%') }}>
                    <Image style={{
                        width: wp('9%'),
                        height: hp('4.51%'),
                    }} source={open} />
                </TouchableOpacity>
            ) : (item.type === 'Document' && currentType === 'Document') || (currentType !== 'Document') ? (
                <Image style={{
                    width: wp('9%'),
                    height: hp('4.5%'),
                    position: 'absolute', right: wp('2%')
                }} source={answer} />
            ) : null
            }
        </TouchableOpacity>
    );
    return (
        <View key={currentId} style={styles.container}>
            <View style={{ width: wp('100%'), height: hp('70%') }}>
                {loading ? (
                    <View style={{flex:1,justifyContent:"center"}}>
                        <Loading />
                    </View>
                ) : (
                    <ScrollView style={{ flex: 1 }}>
                        {currentType === 'Video' ? (
                            <ImageBackground source={readBack} style={{ width: wp('100%'), height: hp('70%') }}>
                                <View style={{ paddingLeft: wp('10%') }}>
                                    <Video
                                        source={{ uri: video }}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="cover"
                                        isLooping
                                        shouldPlay
                                        style={styles.video}
                                        useNativeControls
                                        onFullscreenUpdate={(event) => handleFullscreenUpdate(event.fullscreenUpdate)}
                                    />
                                    <View style={{ alignItems: 'center', marginRight: wp('5%'), marginTop: hp('5%') }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!isComplete1) {
                                                    FetchMarkDoc();
                                                }
                                            }}
                                            disabled={isComplete1}
                                            style={[
                                                styles.LessBorder,
                                                {
                                                    width: wp('50%'),
                                                    justifyContent: 'center',
                                                    paddingLeft: 0,
                                                    backgroundColor:  'orange',
                                                },
                                            ]}
                                        >
                                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '800' }}>
                                                {isComplete1 ? 'Complete' : buttonDoc}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        ) : currentType === 'Document' ? (
                            <ImageBackground source={readBack} style={{ height: hp('70%') }}>
                                <View style={{ paddingLeft: wp('10%'), width: wp('90%'), marginTop: hp('2%') }}>
                                    {less && less.content ? (
                                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: hp('55%'), marginTop: hp('2%') }}>
                                            <HTML
                                                source={{ html: less.content }}
                                                contentWidth={windowWidth}
                                                tagsStyles={{
                                                    p: { fontSize: wp('3.5%') },
                                                    h1: { fontSize: wp('5%') },
                                                    h2: { fontSize: wp('5%') },
                                                    h3: { fontSize: wp('5%') },
                                                }}
                                            />
                                            <View style={{ alignItems: 'center', marginRight: wp('2%'), marginTop: hp('3%') }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (!isComplete1) {
                                                            FetchMarkLess();
                                                        }
                                                    }}
                                                    disabled={isComplete1}
                                                    style={[
                                                        styles.LessBorder,
                                                        {
                                                            width: wp('50%'),
                                                            justifyContent: 'center',
                                                            paddingLeft: 0,
                                                            backgroundColor: 'orange',
                                                        },
                                                    ]}
                                                >
                                                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '800' }}>
                                                        {isComplete1 ? 'Complete' : buttonText}
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                        </ScrollView>
                                    ) : null}

                                </View>
                            </ImageBackground>
                        ) : null}
                    </ScrollView>
                )}
            </View>
            <View style={{ marginLeft: wp('2%'), marginRight: wp('2%') }}>
                <Text style={{ marginBottom: hp('2%'), fontSize: wp('4%'), marginLeft: wp('2%'), fontWeight: '500', color: 'blue' }}>Next Lesson:</Text>
                <FlatList
                    data={filteredLessons}
                    renderItem={render}
                    keyExtractor={item => item.id}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        </View>
    );
};
export default StudyCourse

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    video: {
        width: wp('80%'),
        height: hp('30%'),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        marginTop: hp('5%')
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
    backPic: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: wp('100%'),
        height: hp('28%'), overflow: 'hidden'
    },
    BorderDoc: {
        // borderColor:'red', 
        width: wp('80%'),
        borderWidth: 1,
        borderRadius: 10,
        alignContent: 'center',
        marginLeft: wp('2%'),
        paddingLeft: wp('4%'),
        paddingRight: wp('2%'),
        marginTop: hp('2%'),
        borderColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white'
    }
})