import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Api/Api'
export const login = async (phone, password, navigation, setLoading, setPhone, setPassword) => {
    setLoading(true); // Đặt trạng thái loading thành true khi bắt đầu xử lý đăng nhập
    try {
        const response = await axios.post(`${BASE_URL}/authentication/login/phoneNumber`, {
            phoneNumber: phone,
            password: password,
        });
        if (response.status === 200) {
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
            setLoading(false); // Đặt trạng thái loading thành false sau khi lưu accessToken thành công
            navigation.navigate('HomePage');
            setPhone('');
            setPassword('');
        }
    } catch (error) {
        setLoading(false); // Đặt trạng thái loading thành false nếu có lỗi khi đăng nhập
        console.error('Error during login:', error);
        Alert.alert('Đăng nhập thất bại !!!');
    }
};


export const logout = async (navigation) => {
    try {
        await AsyncStorage.removeItem('accessToken');
        navigation.navigate('Login');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
