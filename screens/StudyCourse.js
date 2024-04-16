import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import answer from '../assets/Profile/reading.png'
import quiz from '../assets/Profile/quiz.png'
import game from '../assets/Profile/control.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
const StudyCourse = ({ route, navigation }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentId, setCurrentId] = useState(route.params.Id);
    const [currentType, setCurrentType] = useState(route.params.currentType);
    const { lessons1, Content, CourseVideo } = route.params;
    console.log("Cong test; ", CourseVideo);
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

    const handleItemPress = (itemId, itemType) => {
        setCurrentId(itemId);
        setCurrentType(itemType);
    };

    const filteredLessons = lessons1.filter(item => item.id !== currentId);

    const render = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => handleItemPress(item.id, item.type)} style={styles.LessBorder}>
            <View style={styles.LessId}>
                <Text>{item.order}</Text>
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
            ) : item.status === 'quiz' ? (
                <Image style={{
                    width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
                    height: hp('4.5%'),
                    position: 'absolute', right: wp('2%')
                }} source={quiz} />
            ) : (
                <Image style={{
                    width: isSmallPhone || isSmallTablet ? wp('9.4%') : wp('9%'),
                    height: hp('4.5%'),
                    position: 'absolute', right: wp('2%')
                }} source={game} />
            )
            }
        </TouchableOpacity>
    );

    const sanitizedContent = Content?.replace(/<\/?([hp])[^>]*>/g, '')
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

    const driveUrl = CourseVideo;
    const directUrl = convertDriveUrlToDirectUrl(driveUrl);
    return (
        <ScrollView style={styles.container}>
            <View style={{ width: '100%', height: '100%' }}>
                {currentType === 'Video' ? (
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
                ) : currentType === 'Document' ? (
                    <ScrollView style={{ flex: 1, paddingLeft: wp('5%'), paddingRight: wp('2%') }}>
                        <Text style={{ lineHeight: hp('3%'), textAlign: 'left', fontSize: wp('4.5%') }}>{sanitizedContent}</Text>
                    </ScrollView>

                ) : null}
                <View style={{ marginTop: hp('2%'), marginLeft: wp('2%'), marginRight: wp('2%') }}>
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
        </ScrollView>
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