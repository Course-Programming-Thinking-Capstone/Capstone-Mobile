import { StyleSheet, Text, View, TouchableOpacity,FlatList, Pressable,Image } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from '@expo/vector-icons/Ionicons';
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import { useNavigation } from "@react-navigation/native";

const BookMark = ({ route }) => {
  const navigation = useNavigation();

    const [isPressed1, setIsPressed1] = useState(true);
    const [isPressed2, setIsPressed2] = useState(true);
    const [isPressed3, setIsPressed3] = useState(true);

    const [isPressed, setIsPressed] = useState(true);
    const handlePress = () => {
        setIsPressed(!isPressed);
    };
    const handlePress1 = () => {
        setIsPressed1(!isPressed1);
    };
    const handlePress2 = () => {
        setIsPressed2(!isPressed2);
    };
    const handlePress3 = () => {
        setIsPressed3(!isPressed3);
    };
    const Near = [
        { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1.500.000 VND', image: require('../assets/Lesson/kid1.jpg'), avatar: require('../assets/Lesson/cong2.jpg') },
        { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1.500.000 VND', image: require('../assets/Lesson/kid2.jpg'), avatar: require('../assets/Lesson/an.jpg') },
        { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2.000.000 VND', image: require('../assets/Lesson/kid3.jpg'), avatar: require('../assets/Lesson/vu.jpg') },
        { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2.500.000 VND', image: require('../assets/Lesson/kid4.jpg'), avatar: require('../assets/Lesson/thien.jpg') },
        { id: '5', name: 'Lập trình with C', teacher: 'CongLT', price: '1.500.000 VND' },
        { id: '6', name: 'Lập trình with C', teacher: 'CongLT', price: '1.500.000 VND' },
    ];
    const numberOfItems = 4; // Render component number
    const limitedNear = Near.slice(0, numberOfItems);
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('LessonDetails', { Name: item.name, LessImage: item.image, Lecture: item.teacher, Avatar: item.avatar, Price: item.price, Id: item.id })
        }}>
            <View style={styles.Course}>
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
                            fontSize: wp('3.8%')
                        }}>{item.price}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', right: wp('1%'), top: hp('1.5%') }}>
                    <Pressable>
                        <Ionicons name="bookmark" size={25} color="blue" />
                    </Pressable>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.Container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handlePress} style={[styles.ButtonReview,
                { backgroundColor: isPressed ? '#F4F6F9' : '#327CF7' }]}>
                    <Text style={{ color: isPressed ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress1} style={[styles.ButtonReview,
                { backgroundColor: isPressed1 ? '#F4F6F9' : '#327CF7' }]}>
                    <Text style={{ color: isPressed1 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Coding</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress2} style={[styles.ButtonReview,
                { backgroundColor: isPressed2 ? '#F4F6F9' : '#327CF7' }]}>
                    <Text style={{ color: isPressed2 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Design</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress3} style={[styles.ButtonReview,
                { backgroundColor: isPressed3 ? '#F4F6F9' : '#327CF7' }]}>
                    <Text style={{ color: isPressed3 ? '#327CF7' : '#F4F6F9', fontSize: wp('3.4%') }}>Marketing</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: hp('2%') }}>
                <FlatList
                    data={limitedNear}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.List}
                />
            </View>
        </View>
    )
}

export default BookMark

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%')
    },
    ButtonReview: {
        borderWidth: 1,
        height: hp('4%'),
        width: wp('22%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: hp('1%'),
        borderColor: '#e9f2eb',
        marginRight: wp('1%')
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
        alignItems: 'center'
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
})