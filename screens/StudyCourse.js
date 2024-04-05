import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Audio, Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const StudyCourse = () => {
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

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '100%' }}>
                <Video
                    source={{ uri: 'https://drive.google.com/uc?id=1_p3K5wsmfZcKzYAzXsmxq50zPRyAVMBO' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    isLooping
                    style={styles.video}
                    useNativeControls
                    onFullscreenUpdate={(event) => handleFullscreenUpdate(event.fullscreenUpdate)}
                />
            </View>
        </View>
    );
};





export default StudyCourse

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        width: wp('100%'),
        height: hp('29%'),
    },
})