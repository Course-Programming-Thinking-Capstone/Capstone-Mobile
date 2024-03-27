import { StyleSheet, Modal, Text, View, TouchableOpacity, Image, TextInput, FlatList, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import boy from '../assets/Profile/boy.png'
import lich from '../assets/Profile/lich.png'
import right from '../assets/HomePage/right.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import Loading from '../Loading/Loading'
import { getStudent, addChildren } from '../Api/Children';
const ChildProcess = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    const [dob, setDob] = useState(null);
    const [displayText, setDisplayText] = useState('Date of Birth');
    const [student, setStudent] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = React.useState('2');
    const [name, setName] = useState('')
    const textInputRef = useRef(null);
    const data = [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' },
    ]
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setDisplayText('Date of Birth'),
            setName('')
    };
    useEffect(() => {
        fetchKid();
    }, []);

    const fetchKid = async () => {
        try {
            const studentData = await getStudent();
            if (studentData) {
                const sortedStudents = studentData.sort((a, b) => b.id - a.id);
                setStudent(sortedStudents);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
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
    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
            navigation.navigate('ChildDetail', {
                name: item.fullName,
                age: item.age,
                image: item.image,
                id: item.id,
                gender: item.gender,
                birth: item.dateOfBirth
            })
        }}>
            <View style={{
                flexDirection: 'row', paddingVertical: hp('1.2%'), borderRadius: 10, marginTop: hp('2%'), justifyContent: 'space-between', marginBottom: hp('2%'), paddingLeft: wp('2%'), borderWidth: 1, shadowColor: 'black',
                shadowOpacity: 0.9,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 20,
                elevation: 5,
                backgroundColor: '#e9f2eb',
                borderColor: '#e9f2eb',
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View >
                        <Image source={boy} style={styles.CircleMen} />
                    </View>
                    <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500', alignSelf: 'center', marginLeft: wp('5%'), width: wp('25%') }}>{item.fullName}</Text>
                </View>
                <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500', alignSelf: 'center', marginLeft: wp('5%') }}>{item.age} years old</Text>
                <Image source={right} style={{ width: wp('6%'), height: hp('3.5%'), alignSelf: 'center', marginRight: wp('3%') }} />
            </View>
        </TouchableOpacity>
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
    return (
        <View style={styles.Container}>
            <ScrollView style={{ height: hp('75%') }} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={student}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        contentContainerStyle={styles.List}
                    />
                )}
            </ScrollView>
            <View style={styles.Enroll}>
                <TouchableOpacity style={styles.Button} onPress={toggleModal}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Add New Children</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal visible={isModalVisible} transparent={false} statusBarTranslucent={true} animationType='slide'>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={styles.Popup}>
                            <Text style={{ color: 'blue', fontWeight: '500', fontSize: isSmallPhone || isSmallTablet ? wp('6%') : wp('7%'), textAlign: 'center', width: wp('90%') }}>Add New Child Information</Text>
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
                    minimumDate={new Date(1950, 0, 1)}
                    maximumDate={new Date()}
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export default ChildProcess

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    CircleMen: {
        width: wp('15.5%'),
        height: hp('7.5%'),
        borderRadius: 30,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF'
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
        marginTop: hp('1%'), backgroundColor: 'blue',
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
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('2.5%'),
        borderWidth: 1, shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: '#e9f2eb'
    },
    List: {
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: 50,
        marginHorizontal: 5,
        textAlign: 'center',
    },
})