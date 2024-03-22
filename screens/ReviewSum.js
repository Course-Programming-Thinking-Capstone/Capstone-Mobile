import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Modal from "react-native-modal";
import warn from '../assets/Payment/warn.png'
import Loading from '../Loading/Loading'
import { Linking } from 'react-native';
import { CreateOrder, CreatePayment } from '../Api/Order';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const ReviewSum = ({ route, navigation }) => {
    const { Name, LessImage, Lecture, Price, payment, selectedStudents } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const momo = async () => {
        try {
            const response = await axios.get('http://shoeshine-001-site1.ftempurl.com/api/payments/momo/');
            const momoAppURI = response.data; // Thiết lập giá trị momoAppURI từ phản hồi

            Linking.canOpenURL(momoAppURI)
                .then((supported) => {
                    if (supported) {
                        Linking.openURL(momoAppURI);
                    } else {
                        Alert.alert("Fails!");
                    }
                })
                .catch((err) => {
                    console.error('Lỗi khi kiểm tra hoặc mở ứng dụng:', err);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [id, setId] = useState([])
    const postOrder = async () => {
        try {
            setLoading1(true);
            const studentId = selectedStudents.map(student => student.id);
            const count = selectedStudents.length
            const success = await CreateOrder(studentId, count);
            if (success) {
                // setId(success)
                navigation.navigate('Success', { Name, LessImage, Lecture, Price, payment, selectedStudents, success })
            } else {
                Alert.alert('Đăng ký thất bại !!!');
            }
        } catch (error) {
            console.error("Error handling add children:", error);
        } finally {
            setLoading1(false);
        }
    };
    const fetchPayment = async () => {
        try {
            const paymentDetail = await CreatePayment(id);
            if (paymentDetail) {
                // setPay(paymentDetail);
                console.log("Thành Công");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.Course}>
                <Image source={LessImage} style={styles.CourseImage} />
                <View>
                    <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('21.9%') }}>
                        <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.1%') }}>Best Seller</Text>
                    </View>
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
                        }}>{parseFloat(Price.replace(/\./g, '').replace(',', '.')).toLocaleString('vi-VN')} đ</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Children Receive <Text style={{ color: 'red', fontWeight: '500' }}>({selectedStudents.length})</Text></Text>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Receive Method</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500' }}>{selectedStudents.map(student => student.fullName).join(', ')}</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500' }}>Zalo , Email</Text>
                    </View>
                </View>
                <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Payment Method</Text>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Voucher</Text>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Quantity</Text>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Amount</Text>
                    </View>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>{payment}</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>0 đ</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>x{selectedStudents.length}</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500' }}>{(Price * (selectedStudents.length)).toLocaleString('vi-VN')} đ</Text>
                    </View>
                </View>
                <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700' }}>Total</Text>
                    </View>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700' }}>{(Price * (selectedStudents.length)).toLocaleString('vi-VN')} đ</Text>
                    </View>
                </View>
                <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />
            </View>
            <View style={styles.Enroll}>
                <TouchableOpacity style={styles.Button} onPress={toggleModal}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Checkout</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal isVisible={isModalVisible} transparent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.Popup}>
                            {/* <View style={{ alignItems: 'center' }}>
                <Image source={warn} style={{ width: wp('22.5%'), height: hp('10%') }} />
              </View> */}
                            <Text style={{ fontSize: wp('5%'), textAlign: 'center', marginTop: hp('1%'), fontWeight: '700', color: '#FF8A00' }}>Do you want to check out ?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('3.5%') }}>
                                <TouchableOpacity style={[styles.Btn, { marginRight: wp('5%') }]} onPress={toggleModal}>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={postOrder} style={[styles.Btn, { backgroundColor: 'red' }]}>
                                    {loading1 ? (
                                        <Loading />
                                    ) : (
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Yes</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default ReviewSum

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%')
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
    Name: {
        width: wp('50%'),
        fontWeight: 'bold',
        color: '#223263',
        fontSize: wp('3.7%')
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
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'yellow',
        borderRadius: 10,
        width: wp('90%'),
        alignItems: 'center',
        height: hp('20%')
    },
    Popup: {
        backgroundColor: '#FCEFC9',
        width: wp('90%'),
        height: hp('20%'),
        borderRadius: 10,
        justifyContent: 'center'
    },
    Btn: {
        backgroundColor: '#40BFFF',
        height: hp('5.5%'),
        width: wp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})