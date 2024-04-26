import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import answer from '../assets/Profile/reading.png'
import quiz from '../assets/Profile/quiz.png'
import game from '../assets/Profile/control.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { useWindowDimensions } from 'react-native';

import HTML from 'react-native-render-html';
import { getStarted } from '../Api/Progress';
import { getLessonById } from '../Api/Course';
const StudyCourse = ({ route, navigation }) => {
    const { width: windowWidth } = useWindowDimensions();
    const [selectedContent, setSelectedContent] = useState(route.params.Content);
    const [selectedVideo, setSelectedVideo] = useState(route.params.CourseVideo);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentId, setCurrentId] = useState(route.params.Id);
    const [currentType, setCurrentType] = useState(route.params.currentType);
    const { lessons1, Num } = route.params;
    console.log("Num: ", Num);
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
    const fetchLesson = async () => {
        try {
            const leesonData = await getLessonById(currentId);
            if (leesonData) {
                setLess(leesonData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
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
                <Text>{currentId < item.id ? Num + 1 : Num - 1}</Text>
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
            <View style={{ width: wp('100%'), height: hp('50%') }}>
                <ScrollView style={{ flex: 1 }}>
                    {currentType === 'Video' ? (
                        <View>
                            <Video
                                source={{ uri: directUrl }}
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
                        </View>
                    ) : currentType === 'Document' ? (
                        <View style={{ paddingLeft: wp('5%'),paddingRight:wp('2%') }}>
                            {less && less.content ? (
                                <HTML
                                    source={{ html: less.content }}
                                    contentWidth={windowWidth}
                                    tagsStyles={{
                                        p: { fontSize: wp('3.5%') },
                                        h1: { fontSize: wp('5%') },
                                        h2: { fontSize: wp('5%')},
                                        h3: { fontSize: wp('5%') },
                                    }}
                                />
                            ) : null}
                        </View>
                    ) : null}
                </ScrollView>
            </View>
            <View style={{ marginLeft: wp('2%'), marginRight: wp('2%'), marginTop: hp('2%') }}>
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
        width: wp('100%'),
        height: hp('29%'),
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
})