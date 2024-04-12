import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import cong from '../assets/Lesson/cong2.jpg'
import Back from '../assets/Profile/back1.jpg'
import { getUserInfo } from '../Api/Parents';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const AccountDetail = ({ route }) => {
    useEffect(() => {
        fetchInfo()
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
    return (
        <View style={styles.Container}>
            <ImageBackground source={Back} style={{ width: wp('100%'), height: hp('40%') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: wp('6%'), paddingRight: wp('6%'), marginTop: hp('5%') }}>
                </View>
                <View style={styles.DetailForm}>
                </View>
            </ImageBackground>
            <View style={styles.Avt}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={1}>
                        <Image source={cong} style={styles.CircleMen} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: wp('6%'), marginTop: hp('1%'), fontWeight: '500' }}>{userInfo.fullName}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.BorderInfo}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: wp('4.3%') }}>Role</Text>
                            <Text style={{ color: 'orange', fontWeight: '600', fontSize: wp('4.3%') }}>{userInfo.role}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: wp('4.3%') }}>Status</Text>
                            <Text style={{ color: 'orange', fontWeight: '600', fontSize: wp('4.3%') }}>{userInfo.status}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{alignItems:'center'}}>
                <View>
                    <Text style={{ textAlign: "center",fontSize:wp('5%'),fontWeight:'600',marginVertical:hp('3%') }}>Account Details</Text>
                </View>
                <View style={styles.BorderDetail}>
                    <View>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>Email: </Text>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>Phone: </Text>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>Date of Birth: </Text>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>Create Date: </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>{userInfo.email}</Text>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>{userInfo.phoneNumber}</Text>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>{userInfo.dateOfBirth}</Text>
                        <Text style={{lineHeight:hp('5%'),fontSize:wp('4%')}}>{userInfo.createdDate}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AccountDetail

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    CircleMen: {
        width: wp('28%'),
        height: hp('14%'),
        borderRadius: 70,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderWidth: 2,
        borderColor: 'blue'
    },
    DetailForm: {
        backgroundColor: 'white',
        position: 'absolute',
        top: hp('25%'), width: wp('100%'),
        height: hp('68.5%'),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    Avt: {
        marginVertical: hp('2%'),
        position: 'absolute',
        top: hp('16%'),
        alignSelf: 'center',
    },
    BorderInfo: {
        borderWidth: 2,
        width: wp('60%'),
        alignContent: 'center',
        paddingVertical: hp("1%"),
        borderRadius: 10,
        borderColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    },
    BorderDetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 2,
        width: wp('90%'),
        paddingVertical: hp("1%"),
        borderRadius: 10,
        borderColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    }
})