import { KeyboardAvoidingView,StyleSheet, Text, View, ImageBackground, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import hello from '../assets/HomePage/hello.png'
import background from '../assets/HomePage/gif5.gif'
import noti from '../assets/HomePage/noti.png'
import search from '../assets/HomePage/search.png'
import filter from '../assets/HomePage/filter.png'
import { useNavigation } from "@react-navigation/native";
import teacher from '../assets/Lesson/teacher1.png'
import ProgressBar from 'react-native-progress/Bar';
import right from '../assets/HomePage/right.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const KidHome = () => {
    const navigation = useNavigation();
    const Course = [
        { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2.000.000 VND', image: require('../assets/Lesson/kid3.jpg'), avatar: require('../assets/Lesson/vu.jpg') },
        { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2.500.000 VND', image: require('../assets/Lesson/kid4.jpg'), avatar: require('../assets/Lesson/thien.jpg') },
        { id: '5', name: 'Lập trình with C/C++', teacher: 'CongLT', price: '3.500.000 VND', image: require('../assets/MyCourse/kid5.jpg') },
    ];
    const Done = [
        { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1.500.000 VND', image: require('../assets/Lesson/kid1.jpg'), avatar: require('../assets/Lesson/cong2.jpg') },
        { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1.500.000 VND', image: require('../assets/Lesson/kid2.jpg'), avatar: require('../assets/Lesson/an.jpg') },
    ];

    const numberOfItems = 2;
    const limitedCourse = Course.slice(0, numberOfItems);
    const limitedDone = Done.slice(0, numberOfItems);

    const renderCourse = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Course') }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('1.5%') }}>
                        <ProgressBar progress={0.8} width={wp('35%')} borderWidth={1} height={(hp('1%'))} />
                        <Text style={{
                            marginLeft: wp('3%'),
                            color: '#40BFFF',
                        }}>20/25</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    const renderDone = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Course') }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ProgressBar progress={1} width={wp('35%')} borderWidth={1} height={(hp('1%'))} />
                        <Text style={{
                            marginLeft: wp('2%'),
                            color: '#40BFFF',
                        }}>25/25</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.Container}>
            <ImageBackground source={background} style={styles.backPic}>
                <SafeAreaView style={styles.Header}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: wp('5%'),
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Hi, John</Text>
                                <Image source={hello} style={{ width: wp('6%'), height: hp('3%'), marginLeft: wp('2%') }} />
                            </View>
                            <Text style={styles.Text}>Let's start learning!</Text>
                        </View>
                        <View style={{ backgroundColor: '#83AFFA', height: hp('3%'), width: wp('9%'), paddingLeft: wp('2%'), paddingTop: hp('0.7%'), paddingBottom: hp('3.7%'), marginRight: wp('9%'), borderRadius: 10 }}>
                            <Image source={noti} style={styles.Noti} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.Search}>
                            <Image source={search} style={styles.SearchIcon} />
                            <TextInput
                                placeholder="Search ..."
                            />
                        </View>
                        <View style={styles.Filter}>
                            <Image style={{
                                width: wp('5.2%'),
                                height: hp('2.5%'),
                            }} source={filter} />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
            <ScrollView>
                <View style={{ flex: 1, paddingLeft: wp('5%') }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingRight: isSmallPhone || isSmallTablet ? wp('5%') : wp('5%'), marginTop: hp('1%'), alignItems: 'center' }}>
                        <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500' }}>Continue Learning</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('PopularCourse') }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%') }}>View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%'),marginLeft:wp('2%') }} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={limitedCourse}
                        keyExtractor={item => item.id}
                        renderItem={renderCourse}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.List}
                        scrollEnabled={false}
                    />
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingRight: isSmallPhone || isSmallTablet ? wp('5%') : wp('5%'), marginTop: hp('1%'), alignItems: 'center' }}>
                        <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('4%') : wp('4.5%'), fontWeight: '500' }}>Course Completed</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('PopularCourse') }}>
                            <Text style={{ fontWeight: 'bold', color: '#40BFFF', fontSize: wp('4%') }}>View all</Text>
                            <Image source={right} style={{ width: wp('4%'), height: hp('2.7%'),marginLeft:wp('2%') }} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={limitedDone}
                        keyExtractor={item => item.id}
                        renderItem={renderDone}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.List}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default KidHome

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Text: {
        fontSize: wp('5%'),
        color: 'white',
        marginTop: hp('0.1%')
    },
    Header: {
        // backgroundColor: '#246BFD',
        paddingLeft: wp('5%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('4%')
    },
    Noti: {
        width: wp('6%'),
        height: hp('3%'),
    },
    Search: {
        marginTop: hp('3.5%'),
        marginRight: wp('4%'),
        width: wp('69%'),
        height: hp('6.3%'),
        borderColor: '#EFEFEF',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('2.5%'),
        backgroundColor: 'white'
    },
    Filter: {
        marginTop: hp('3.5%'),
        width: wp('13%'),
        height: hp('6.3%'),
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#EFEFEF'
    },
    SearchIcon: {
        width: wp('5.2%'),
        height: hp('2.5%'),
        marginRight: wp('3%'),
    },
    backPic: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: wp('100%'),
        height: hp('28%'), overflow: 'hidden'
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
        paddingBottom: hp('1%'),
        paddingLeft: wp('1%')
    }
})