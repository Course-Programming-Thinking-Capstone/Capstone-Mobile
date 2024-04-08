import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getOrder } from '../Api/Order'
import test from '../assets/Lesson/kid1.jpg'
import Loading from '../Loading/Loading'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
const Order = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);
    const [pending, setPending] = useState([]);
    const [process, setProcess] = useState([]);
    const [success, setSuccess] = useState([]);
    const [request, setRequest] = useState([]);
    const [refunded, setRefunded] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        const fetchOrderOnFocus = navigation.addListener('focus', () => {
            fetchOrder();
        });
        return fetchOrderOnFocus;
    }, [navigation]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const orderData = await getOrder();
            if (orderData) {
                const sortedOrder = orderData.sort((a, b) => b.orderId - a.orderId);
                setOrderList(sortedOrder);
                filterDataByStatus(sortedOrder);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const filterDataByStatus = (orderData) => {
        const pendingData = [];
        const processData = [];
        const successData = [];
        const requestData = [];
        const refundedData = [];

        for (const item of orderData) {
            if (item.orderStatus === 'Pending') {
                pendingData.push(item);
            } else if (item.orderStatus === 'Process') {
                processData.push(item);
            } else if (item.orderStatus === 'Success') {
                successData.push(item);
            } else if (item.orderStatus === 'RequestRefund') {
                requestData.push(item);
            } else if (item.orderStatus === 'Refunded') {
                refundedData.push(item);
            }
        }

        setPending(pendingData);
        setProcess(processData);
        setSuccess(successData);
        setRequest(requestData)
        setRefunded(refundedData);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ alignItems: 'center', marginBottom: hp('1%') }} onPress={() => {
            navigation.navigate('OrderDetail', { Id: item.orderId, Status: item.orderStatus });
        }}>
            <View style={styles.Course}>
                <Image source={test} style={styles.CourseImage} />
                <View>
                    <View style={{
                        borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10,
                        backgroundColor: item.orderStatus === 'Pending' ? '#FF8A00' : item.orderStatus === 'Process' ? 'lightblue' : item.orderStatus === 'refunded' ? 'red' : 'red',
                        width: item.orderStatus === 'RequestRefund' ? wp('28.9%'):wp('21.9'),
                    }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('3.1%'), textAlign: 'center' }}>{item.orderStatus}</Text>
                    </View>
                    <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500', width: wp('50%') }}>{item.courseName}</Text>
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
                        }}>{item.totalPrice}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'process', title: 'Process' },
        { key: 'pending', title: 'Pending' },
        { key: 'success', title: 'Success' },
        { key: 'request', title: 'Request' },
        { key: 'refunded', title: 'Refunded' },
    ]);

    const renderScene = SceneMap({
        process: () => (
            <View style={{ marginTop: hp('1%') }}>
                {loading ? (
                    <Loading />
                ) : (process.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: hp('15%') }}>No data available !</Text>
                ) : (
                    <FlatList
                        data={process}
                        keyExtractor={item => item.orderId.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                    />)
                )}
            </View>
        ),
        pending: () => (
            <View style={{ marginTop: hp('1%') }}>
                {loading ? (
                    <Loading />
                ) : (pending.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: hp('15%') }}>No data available !</Text>
                ) : (
                    <FlatList
                        data={pending}
                        keyExtractor={item => item.orderId.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                    />
                )
                )}
            </View>
        ),
        success: () => (
            <View style={{ marginTop: hp('1%') }}>
                {loading ? (
                    <Loading />
                ) : (success.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: hp('15%') }}>No data available !</Text>
                ) : (
                    <FlatList
                        data={success}
                        keyExtractor={item => item.orderId.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                    />)
                )}
            </View>
        ),
        request: () => (
            <View style={{ marginTop: hp('1%') }}>
                {loading ? (
                    <Loading />
                ) : (request.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: hp('15%') }}>No data available !</Text>
                ) : (
                    <FlatList
                        data={request}
                        keyExtractor={item => item.orderId.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                    />)
                )}
            </View>
        ),
        refunded: () => (
            <View style={{ marginTop: hp('1%') }}>
                {loading ? (
                    <Loading />
                ) : (refunded.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: hp('15%') }}>No data available !</Text>
                ) : (
                    <FlatList
                        data={refunded}
                        keyExtractor={item => item.orderId.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                    />
                )
                )}
            </View>
        )
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue', height: hp('1%'), borderTopLeftRadius: 10, borderTopRightRadius: 10 }} // Màu nền cho tab đang chọn
            style={{ backgroundColor: 'white' }} // Màu nền chung của tab bar
            labelStyle={{ color: 'black' }}// Màu chữ của tab
            tabStyle={{ color: 'red' }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? 'blue' : 'black', fontWeight: focused ? '600' : '400', fontSize: isSmallPhone || isSmallTablet ? wp('3.5%') : wp('3.8%'), width: isSmallPhone || isSmallTablet ? wp('19%') : wp('20%'), textAlign: 'center' }}>{route.title}</Text>
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
                    onIndexChange={(index) => setIndex(index)}
                    initialLayout={{ width: '100%' }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </View>
    )
};

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
})