import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import search from '../assets/HomePage/search.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import learning from '../assets/Lesson/learning.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const SearchLesson = ({ navigation }) => {
    const textInputRef = useRef(null);
    const Near = [
        { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1500000', image: require('../assets/Lesson/kid1.jpg'), avatar: require('../assets/Lesson/cong2.jpg') },
        { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1500000', image: require('../assets/Lesson/kid2.jpg'), avatar: require('../assets/Lesson/an.jpg') },
        { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2000000', image: require('../assets/Lesson/kid3.jpg'), avatar: require('../assets/Lesson/vu.jpg') },
        { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2500000', image: require('../assets/Lesson/kid4.jpg'), avatar: require('../assets/Lesson/thien.jpg') },
        { id: '5', name: 'Lập trình with C', teacher: 'CongLT', price: '1500000', image: require('../assets/Lesson/kid3.jpg') },
        { id: '6', name: 'Lập trình with C', teacher: 'CongLT', price: '1500000', image: require('../assets/Lesson/kid1.jpg') },
    ];
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(Near);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text === '') {
            setFilteredData([]);
        } else {
            const newData = Near.filter((item) => {
                const itemName = item.name.toLowerCase();
                const searchText = text.toLowerCase();
                return itemName.includes(searchText);
            });
            setFilteredData(newData);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.Course} onPress={() => {
            navigation.navigate('LessonDetails', { Name: item.name, LessImage: item.image, Lecture: item.teacher, Avatar: item.avatar, Price: item.price, Id: item.id })
        }}>
            <Image source={item.image} style={styles.CourseImage} />
            <View>
                <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('21.9%') }}>
                    <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.1%') }}>Best Seller</Text>
                </View>
                <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                    <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#40BFFF',
                        fontSize: wp('3.8%')
                    }}>{item.teacher}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                    <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'blue',
                        fontSize: isSmallPhone || isSmallTablet ? wp('3.4%') : wp('3.8%')
                    }}>
                        {parseFloat(item.price.replace(/\./g, '').replace(',', '.')).toLocaleString('vi-VN')} đ
                    </Text>
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
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.List}

                />
            )}
        </View>
    );
};

export default SearchLesson;
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
        width: wp('50.3%'),
        height: hp('15%'),
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
    },
    Name: {
        width: wp('50%'),
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
