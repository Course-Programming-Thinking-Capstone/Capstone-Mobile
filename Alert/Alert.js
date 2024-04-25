import React from 'react';
import { Modal, Text, TouchableOpacity, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AlertIcon from '../assets/Alert/danger.png'
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
const ErrorModal = ({ visible, errorMessage, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        width: wp('88%'),
                        height: hp('26%'),
                        borderRadius: 10,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Image source={AlertIcon} style={{position:'absolute',top:hp('-3%'),width: isSmallPhone || isSmallTablet ? wp('21%') : wp('20%'),height:hp('10%')}} />
                    <Text style={{ fontSize: wp('6.5%'), textAlign: 'center', fontWeight: '700', color: '#FF8A00',marginTop:hp('7%'),marginBottom:hp('1%') }}>Error !</Text>
                    <Text style={{ marginBottom: hp('2%'),fontWeight:'500',fontSize:wp('5%'),color:'#FF8A00' }}>{errorMessage}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#FF8A00',
                            height: hp('5.5%'),
                            width: wp('30%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                        }} onPress={onClose}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ErrorModal;
