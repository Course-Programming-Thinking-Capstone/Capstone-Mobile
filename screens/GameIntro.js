import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import game from '../assets/Game/game5.jpg'
import back1 from '../assets/welcome/back.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const GameIntro = ({ navigation, route }) => {
    const { CourseId } = route.params;
    const goBack = () => {
        navigation.navigate('Course',{CourseId});
    };
    const handlePress = () => {
        Linking.openURL('https://kidspro-capstone.github.io/Capstone-Game-WebGL/');
    };
    return (
        <View style={styles.Container}>
            <ImageBackground source={game} style={{ width: wp('100%'), height: isSmallPhone || isSmallTablet ? hp('63%') : hp('74%') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: wp('6%'), paddingRight: wp('6%'), marginTop: hp('5%') }}>
                    <View style={{ borderRadius: 30, borderColor: 'white', backgroundColor: 'rgba(200, 200, 200, 0.4)', borderWidth: 1, width: wp('10%'), alignItems: 'center', height: hp('5%'), justifyContent: 'center' }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image style={{ width: wp('5%'), height: hp('3%') }} source={back1} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.DetailForm}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('3%'), paddingLeft: wp('2.4%'), paddingRight: wp('2%') }}>
                        <View>
                            <Text style={styles.TxtGame}>KidsPro Gaming</Text>
                        </View>
                        <View>
                            <Text style={[styles.TxtGame, { color: 'blue' }]}>4-5 years old</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: hp('2%'), alignItems: 'center', paddingLeft: wp('2%') }}>
                        <Text style={{ lineHeight: hp('3.5%'), fontSize: wp('4.2%'), textAlign: 'left' }}>Game listings on StartPlaying can be a tricky monster to grapple. You’re given a blank box and free reign to put whatever you want in it. This is by design, because only you can say what kind of game experience you want to deliver. However, that also leaves lots of room for error? </Text>
                    </View>
                    <TouchableOpacity style={styles.BtnPlay} onPress={handlePress}>
                        <Text style={{ color: 'white', fontSize: wp('4.5%') }}>Play Now !</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default GameIntro

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    DetailForm: {
        backgroundColor: 'white',
        position: 'absolute',
        top: isSmallPhone || isSmallTablet ? hp('55%') : hp('65%'),
        width: wp('100%'),
        height: hp('68.5%'),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    TxtGame: {
        fontSize: wp("5%"),
        color: 'red',
        fontWeight: '600'
    },
    BtnPlay: {
        borderWidth: 1,
        height: hp('7%'),
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: hp('3%'),
        backgroundColor: '#327CF7',
        borderColor: '#e9f2eb',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
    }
})