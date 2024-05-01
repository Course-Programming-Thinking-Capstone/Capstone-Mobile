import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getAllCourse } from '../Api/Course';
import { formatPrice } from '../FormatPrice/Format';
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const PopularCourse = ({route}) => {
    const { paidCourses } = route.params;
    const [course, setCourse] = useState([])
    useEffect(() => {
        fetchCourse()
    }, [])
    const fetchCourse = async () => {
        try {
            const courseData = await getAllCourse();
            if (courseData) {
                setCourse(courseData.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const renderCourse = ({ item }) => (
        <View style={styles.Course}>
            <Image source={{ uri: item.pictureUrl }} style={styles.CourseImage} />
            <View>
                <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500',width:wp('50%') }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                    <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'blue',
                        fontSize: wp('3.8%')
                    }}>{item.isFree ? 'Free' : formatPrice(item.price)}</Text>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.Container}>
            <FlatList
                data={paidCourses}
                renderItem={renderCourse}
                keyExtractor={item => item.id.toString()}
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
        elevation: 5,
        backgroundColor: 'white'
    },
    CourseImage: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 10,
        marginRight: wp('3%')
    },
    List: {
        paddingLeft: wp('1%'),
        paddingBottom: hp('1%')
    },
    Image: {
        width: wp('50.3%'),
        height: hp('15%'),
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
    },
})