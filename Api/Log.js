import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Api/Api'
import { getApiHeaders } from '../Api/Headers';
export const login = async (email, password, navigation, setLoading, setEmail, setPassword) => {
    setLoading(true);
    try {
        const headers = await getApiHeaders();
        const response = await axios.post(`${BASE_URL}/authentication/login/email`, {
            email: email,
            password: password,
        }, { headers });
        if (response.status === 200) {
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
            setLoading(false);
            navigation.navigate('HomePage');
            setEmail('');
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
