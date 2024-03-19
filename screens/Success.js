import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import success from '../assets/Payment/Success.png'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Modal from "react-native-modal";
import warn from '../assets/Payment/warn.png'
import close from '../assets/welcome/close1.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Success = ({ navigation, route }) => {
    const { Name, LessImage, Lecture, Price, payment, info, checked } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.Container}>
            <View style={{ alignItems: 'center',marginTop:hp('10%') }}>
                <Image style={styles.Icon} source={success} />
                <Text style={{ color: '#FF8A00', fontWeight: '600', fontSize: wp('6.5%'), marginBottom: hp('1%') }}>Thanks you purchased</Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center', fontSize: wp('5%'), marginBottom: hp('1%'), fontWeight: '500' }}>{Price}</Text>
                <Text style={{ fontSize: wp('5%'), textAlign: 'center' }}>Your order code : 123465782</Text>
            </View>
            <View style={styles.Course}>
                <Image source={LessImage} style={styles.CourseImage} />
                <View>
                    <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500' }}>{Name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#40BFFF',
                            fontSize: wp('3.8%')
                        }}>{Lecture}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'blue',
                            fontSize: wp('3.8%')
                        }}>{Price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderColor: "white", borderWidth: 1, paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('30%') }}>
                        <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.8%'), marginLeft: wp('1.5%') }}>Quantity : </Text>
                        <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.8%') }}>2</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: hp('0.3%'), width: wp('90%'), backgroundColor: '#E9E9E9' }} />
            <View style={styles.Order}>
                <Text style={{ fontWeight: '500', fontSize: isSmallPhone || isSmallTablet ? wp('3.7%'): wp('4.3%') }}>For more details about your order</Text>
                <TouchableOpacity style={styles.Btn1} onPress={toggleModal}>
                    <Text style={{ fontWeight: '400', fontSize: wp('3.7%'), color: 'blue' }}>View Order</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Enroll}>
                <TouchableOpacity style={styles.Button} onPress={() => { navigation.navigate('HomePage') }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Back to HomePage</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal isVisible={isModalVisible} transparent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <Image source={close} style={styles.buttonClose} />
                        </TouchableOpacity>
                        <View style={styles.Popup}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                                <View>
                                    <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%') }}>Children Receive</Text>
                                    <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>Receive Method</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>{checked}</Text>
                                    <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>Zalo , Email</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('83%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                                <View>
                                    <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>Payment Method</Text>
                                    <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>Voucher</Text>
                                    <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>Amount</Text>
                                </View>
                                <View>
                                    <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>{payment}</Text>
                                    <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>0 đ</Text>
                                    <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>{Price}</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('83%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                                <View>
                                    <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>Total</Text>
                                </View>
                                <View>
                                    <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700',fontSize: isSmallPhone || isSmallTablet ? wp('3.8%'): wp('4.3%')  }}>{Price}</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('83%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default Success

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        justifyContent:'center'
    },
    Icon: {
        width: isSmallPhone || isSmallTablet ? wp('31%'): wp('30%'),
        height: hp('15%'),
        marginBottom: hp('5%')
    },
    Course: {
        flexDirection: 'row',
        marginTop: hp('1.5%'),
        borderWidth: 2,
        width: wp('90%'),
        paddingHorizontal: hp('1%'),
        paddingVertical: wp('2%'),
        borderRadius: 10,
        borderColor: '#E9E9E9',
        alignItems: 'center',
        marginBottom: hp('2%'),
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation:5,
        backgroundColor:'white'
    },
    CourseImage: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 10,
        marginRight: wp('3%')
    },
    Name: {
        width: wp('50%'),
        fontWeight: 'bold',
        color: '#223263',
        fontSize: wp('3.7%')
    },
    Order: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('1.5%'),
        alignItems: 'center'
    },
    Btn1: {
        borderWidth: 0.7,
        borderColor: "#1A9CB7",
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('0.5%'),
        borderRadius:5
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
    Button: {
        borderWidth: 1,
        height: hp('7%'),
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: hp('1%'), backgroundColor: '#327CF7',
        borderColor: '#e9f2eb'
    },
    Popup: {
        backgroundColor: 'white',
        width: wp('90%'),
        height: isSmallPhone || isSmallTablet ? hp('45%'): hp('40%'),
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: wp('3%'),
        paddingRight: wp('3%')
    },
    Btn: {
        backgroundColor: '#40BFFF',
        height: hp('7%'),
        width: wp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonClose: {
        width: wp('4%'),
        height: hp('2%'),
    },
    closeButton: {
        position: 'absolute',
        top: hp('20%'),
        right: wp('2%')
    }
})