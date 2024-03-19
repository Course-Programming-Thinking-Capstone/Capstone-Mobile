import { StyleSheet, FlatList, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getStudent, addChildren } from '../Api/Children';
import CheckBox from 'expo-checkbox';
import Loading from '../Loading/Loading'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const Payment = ({ route, navigation }) => {
    const [checked, setChecked] = React.useState('Thanh An');
    const [info, setInfo] = React.useState('Email');
    const { Name, LessImage, Lecture, Avatar, Price, Id } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [selected, setSelected] = React.useState("");
    const [loading, setLoading] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const data = [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' },
    ]
    const [student, setStudent] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        fetchKid();
    }, []);
    const fetchKid = async () => {
        try {
            const studentData = await getStudent();
            if (studentData) {
                setStudent(studentData);
                setCount(studentData.length)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('2%') }}>
            <View style={[styles.NameKid]}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={{ color: '#212121CC', width: wp('25%'), textAlign: 'center', fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500' }}>{item.fullName}</Text>
            </View>
        </View>
    )
    return (
        <View style={styles.Container}>
            <View style={styles.AddChild}>
                <Text style={styles.TxtChild}>Select children to receive:<Text style={{color:'red',fontWeight:'800'}}>({count})</Text></Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.ButChild}>Add</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ height: hp('11%') }}>
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={student}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        numColumns={2}
                    />
                )}
            </ScrollView>
            <View>
                <Text style={{
                    fontWeight: '500',
                    fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.2%'),
                    color: '#212121CC',
                    marginTop: hp('2%')
                }}>Send the account via:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.Account]}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 600, color: '#212121CC', fontSize: wp('4%') }}>Email</Text>
                            <Text style={{ fontWeight: 700, color: '#FF8A00', fontSize: isSmallPhone || isSmallTablet ? wp('3.5%') : wp('4%') }}>long88ka@gmail.com</Text>
                        </View>
                    </View>
                    <View style={[styles.Account]}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 500, color: '#212121CC', fontSize: wp('4%') }}>Zalo</Text>
                            <Text style={{ fontWeight: 700, color: '#FF8A00', fontSize: isSmallPhone || isSmallTablet ? wp('3.5%') : wp('4%') }}>0397528860</Text>
                        </View>
                    </View>
                </View>
                <Text style={{
                    fontWeight: '500',
                    fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.2%'),
                    color: '#212121CC',
                    marginTop: hp('2%')
                }}>Course Information:</Text>
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
                            }}>{Price}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.Enroll}>
                <TouchableOpacity style={styles.Button} onPress={() => { navigation.navigate('PayMethods', { Name, LessImage, Lecture, Avatar, Price, info, checked }) }}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal isVisible={isModalVisible} transparent={true} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.Popup}>
                            <Text style={{
                                color: 'blue', fontWeight: '500', fontSize: isSmallPhone || isSmallTablet ? wp('4.7%') : wp('5.3%')
                                , textAlign: 'center', width: wp('90%')
                            }}>Add New Children's Information</Text>
                            <View style={styles.Search}>
                                <TextInput
                                    placeholder="Enter Full Name"
                                />
                            </View>
                            <View style={styles.Search}>
                                <TextInput
                                    placeholder="Date Of Birth"
                                />
                            </View>
                            <View style={{ width: wp('82%'), marginTop: hp('3%') }}>
                                <SelectList
                                    setSelected={(val) => setSelected(val)}
                                    data={data}
                                    save="value"
                                    search={false}
                                    defaultOption={{ key: '1', value: 'Male' }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('2.8%') }}>
                                <TouchableOpacity style={[styles.Btn, { marginRight: wp('2.5%') }]} onPress={toggleModal}>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.Btn, { backgroundColor: 'red' }]} onPress={toggleModal}>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%')
    },
    AddChild: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: hp('3%'),
    },
    TxtChild: {
        fontWeight: '500',
        fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.2%')
    }
    ,
    ButChild: {
        fontWeight: '700',
        fontSize: wp('4%'),
        color: '#1A9CB7',

    },
    NameKid: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        width: wp('44%'),
        marginTop: hp('2%'),
        borderRadius: 10,
        borderColor: '#21212133',
        height: hp('8%'),
    },
    Account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        width: wp('44%'),
        marginTop: hp('2%'),
        borderRadius: 10,
        borderColor: '#21212133',
        height: hp('8%'),
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white'
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
    Popup: {
        backgroundColor: 'white',
        width: wp('90%'),
        height: hp('65%'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Btn: {
        backgroundColor: '#40BFFF',
        height: hp('7%'),
        width: wp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    Search: {
        marginTop: hp('3%'),
        width: wp('82%'),
        height: hp('8%'),
        borderColor: '#EFEFEF',
        borderWidth: 1.5,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('2.5%'),
        backgroundColor: 'white',
    }, List: {
        width: wp('92%'),
    },
    checkbox: {
        alignSelf: 'center',
        color: 'blue',
        marginLeft: wp('3%')
    },
})