import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ImageBackground, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Audio, Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import open from '../assets/Details/open2.png'
import answer from '../assets/Profile/reading.png'
import quiz from '../assets/Profile/quiz.png'
import game from '../assets/Profile/control.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import background from '../assets/MyCourse/b1.jpg'
const StudyCourse = ({ route, navigation }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
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
    const [currentId, setCurrentId] = useState(route.params.Id);
    const { lessons1 } = route.params;

    const handleItemPress = (itemId) => {
        setCurrentId(itemId);
    };

    const filteredLessons = lessons1.filter(item => item.id !== currentId);
    const render = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item.id)} style={styles.LessBorder}>
            <View style={styles.LessId}>
                <Text>{item.id}</Text>
            </View>
            <View>
                <Text style={{ fontWeight: '600', fontSize: wp('4%') }}>{item.name}</Text>
                <Text style={{ color: '#8A8A8A', fontWeight: 'bold' }}>{item.time}</Text>
            </View>
            {item.status === 'video' ? (
                <TouchableOpacity onPress={() => setShowVideo(true)} style={{ position: 'absolute', right: wp('2%') }}>
                    <Image style={{
                        width: wp('9%'),
                        height: hp('4.51%'),
                    }} source={open} />
                </TouchableOpacity>
            ) : item.status === 'read' ? (
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
    useEffect(() => {
        if (currentId === '03') {
            navigation.navigate('Quiz',{lessons1});
        }
    }, [currentId]);
    return (
        <ScrollView style={styles.container}>
            <View style={{ width: '100%', height: '100%' }}>
                {currentId === '01' ? (
                    <Video
                        source={{ uri: 'https://drive.google.com/uc?id=1_p3K5wsmfZcKzYAzXsmxq50zPRyAVMBO' }}
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
                ) : currentId === '02' ? (
                    <View>
                        <View>
                            <ImageBackground source={background} style={styles.backPic}></ImageBackground>
                        </View>
                        <View style={{ marginLeft: wp('3.5%'), marginTop: hp('2%') }}>
                            <Text style={{ textAlign: 'left', fontSize: wp('4%'), lineHeight: hp('3.5%') }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                        </View>
                    </View>
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