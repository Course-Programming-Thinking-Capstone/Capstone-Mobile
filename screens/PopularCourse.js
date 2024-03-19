import { StyleSheet, Text, View,FlatList,Image,Pressable } from 'react-native'
import React from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Ionicons from '@expo/vector-icons/Ionicons'
import {isSmallPhone,isSmallTablet} from '../Responsive/Responsive'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const PopularCourse = () => {
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
        <View style={styles.Course}>
            <Image source={item.image} style={styles.CourseImage} />
            <View>
                <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('21.9%') }}>
                    <Text style={{ color: 'orange', fontWeight: '500',fontSize: isSmallPhone || isSmallTablet ? wp('3%'): wp('3.5%') }}>Best Seller</Text>
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
    );
    return (
        <View style={styles.Container}>
            <FlatList
                data={limitedNear}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.List}
            />
        </View>
    )
}

export default PopularCourse

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
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
        elevation:5,
        backgroundColor:'white'
    },
    CourseImage: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 10,
        marginRight: wp('3%')
    },
    List:{
        paddingLeft:wp('1%'),
        paddingBottom:hp('1%')
    }
})