import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import welcome from '../../assets/welcome/welcom.png'
import next from '../../assets/welcome/next.png' 
import back1 from '../../assets/welcome/back.png'
import pic1 from '../../assets/welcome/pic1.png'
import pic2 from '../../assets/welcome/pic2.png'
import pic3 from '../../assets/welcome/pic3.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Page1 = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={{ textAlign: 'right', marginTop: hp('7%'), marginRight: wp('2%'), fontWeight: 'bold', fontSize: wp('4%'), color: '#83AFFA' }}>Skip</Text>
    </TouchableOpacity>
    <Image style={styles.img1} source={pic1} />
    <Text style={styles.Title}>Discover Your <Text style={{ color: '#FFAD0E' }}>Learning Adventure</Text></Text>
    <Text style={styles.Description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the</Text>
  </View>
);

const Page2 = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={{ textAlign: 'right', marginTop: hp('7%'), marginRight: wp('2%'), fontWeight: 'bold', fontSize: wp('4%'), color: '#83AFFA' }}>Skip</Text>
    </TouchableOpacity>
    <Image style={styles.img1} source={welcome} />
    <Text style={styles.Title}>Stay Organized With <Text style={{ color: '#FFAD0E' }}>Bookmarks</Text></Text>
    <Text style={styles.Description}>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model</Text>
  </View>
);

const Page3 = () => (
  <View>
    <Image style={styles.img2} source={pic3} />
    <Text style={styles.Title}>Achieve Certification <Text style={{ color: '#FFAD0E' }}>With Ease</Text></Text>
    <Text style={styles.Description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the</Text>
  </View>
);

const Welcome = ({ goToNext, navigation }) => {
  const [page, setPage] = useState(1);
  const goToNextPage = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      navigation.navigate('Login');
    }
  };
  const goToPrevPage = () => setPage(page > 1 ? page - 1 : page);

  const renderDots = () => {
    const dots = [];
    for (let i = 1; i <= 3; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: page === i ? 'blue' : 'gray' },
          ]}
        />
      );
    }
    return dots;
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <Page1 goToNext={goToNextPage} navigation={navigation} />;
      case 2:
        return <Page2 goToNext={goToNextPage} navigation={navigation} goToPrev={goToPrevPage} />;
      case 3:
        return <Page3 goToPrev={goToPrevPage} />;
      default:
        return null;
    }
  };

  return <View style={styles.Container}>{renderPage()}
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={goToPrevPage}>
        <Image style={{ borderRadius: 30, borderColor: 'blue', borderWidth: 1, width: wp('10%'), height: hp('5%') }} source={back1} />
      </TouchableOpacity>
      <View style={styles.dotsContainer}>{renderDots()}</View>
      <TouchableOpacity onPress={goToNextPage}>
        <Image style={{ borderRadius: 30, borderColor: 'blue', borderWidth: 1, width: wp('10%'), height: hp('5%'), padding: 10 }} source={next} />
      </TouchableOpacity>
    </View>
  </View>;
};
export default Welcome;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: wp('3%'),
    paddingRight: wp('3%')
  },
  Title: {
    fontSize: wp('8%'),
    textAlign: 'center',
    marginBottom: hp('3%')
  },
  img1: {
    width: wp('95%'),
    height: hp('50%'),
  },
  img2: {
    width: wp('90%'),
    height: hp('50%'),
    marginTop: hp('10%')
  },
  Description: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('7%')
  }
  ,
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: hp('3%'),
    marginRight: wp('10%'),
    marginLeft: wp('10%')
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  Button: {
    backgroundColor: 'black'
  }
});
