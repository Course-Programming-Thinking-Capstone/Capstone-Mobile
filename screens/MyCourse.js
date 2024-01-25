import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import teacher from '../assets/Lesson/teacher1.png'
import ProgressBar from 'react-native-progress/Bar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from "@react-navigation/native";
const MyCourse = () => {

    const navigation = useNavigation();
    const Course = [
        { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2.000.000 VND', image: require('../assets/Lesson/kid3.jpg'), avatar: require('../assets/Lesson/vu.jpg') },
        { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2.500.000 VND', image: require('../assets/Lesson/kid4.jpg'), avatar: require('../assets/Lesson/thien.jpg') },
        { id: '5', name: 'Lập trình with C/C++', teacher: 'CongLT', price: '3.500.000 VND', image: require('../assets/MyCourse/kid5.jpg') },
        { id: '6', name: 'Lập trình with Android', teacher: 'CongLT', price: '4.500.000 VND', image: require('../assets/MyCourse/kid7.jpg') },
    ];
    const Done = [
        { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1.500.000 VND', image: require('../assets/Lesson/kid1.jpg'), avatar: require('../assets/Lesson/cong2.jpg') },
        { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1.500.000 VND', image: require('../assets/Lesson/kid2.jpg'), avatar: require('../assets/Lesson/an.jpg') },
    ];
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
    const CourseList = ({ data, renderItem }) => (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    );
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'OnGoing', title: 'OnGoing' },
        { key: 'Completed', title: 'Completed' },
    ]);
    const renderScene = SceneMap({
        OnGoing: () => (
            <CourseList data={Course} renderItem={renderCourse} />
        ),
        Completed: () => (
            <CourseList data={Done} renderItem={renderDone} />
        ),
    });
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue', height: hp('1%'), borderTopLeftRadius: 10, borderTopRightRadius: 10 }} // Màu nền cho tab đang chọn
            style={{ backgroundColor: 'white' }} // Màu nền chung của tab bar
            labelStyle={{ color: 'black' }}// Màu chữ của tab
            tabStyle={{ color: 'red' }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? 'blue' : 'black' }}>{route.title}</Text>
            )}
        />
    );
    
    return (
        <View style={styles.Container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: 100 }}
                renderTabBar={renderTabBar}
            />
        </View>
    )
}

export default MyCourse

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
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
    },
    CourseImage: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 10,
        marginRight: wp('3%')
    }
})