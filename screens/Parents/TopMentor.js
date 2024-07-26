import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import mess from '../../assets/Details/message.png'
import tele from '../../assets/Details/tele.png'
const TopMentor = () => {
    const data = [
        { id: 1, MentorName: "CongLT", Position: "Design Tutor", avatar: require('../../assets/Lesson/cong2.jpg') },
        { id: 2, MentorName: "AnDVT", Position: "Front-End Tutor", avatar: require('../../assets/Lesson/an.jpg') },
        { id: 3, MentorName: "VuNT", Position: "Back-End Tutor", avatar: require('../../assets/Lesson/vu.jpg') },
        { id: 4, MentorName: "ThienTR", Position: "Game-Dev Tutor", avatar: require('../../assets/Lesson/thien.jpg') },
        { id: 5, MentorName: "CongLT", Position: "Front-End Tutor", avatar: require('../../assets/Lesson/cong2.jpg') },
        { id: 6, MentorName: "AnDVT", Position: "Back-End Tutor", avatar: require('../../assets/Lesson/an.jpg') },
        { id: 7, MentorName: "AnDVT", Position: "Game-Dev Tutor", avatar: require('../../assets/Lesson/an.jpg') },
        { id: 8, MentorName: "VuNT", Position: "Design Tutor", avatar: require('../../assets/Lesson/vu.jpg') },
        { id: 9, MentorName: "ThienTR", Position: "Design Tutor", avatar: require('../../assets/Lesson/thien.jpg') },
        { id: 10, MentorName: "CongLT", Position: "Design Tutor", avatar: require('../../assets/Lesson/cong2.jpg') },
        { id: 11, MentorName: "AnDVT", Position: "Design Tutor", avatar: require('../../assets/Lesson/an.jpg') },
    ];
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'),marginBottom:hp('2%') }}>
            <View style={{ marginRight: wp('3%') }}>
                <Image source={item.avatar} style={styles.CircleMen} />
            </View>
            <View style={{ marginRight: wp('10%') }}>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: '700' }}>{item.MentorName}</Text>
                <Text style={{ fontSize: wp('3.5%'), color: '#94867D',fontWeight:'500' }}>{item.Position}</Text>
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', right: wp('3%') }}>
                <View style={styles.Circle}>
                    <Image source={tele} style={{ width: wp('5%'), height: hp('3%') }} />
                </View>
                <View style={styles.Circle}>
                    <Image source={mess} style={{ width: wp('5%'), height: hp('3%') }} />
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.Container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TopMentor

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('5%')
    },
    CircleMen: {
      width: wp('13.5%'),
      height: hp('6.5%'),
      borderRadius: 30,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFEFEF'
    },
    Circle: {
      width: wp('13.5%'),
      height: hp('6.5%'),
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#EFEFEF',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      marginRight: wp('2%')
    },

})