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
        } else {
            const accountStatus = response.data?.accountStatus;
            if (accountStatus === "NotActivated") {
                Alert.alert("Your account is not activated");
            } else {
            }
        }
    } catch (error) {
        setLoading(false);
        console.error('Error during login:', error);
        if (error.response.data.accountStatus === "NotActivated") {
            Alert.alert("Your account is not activated");
        } else {
            Alert.alert('Đăng nhập thất bại !!!');
        }
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
