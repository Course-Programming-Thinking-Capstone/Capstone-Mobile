import { StyleSheet, FlatList, Alert, Text, TouchableOpacity, View, Image, TextInput, Modal, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import { SelectList } from 'react-native-dropdown-select-list'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { getStudent, addChildren, getStudentByClassId } from '../Api/Children';
import { getContact } from '../Api/Parents';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox';
import Loading from '../Loading/Loading'
import lich from '../assets/Profile/lich.png'
import { formatPrice } from '../FormatPrice/Format';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ErrorModal from '../Alert/Alert';
const Payment = ({ route, navigation }) => {
    const [name, setName] = useState('')
    const [dob, setDob] = useState(null);
    const [displayText, setDisplayText] = useState('Date of Birth');
    const [checked, setChecked] = React.useState('Thanh An');
    const [info, setInfo] = React.useState('Email');
    const { payment, classCourseId, courseData, classInfo } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const textInputRef = useRef(null);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setDisplayText('Date of Birth'),
            setName('')
    };
    const [selected, setSelected] = React.useState('2');
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    const data = [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' },
    ]
    const [student, setStudent] = useState([])
    const [contact, setContact] = useState([])
    useEffect(() => {
        fetchKid();
        fetchContact();
    }, []);
    const fetchKid = async () => {
        try {
            const studentData = await getStudentByClassId(classCourseId);
            if (studentData) {
                const sortedStudents = studentData.sort((a, b) => b.id - a.id);
                setStudent(sortedStudents);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchContact = async () => {
        try {
            const contactData = await getContact();
            if (contactData) {
                setContact(contactData);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [selectedItems, setSelectedItems] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const toggleSelection = (id, fullName) => {
        let newCount = count;
        const index = selectedItems.indexOf(id);
        if (index !== -1) {
            setSelectedItems(prevState => prevState.filter(item => item !== id));
            setSelectedStudents(prevState => prevState.filter(student => student.id !== id));
            newCount--;
        } else {
            setSelectedItems(prevState => [...prevState, id]);
            setSelectedStudents(prevState => [...prevState, { id, fullName }]);
            newCount++;
        }
        setCount(newCount);
    };
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('2%'), marginTop: hp('1%') }}>
            <TouchableOpacity onPress={() => toggleSelection(item.id, item.fullName)}
                activeOpacity={1} style={[styles.NameKid]}>
                <CheckBox
                    value={selectedItems.includes(item.id)}
                    style={styles.checkbox}
                    onValueChange={() => toggleSelection(item.id, item.fullName)}
                />
                <Text style={{ color: '#212121CC', width: wp('25%'), textAlign: 'center', fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500' }}>{item.fullName}</Text>
            </TouchableOpacity>
        </View>
    )
    const [showDatePicker, setShowDatePicker] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(Platform.OS === 'ios');
        if (currentDate instanceof Date) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            setDob(currentDate);
            setDisplayText(formattedDate);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const handleAddChildren = async () => {
        try {
            setLoading1(true);
            const success = await addChildren(name, dob, selected);
            if (success) {
                toggleModal();
                fetchKid();
                setName('');
                setDob('');
                setSelected('');
            } else {
                Alert.alert('Đăng ký thất bại !!!');
            }
        } catch (error) {
            console.error("Error handling add children:", error);
        } finally {
            setLoading1(false);
        }
    };

    const [modalVisible, setModalDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleContinue = () => {
        if (selectedStudents.length === 0) {
            setErrorMessage('Select at least one student !');
            setModalDisplay(true);
        } else {
            navigation.navigate('PayMethods', { classCourseId, courseData, classInfo, selectedStudents });

        }
    };
    const handleCloseModal = () => {
        setModalDisplay(false);
    }
    return (
        <View style={styles.Container}>
            <View style={styles.AddChild}>
                <Text style={styles.TxtChild}>Student available for class: <Text style={{ color: 'red', fontWeight: '800' }}>({count})</Text></Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.ButChild}>Add</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ height: hp('11%') }}>
                {loading ? (
                    <Loading />
                ) : (student.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: hp('15%') }}>No student data available !</Text>
                ) : (
                    <FlatList
                        data={student}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        numColumns={2}
                    />
                )
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
                            <Text style={{ fontWeight: 500, color: '#212121CC', fontSize: wp('4%') }}>Email</Text>
                            {loading ? (
                                <Loading />
                            ) : (
                                <Text style={{ fontWeight: 700, color: '#FF8A00', fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%') }}>
                                    {/* {contact.email && contact.email.split('@').map((part, index) => (
                                    <Text key={index}>
                                        {index > 0 && <Text>{"\n@"}</Text>}
                                        {part}
                                    </Text>
                                ))} */} {contact.email}
                                </Text>
                            )}
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
                    <Image source={{ uri: courseData.pictureUrl }} style={styles.CourseImage} />
                    <View>
                        <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('42%') }}>
                            <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.5%') }}>Class Code: {classInfo.classCode} </Text>
                        </View>
                        <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('3.5%'), fontWeight: '500', width: wp('50%') }}>{courseData.name}</Text>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                            <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#40BFFF',
                                fontSize: wp('3.8%')
                            }}>{classInfo.teacher}</Text>
                        </View> */}
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
            </View>
            <View style={styles.Enroll}>
                <TouchableOpacity style={styles.Button} onPress={handleContinue}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal visible={isModalVisible} transparent={false} statusBarTranslucent={true} animationType="slide">
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}>
                        <View style={styles.Popup}>
                            <Text style={{ color: 'blue', fontWeight: '500', fontSize: isSmallPhone || isSmallTablet ? wp('5.7%') : wp('6.5%'), textAlign: 'center', width: wp('90%') }}>Add New Child Information</Text>
                            <TouchableOpacity style={styles.Search}
                                activeOpacity={1}
                                onPress={() => textInputRef.current.focus()}>
                                <TextInput
                                    ref={textInputRef}
                                    placeholder="Enter Full Name"
                                    value={name}
                                    onChangeText={text => setName(text)}
                                />
                            </TouchableOpacity>
                            <View style={styles.Search}>
                                <Text>{displayText}</Text>
                                <TouchableOpacity onPress={showDatepicker} style={{ position: "absolute", right: 10 }}>
                                    <Image source={lich} style={{ height: hp('4%'), width: wp('8.5%') }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: wp('82%'), marginTop: hp('3%') }}>
                                <SelectList
                                    setSelected={(val) => {
                                        if (val === 'Male') {
                                            setSelected(1);
                                        } else if (val === 'Female') {
                                            setSelected(2);
                                        } else {
                                            setSelected(1);
                                        }
                                    }}
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
                                <TouchableOpacity style={[styles.Btn, { backgroundColor: 'red' }]} onPress={handleAddChildren}>
                                    {loading1 ? (
                                        <Loading />
                                    ) : (
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Add</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dob || new Date()}
                    mode="date"
                    display="default"
                    minimumDate={new Date(2000, 0, 1)} 
                    maximumDate={new Date(2018, 0, 1)}
                    onChange={onChange}
                />
            )}
            <ErrorModal visible={modalVisible} errorMessage={errorMessage} onClose={handleCloseModal} />
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
        marginBottom: hp('1%')
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
        width: wp('42.5%'),
        borderRadius: 10,
        height: hp('8%'),
        borderColor: '#E9E9E9',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        marginLeft: wp('1%'),
        marginBottom: hp('2%'),
    },
    Account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        width: wp('90%'),
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
        borderWidth: 1, shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: '#e9f2eb'
    }, List: {
        width: wp('92%'),
    },
    checkbox: {
        alignSelf: 'center',
        color: 'blue',
        marginLeft: wp('3%'),
        marginRight: wp('3%')
    },
})