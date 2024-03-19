import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Ionicons from '@expo/vector-icons/Ionicons';

const Order = ({ route, navigation }) => {
    const [pending, setPending] = useState([]);
    const [success, setSuccess] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const Near = [
        { id: '1', name: 'Program with Scratch', teacher: 'CongLT', price: '1.500.000 VND', image: require('../assets/Lesson/kid1.jpg'), avatar: require('../assets/Lesson/cong2.jpg'), status: 'Pending',children:'Tuan Vu',payment:'Zalo' },
        { id: '2', name: 'Program with Python', teacher: 'AnDVT', price: '1.500.000 VND', image: require('../assets/Lesson/kid2.jpg'), avatar: require('../assets/Lesson/an.jpg'), status: 'Success',children:'Thanh An',payment:'Momo' },
        { id: '3', name: 'Program with Tynker', teacher: 'VuNT', price: '2.000.000 VND', image: require('../assets/Lesson/kid3.jpg'), avatar: require('../assets/Lesson/vu.jpg'), status: 'Cancelled',children:'Thanh An',payment:'Momo' },
        { id: '4', name: 'Program with Blockly', teacher: 'ThienTr', price: '2.500.000 VND', image: require('../assets/Lesson/kid4.jpg'), avatar: require('../assets/Lesson/thien.jpg'), status: 'Success',children:'Tuan Vu',payment:'Zalo' },
        { id: '5', name: 'Lập trình with C', teacher: 'CongLT', price: '1.500.000 VND' },
        { id: '6', name: 'Lập trình with C', teacher: 'CongLT', price: '1.500.000 VND' },
    ];
    useEffect(() => {
        const filterDataByStatus = () => {
            const pendingData = [];
            const successData = [];
            const cancelledData = [];

            for (const item of Near) {
                if (item.status === 'Pending') {
                    pendingData.push(item);
                } else if (item.status === 'Success') {
                    successData.push(item);
                } else if (item.status === 'Cancelled') {
                    cancelledData.push(item);
                }
            }

            if (JSON.stringify(pendingData) !== JSON.stringify(pending)) {
                setPending(pendingData);
            }
            if (JSON.stringify(successData) !== JSON.stringify(success)) {
                setSuccess(successData);
            }
            if (JSON.stringify(cancelledData) !== JSON.stringify(cancelled)) {
                setCancelled(cancelledData);
            }
        };

        filterDataByStatus();
    }, [Near]);
    const numberOfItems = 4; // Render component number
    const limitedNear = Near.slice(0, numberOfItems);
    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ alignItems: 'center', marginBottom: hp('1%') }} onPress={() => {
            navigation.navigate('OrderDetail', { Name: item.name, LessImage: item.image, Lecture: item.teacher, Avatar: item.avatar, Price: item.price, Id: item.id, Status: item.status,Child:item.children,Payment:item.payment })
        }}>
            <View style={styles.Course}>
                <Image source={item.image} style={styles.CourseImage} />
                <View>
                    <View style={{
                        borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10,
                        backgroundColor: item.status === 'Pending' ? '#FF8A00':item.status === 'Success' ? '#6DCE63' :item.status === 'Cancelled' ? 'red' : 'red',
                        width: wp('21.9%'), width: wp('21.9%')
                    }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('3.1%'), textAlign: 'center' }}>{item.status}</Text>
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
            </View>
        </TouchableOpacity>
    );
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'All' },
        { key: 'pending', title: 'Pending' },
        { key: 'success', title: 'Success' },
        { key: 'cancelled', title: 'Canceled' },
    ]);
    const renderScene = SceneMap({
        all: () => (
            <View style={{ marginTop: hp('1%') }}>
                <FlatList
                    data={limitedNear}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        ),
        pending: () => (
            <View style={{ marginTop: hp('1%') }}>
                <FlatList
                    data={pending}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        ),
        success: () => (
            <View style={{ marginTop: hp('1%') }}>
                <FlatList
                    data={success}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        ),
        cancelled: () => (
            <View style={{ marginTop: hp('1%') }}>
                <FlatList
                    data={cancelled}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    })
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
            <View style={{
                flex: 1, marginBottom: hp('1.5%')
            }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: '100%' }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Course: {
        flexDirection: 'row',
        marginTop: hp('0.5%'),
        borderWidth: 1,
        width: wp('90%'),
        paddingVertical: wp('2%'),
        borderRadius: 10,
        borderColor: '#E9E9E9',
        alignItems: 'center',
        paddingHorizontal: hp('1%'),
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
    Name: {
        width: wp('50%'),
        fontWeight: 'bold',
        color: '#223263',
        fontSize: wp('3.7%')
    },
})