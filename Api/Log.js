import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Api/Api'
import { getApiHeaders } from '../Api/Headers';

export const login = async (email, password, navigation, setLoading, setEmail, setPassword, setModalVisible, setError) => {
    setLoading(true);
    try {
        const headers = await getApiHeaders();
        let apiUrl = '';
        let requestData = {};
        let nextPage = '';

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailPattern.test(email);

        if (isEmail) {
            apiUrl = `${BASE_URL}/authentication/login/email`;
            requestData = {
                email: email,
                password: password,
            };
            nextPage = 'HomePage';
        } else {
            apiUrl = `${BASE_URL}/authentication/login/account`;
            requestData = {
                account: email,
                password: password,
            };
            nextPage = 'KidHome';
        }

        const response = await axios.post(apiUrl, requestData, { headers });

        if (response.status === 200) {
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
            setLoading(false);
            navigation.navigate(nextPage);
            setEmail('');
            setPassword('');
        }
    } catch (error) {
        setLoading(false);
        setError(error);
        setModalVisible(true);
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

export const SignUpForm = async (email, name, password, confirmPassword, navigation, setLoading, setEmail, setName, setPassword, setConfirmPassword) => {
    setLoading(true);
    try {
        const headers = await getApiHeaders();
        const response = await axios.post(`${BASE_URL}/authentication/register/email`, {
            email: email,
            fullName: name,
            password: password,
            rePassword: confirmPassword
        }, { headers });
        if (response.status === 201) {
            setLoading(false);
            setEmail('');
            setPassword('');
            setName('');
            setConfirmPassword('');
            Alert.alert('Please verify your account by email !'),
                navigation.navigate('Login')
        }
    } catch (error) {
        setLoading(false);
        console.error('Error during SignUp:', error);
        if (error.status === 409) {
            Alert.alert('Account existed !!!');
        }
        Alert.alert('Đăng kí thất bại !!!');
    }
};
