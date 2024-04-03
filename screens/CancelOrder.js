import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import teacher from '../assets/Lesson/teacher1.png'
import tag from '../assets/Lesson/tag.png'
import { SelectList } from 'react-native-dropdown-select-list'
import { Checkbox } from 'react-native-paper';
import { isSmallPhone, isSmallTablet } from '../Responsive/Responsive'
import { cancerlOrder } from '../Api/Order';
import Loading from '../Loading/Loading'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const CancelOrder = ({ route, navigation }) => {
  const { Name, LessImage, Lecture, Status, Price, Payment, Child, Avatar, Id } = route.params;
  const [checked1, setChecked] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [loading, setLoading] = useState(false);
  const data = [
    { key: '1', value: 'Muốn mua khóa học khác' },
    { key: '2', value: 'Muốn thay đổi hình thức thanh toán' },
    { key: '3', value: 'Muốn thay đổi thông tin trẻ' },
    { key: '4', value: 'Chưa áp dụng voucher giảm giá' },
    { key: '5', value: 'Thay đổi ý, không mua nữa' },
  ]
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCancelOrder = () => {
    if (!selected) {
      Alert.alert('Alert', 'Please select a reason for cancellation.');
    } else {
      toggleModal()
    }
  };
  const requestCancel = async () => {
    try {
      setLoading(true)
      const success = await cancerlOrder(Id, selected);
      if (success) {
        setLoading(false);
        navigation.navigate('CancelDetail', { Name, LessImage, Lecture, Status, Price, Payment, Child, Avatar, Id })
      } else {
        Alert.alert('Đăng ký thất bại !!!');
      }
    } catch (error) {
      console.error("Error handling add children:", error);
    }
  };
  const handlePress = () => {
    if (!loading) { 
      requestCancel();
    }
    else{
      Alert.alert("please wait")
    }
  };
  return (
    <View style={styles.Container}>
      <View style={styles.Course}>
        <Image source={LessImage} style={styles.CourseImage} />
        <View>
          <View style={{ borderColor: "white", borderWidth: 1, paddingHorizontal: hp('1%'), paddingVertical: wp('1%'), borderRadius: 10, backgroundColor: '#EFEFEF', width: wp('21.9%') }}>
            <Text style={{ color: 'orange', fontWeight: '500', fontSize: wp('3.1%'), textAlign: 'center' }}>Best Seller</Text>
          </View>
          <Text style={{ marginLeft: wp('1.5%'), fontSize: wp('4%'), fontWeight: '500' }}>{Name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
            <Image source={teacher} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
            <Text style={{
              fontWeight: 'bold',
              color: '#40BFFF',
              fontSize: wp('3.8%')
            }}>{Lecture}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
            <Image source={tag} style={{ width: wp('5%'), height: hp('3%'), marginRight: wp('2.5%'), marginLeft: wp('1%') }} />
            <Text style={{
              fontWeight: 'bold',
              color: 'blue',
              fontSize: wp('3.8%')
            }}>{Price}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: wp('90%'), marginTop: hp('1.5%') }}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          search={false}
          placeholder='Select the reason'
        />
      </View>
      <Text style={{ marginTop: hp('1%'), marginBottom: ('2%'), fontSize: wp('4%'), fontWeight: '500' }}>More Information (Optional)</Text>
      <View style={styles.TxtInput}>
        <TextInput multiline placeholder='Write more reasons here' textBreakStrategy="simple"  />
      </View>
      <Text style={{ marginTop: hp('1%'), marginBottom: ('2%'), fontSize: wp('4.2%'), fontWeight: '500' }}> Order cancellation policy </Text>
      <View style={[styles.TxtInput, { borderStyle: 'dashed', height: hp('28%'), paddingLeft: wp('5%'), paddingRight: wp('1.5%'), borderColor: '#FF8A00', paddingTop: hp('0.5%'), marginBottom: hp('1%') }]}>
        <ScrollView>
          <Text style={{ lineHeight: hp('3.5%'), fontSize: wp('4%') }}>1. Chúng tôi sẽ không thể khôi phục lại đơn hàng đã hủy.</Text>
          <Text style={{ lineHeight: hp('3.5%'), fontSize: wp('4%') }}>2. Yêu cầu hủy đơn sẽ được Staff xét duyệt trong vòng 30p.</Text>
          <Text style={{ lineHeight: hp('3.5%'), fontSize: wp('4%') }}>3. Kết quả xét duyệt sẽ được gửi về thông báo trong hộp thư.</Text>
          <Text style={{ lineHeight: hp('3.5%'), fontSize: wp('4%') }}>4. Nếu đơn hủy thành công, tiền sẽ hoàn về ví điện tử 3 - 5 ngày.</Text>
          <Text style={{ lineHeight: hp('3.5%'), fontSize: wp('4%'), marginBottom: hp('1%') }}>5. Mỗi khách hàng chỉ được phép hủy đơn hàng 3 lần/ 1 tháng.</Text>
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Checkbox
          status={checked1 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked1);
          }}
          onValueChange={() => se}
        />
        <Text style={{ fontSize: isSmallPhone || isSmallTablet ? wp('3.5%') : wp('4%') }}>Tôi đã đọc và đồng ý chính sách của KidsPro</Text>
      </View>
      <View style={styles.Enroll}>
        <TouchableOpacity
          style={[
            styles.Checkout,
            {
              backgroundColor: checked1 ? 'red' : '#988E8E66',
            },
          ]}
          disabled={!checked1}
          onPress={handleCancelOrder}
        >
          <Text style={{ color: 'white', fontWeight: '500' }}>Cancel Order</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal visible={isModalVisible} transparent={true} statusBarTranslucent={true} animationType={'fade'}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <View style={styles.Popup}>
              {/* <View style={{ alignItems: 'center' }}>
                <Image source={warn} style={{ width: wp('22.5%'), height: hp('10%') }} />
              </View> */}
              <Text style={{ fontSize: wp('5%'), textAlign: 'center', marginTop: hp('1%'), fontWeight: '700', color: '#FF8A00' }}>Do you want to cancel order ?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('3.5%') }}>
                <TouchableOpacity style={[styles.Btn, { marginRight: wp('5%') }]} onPress={toggleModal}>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress} style={[styles.Btn, { backgroundColor: 'red' }]}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: wp('4.5%') }}>Yes</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default CancelOrder

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%')
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
  TxtInput: {
    borderWidth: 1,
    height: isSmallPhone || isSmallTablet ? hp('10%') : hp('13%'),
    width: wp('90%'),
    paddingLeft: wp('1%'),
    borderColor: '#E9E9E9',
    borderWidth: 2,
    borderRadius: 10,
  },
  Enroll: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0, width: wp('100%'),
    height: hp('10%'),
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    paddingLeft: wp('6.5%'),
    borderColor: '#e9f2eb',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Checkout: {
    borderWidth: 1,
    height: hp('7%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: hp('1%'), backgroundColor: '#327CF7',
    borderColor: '#e9f2eb'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    width: wp('90%'),
    alignItems: 'center',
    height: hp('20%')
  },
  Popup: {
    backgroundColor: '#FCEFC9',
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 10,
    justifyContent: 'center'
  },
  Btn: {
    backgroundColor: '#40BFFF',
    height: hp('5.5%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})