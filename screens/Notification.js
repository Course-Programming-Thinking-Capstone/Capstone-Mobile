import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getNoti, updateNoti } from '../Api/Notification';
import Loading from '../Loading/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import gmail from '../assets/Noti/bag.png'
import dotAc from '../assets/Noti/dotAc.png'
import dotIn from '../assets/Noti/dotIn.png'

const Notification = () => {
    const [notiData, setNotiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNoti();
    }, []);

    const fetchNoti = async () => {
        try {
            const data = await getNoti();
            if (data) {
                setNotiData(data.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationPress = async (id) => {
        try {
            const status = await updateNoti(id);
            if (status && status.isRead !== null) {
                console.log("Notification status:", status.isRead);
                fetchNoti();
            }
        } catch (error) {
            console.error("Error updating notification:", error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item.id)}>
            <View>
                <Image source={gmail} style={{ height: hp('6.2%'), width: wp('12%'), marginRight: wp('2%') }} />
            </View>
            <View>
                <Text style={styles.notificationTxt}>{item.title}.</Text>
                <Text style={[styles.notificationTxt, { color: '#c2c3c4' }]}>{item.date}</Text>
            </View>
            <View>
                <Image source={item.isRead ? dotIn : dotAc} style={{ width: wp('5%'), height: hp('5%') }} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.Container}>
            {loading ? (
                <Loading />
            ) : (
                notiData.length === 0 ? (
                    <Text style={styles.noDataText}>No notification available!</Text>
                ) : (
                    <FlatList
                        data={notiData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                    />
                )
            )}
        </View>
    );
};


export default Notification

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: wp('3%')
    },
    notificationItem: {
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: wp('2%'),
        marginBottom: hp('1%'),
        paddingVertical: hp('1%'),
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: 'white',
        marginHorizontal: wp('1%'),
        marginTop: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationTxt: {
        fontSize: wp('4%'),
        textAlign: 'left',
        lineHeight: hp('3%'),
        marginLeft: wp('2%'),
        width: wp('68%'),
        fontWeight: '700'
    }
})