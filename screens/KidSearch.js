import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import search from '../assets/HomePage/search.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import learning from '../assets/Lesson/learning.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { formatPrice } from '../FormatPrice/Format';
import { getStudentCourse } from '../Api/Children';
import ProgressBar from 'react-native-progress/Bar';
const KidSearch = ({ navigation }) => {
    const textInputRef = useRef(null);
    const [studentClass, setStudentClass] = useState([])
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchClass()
    }, [])
    const fetchClass = async () => {
        try {
            const classData = await getStudentCourse();
            if (classData) {
                setStudentClass(classData);
                // setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(studentClass);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text === '') {
            setFilteredData([]);
        } else {
            const newData = studentClass.filter((item) => {
                const itemName = item.courseName.toLowerCase();
                const searchText = text.toLowerCase();
                return itemName.includes(searchText);
            });
            setFilteredData(newData);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Course', { CourseId: item.courseId }) }}>
            <View style={styles.Course}>
                <Image source={{ uri: item.courseImage }} style={styles.CourseImage} />
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('47%') }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#40BFFF',
                            fontSize: wp('3.8%'), marginRight: wp('2%')
                        }}>Class Code:</Text>
                        <Text>{item.classCode}</Text>
                    </View>
                    <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500', width: wp('50%') }}>{item.courseName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%'), marginLeft: wp('2%') }}>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('1.5%') }}>
                        <ProgressBar progress={item.courseProgress} width={wp('35%')} borderWidth={1} height={(hp('1%'))} />
                        <Text style={{
                            marginLeft: wp('3%'),
                            color: '#40BFFF',
                        }}>{item.courseProgress}/25</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.Search}
                activeOpacity={1}
                onPress={() => textInputRef.current.focus()}>
                <Image source={search} style={styles.SearchIcon} />
                <TextInput
                    ref={textInputRef}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    placeholder="Search by name"
                />
            </TouchableOpacity>
            {searchQuery === '' || filteredData.length === 0 && (
                <Text style={{ textAlign: "center", fontSize: wp('4.5%'), marginTop: hp('5%'), fontWeight: 500, }}>No search result !</Text>
            )}
            {searchQuery !== '' && (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.classId}
                    contentContainerStyle={styles.List}
                />
            )}
        </View>
    );
};

export default KidSearch;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('4%')
    },
    SearchIcon: {
        width: wp('5.2%'),
        height: hp('2.5%'),
        marginRight: wp('3%'),
    },
    Search: {
        marginRight: wp('4%'),
        width: wp('90%'),
        height: hp('6.3%'),
        borderColor: '#EFEFEF',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('2.5%'),
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        backgroundColor: 'white',
        marginRight: wp('3%'),
        elevation: 5,
        marginTop: hp('1%'), marginLeft: wp('1%')
    },
    Course: {
        flexDirection: 'row',
        marginTop: hp('1.5%'),
        borderWidth: 1,
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
        backgroundColor: 'white',
    },
    Image: {
        width: wp('40%'),
        height: hp('15%'),
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
        marginRight: wp('2.5%')
    },
    Name: {
        width: wp('35%'),
        fontWeight: 'bold',
        color: '#223263',
        fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.7%')
    },
    Location: {
        fontWeight: 'bold',
        color: '#40BFFF',
        fontSize: wp('4%'),
    },
    CourseImage: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 10,
        marginRight: wp('3%')
    },
    List: {
        paddingBottom: hp('1%'),
        paddingLeft: wp('1%')
    }
})
