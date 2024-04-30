import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import warn from '../assets/Payment/warn.png'
import Loading from '../Loading/Loading'
import { Linking } from 'react-native';
import { CreateOrder, CreatePayment } from '../Api/Order';
import { formatPrice } from '../FormatPrice/Format';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const ReviewSum = ({ route, navigation }) => {
    const { classCourseId, courseData, classInfo,selectedStudents,payment,voucherId,voucherDis } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [courseId, setCourseId] = useState(route.params.courseData.id);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [id, setId] = useState([])
    const postOrder = async () => {
        try {
            setLoading1(true);
            const studentId = selectedStudents.map(student => student.id);
            const count = selectedStudents.length
            const success = await CreateOrder(studentId, count, courseId, classCourseId,voucherId);
            if (success) {
                const paymentDetail = await CreatePayment(success);
                if (paymentDetail) {
                    Linking.canOpenURL(paymentDetail.payUrl)
                        .then((supported) => {
                            if (supported) {
                                Linking.openURL(paymentDetail.payUrl);
                            } else {
                                Alert.alert("Fails!");
                            }
                        })
                        .catch((err) => {
                            console.error('Lỗi khi kiểm tra hoặc mở ứng dụng:', err);
                        });
                    navigation.navigate('Success', { classCourseId, courseData, classInfo,selectedStudents,payment,success })
                }
            } else {
                Alert.alert('thất bại !!!');
            }
        } catch (error) {
            console.error("Error handling add children:", error);
        } finally {
            setLoading1(false);
        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.Course}>
                <Image source={{ uri: courseData.pictureUrl }} style={styles.CourseImage} />
                <View>
                    <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('21.9%') }}>
                        <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.1%') }}>Best Seller</Text>
                    </View>
                    <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('3.5%'), fontWeight: '500', width: wp('50%') }}>{courseData.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#40BFFF',
                            fontSize: wp('3.8%')
                        }}>{classInfo?.teacher}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'blue',
                            fontSize: wp('3.8%')
                        }}>
                            {formatPrice(courseData.price)}
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ height: hp('48%') }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Children Receive <Text style={{ color: 'red', fontWeight: '500' }}>({selectedStudents.length})</Text></Text>
                        <View>
                            {selectedStudents.map((student, index) => (
                                <Text
                                    key={index}
                                    style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}
                                >
                                    {student.fullName}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Class Code</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500' }}>{classInfo.classCode}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                        <Text style={{ lineHeight: hp('4%'), color: '#40BFFF', fontWeight: '500' }}>Receive Method</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500' }}> Email</Text>
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
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}> {voucherDis ? formatPrice(voucherDis) : '0 đ'}</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>x{selectedStudents.length}</Text>
                        <Text style={{ lineHeight: hp('4%'), color: 'black', fontWeight: '500', textAlign: 'right' }}>{formatPrice(courseData.price*selectedStudents.length)}</Text>
                    </View>
                </View>
                <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: '#E9E9E9', marginTop: hp('2%') }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700' }}>Total</Text>
                    </View>
                    <View>
                        <Text style={{ lineHeight: hp('4%'), color: 'red', fontWeight: '700' }}>{formatPrice((courseData.price) * (selectedStudents.length)-voucherDis)}</Text>
                    </View>
                </View>
            </ScrollView >
            <View style={styles.Enroll}>
                <TouchableOpacity style={styles.Button} onPress={toggleModal}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Checkout</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal visible={isModalVisible} transparent={true} statusBarTranslucent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={styles.Popup}>
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